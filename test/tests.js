module("Initializing Apriori object", {
    setup: function() {
        trainingSet = [
            ["test1", "test2", "test3"],
            ["test1", "test2", "test4"]
            /*["test3", "test6", "test1"],
             ["test9", "test9", "test3"],
             ["test4", "test1", "test4"],
             ["test1", "test2", "test5"],
             ["test8", "test1", "test2"],
             ["test7", "test8", "test6"],
             ["test1", "test1", "test2"]*/
        ];

        apriori = new Apriori(trainingSet);
        apriori.initialize();

    },

    teardown: function() {
        apriori = null;
        trainingSet = null;
    }
});

    test("Create a new Apriori object without options parameter", function() {

        ok(apriori, "Did not create new Apriori object");
        ok(apriori.options.confidence === 10, "Did not set default confidence value");
        ok(apriori.options.minValue === 2, "Did not set default minimum value for set");
        ok(apriori.options.maxValue === 10, "Did not set default maximum value for set");
        ok(apriori.options.minSupport === 1, "Did not set default minimum support");
        ok(apriori.options.maxSupport === 100, "Did not set default maximum support");
    });

    test("Create a new Apriori object with user supplied options argument", function() {
        apriori = new Apriori(trainingSet, {
            confidence: 20,
            minValue: 0,
            maxValue: 50,
            minSupport: 10,
            maxSupport: 90
        });

        apriori.initialize();

        ok(apriori, "Did not create new Apriori object with user supplied options");
        ok(apriori.options.confidence === 20, "Did not set confidence value to user supplied value");
        ok(apriori.options.minValue === 0, "Did not set minimum value for data to user supplied value");
        ok(apriori.options.maxValue === 50, "Did not set maximum value for data to user supplied value");
        ok(apriori.options.minSupport === 10, "Did not set minimum support value to user supplied value");
        ok(apriori.options.maxSupport === 90, "Did not set maximum support value to user supplied value");
    });

    test("Creating a new Apriori object sets up data and structures necessary for performing calculations", function() {
        var findUniqueDataItemsSpy = sinon.spy(apriori, "findUniqueDataItems"),
            createItemSupportValueMapSpy = sinon.spy(apriori, "createItemSupportValueMap"),
            parseTrainingDataSpy = sinon.spy(apriori, "parseTrainingData");

        //Have to re-initialize for spies to find methods
        apriori.initialize();

        ok(findUniqueDataItemsSpy.called, "Did not find unique data items");
        ok(createItemSupportValueMapSpy.called, "Did not create support value map");
        ok(parseTrainingDataSpy.called, "Did not parse training data");
    });

module();

module("Generating candidate item sets", {
    setup: function() {
        trainingSet = [
            ["test1", "test2", "test3"],
            ["test1", "test2", "test4"]
            /*["test3", "test6", "test1"],
            ["test9", "test9", "test3"],
            ["test4", "test1", "test4"],
            ["test1", "test2", "test5"],
            ["test8", "test1", "test2"],
            ["test7", "test8", "test6"],
            ["test1", "test1", "test2"]*/
        ];

        apriori = new Apriori(trainingSet);
        apriori.initialize();
    },

    teardown: function() {
        apriori = null;
        trainingSet = null;
    }
});

    test("Find and store unique item values", function() {
        ok(apriori.uniqueItems.length === 4, "Did not find unique items properly");
    });

    test("Construct support item map", function() {
        ok(typeof apriori.supportMap === 'object', "Did not construct mapping object");
        ok(apriori.supportMap["test1"], "Did not set supportMap value properly");
        ok(apriori.supportMap["test2"], "Did not set supportMap value properly");
        ok(apriori.supportMap["test3"], "Did not set supportMap value properly");
        ok(apriori.supportMap["test4"], "Did not set supportMap value properly");
    });

    test("Parsing training data will create candidates", function() {
        ok(apriori.candidates["test1"], "Did not set candidate object properly");
        ok(apriori.candidates["test2"], "Did not set candidate object properly");
        ok(apriori.candidates["test3"], "Did not set candidate object properly");
    });

    test("Parsing training data will calculate correct support values", function() {
        ok(apriori.candidates["test1"] === 2, "Did not set candidate support value correctly");
        ok(apriori.candidates["test2"] === 2, "Did not set candidate support value correctly");
        ok(apriori.candidates["test3"] === 1, "Did not set candidate support value correctly");
        ok(apriori.candidates["test4"] === 1, "Did not set candidate support value correctly");
    });

    test("Prune candidates that fall below minimum support value", function() {
        apriori = new Apriori(trainingSet, {
            minSupport: 2
        });

        apriori.initialize();
        apriori.pruneCandidates();
        ok(!apriori.candidates["test3"], "Did not remove low support candidates");
        ok(!apriori.candidates["test4"], "Did not remove low support candidates");

        ok(!apriori.supportMap["test3"], "Did not remove low performing candidates from support value map");
        ok(!apriori.supportMap["test4"], "Did not remove low performing candidates from support value map");
    });

module();