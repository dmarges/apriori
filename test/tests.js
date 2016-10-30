module("Initializing Apriori object", {
    setup: function() {
        trainingSet = [
            ["test1", "test2", "test3"],
            ["test1", "test2", "test4"],
            ["test3", "test6", "test1"],
            ["test9", "test9", "test3"],
            ["test4", "test1", "test4"],
            ["test1", "test2", "test5"],
            ["test8", "test1", "test2"],
            ["test7", "test8", "test6"],
            ["test1", "test1", "test2"]
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

        ok(apriori, "Created new Apriori object");
        ok(apriori.options.confidence === 10, "Default confidence value set properly");
        ok(apriori.options.minValue === 2, "Default minimum value for set was set properly");
        ok(apriori.options.maxValue === 10, "Default maximum value for set was set properly");
        ok(apriori.options.minSupport === 1, "Default minimum support was set properly");
        ok(apriori.options.maxSupport === 100, "Default maximum support set properly");
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

        ok(apriori, "Created new Apriori object with user supplied options");
        ok(apriori.options.confidence === 20, "Set confidence value to user supplied value");
        ok(apriori.options.minValue === 0, "Set minimum value for data to user supplied value");
        ok(apriori.options.maxValue === 50, "Set maximum value for data to user supplied value");
        ok(apriori.options.minSupport === 10, "Set minimum support value to user supplied value");
        ok(apriori.options.maxSupport === 90, "Set maximum support value to user supplied value");
    });

    test("Creating a new Apriori object sets up data and structures necessary for performing calculations", function() {
        var findUniqueDataItemsSpy = sinon.spy(apriori, "findUniqueDataItems"),
            createItemSupportValueMapSpy = sinon.spy(apriori, "createItemSupportValueMap"),
            parseTrainingDataSpy = sinon.spy(apriori, "parseTrainingData");

        //Have to re-initialize for spies to find methods
        apriori.initialize();

        ok(findUniqueDataItemsSpy.called, "Call was made to find unique data items");
        ok(createItemSupportValueMapSpy.called, "Call was made to create support value map");
        ok(parseTrainingDataSpy.called, "Call was made to parse training data");
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
        ok(apriori.uniqueItems.length === 4, "Found correct number of unique items");

        for(var i = 0, len = apriori.uniqueItems.length; i < len; i++) {
            var incNumber = i + 1;
            ok(apriori.uniqueItems[i] === "test" + incNumber, "Unique item:" + incNumber + " is test" + incNumber);            
        }
    });

    test("Construct support item map", function() {
        ok(typeof apriori.supportMap === 'object', "Constructed support mapping object");

        for(item in apriori.supportMap) {
            ok(item !== undefined, "supportMap value is set properly");
        }
    });

    test("Parsing training data will calculate correct support values", function() {
        //There should be the following:
        //test1 = 2
        //test2 = 2
        //test3 = 1
        //test4 = 1
        
        ok(apriori.candidates["test1"] === 2, "Candidate item 'test1' has 2 occurences");
        ok(apriori.candidates["test2"] === 2, "Candidate item 'test2' has 2 occurences");
        ok(apriori.candidates["test3"] === 1, "Candidate item 'test3' has 1 occurence");
        ok(apriori.candidates["test4"] === 1, "Candidate item 'test4' has 1 occurence");
    });

    test("Prune candidates that fall below minimum support value", function() {
        apriori = new Apriori(trainingSet, {
            minSupport: 2
        });

        apriori.initialize();
        apriori.pruneCandidates();
        ok(!apriori.candidates["test3"], "Removed low support candidate 'test3'");
        ok(!apriori.candidates["test4"], "Removed low support candidate 'test4'");

        ok(!apriori.supportMap["test3"], "Removed low performing candidate 'test3' from support value map");
        ok(!apriori.supportMap["test4"], "Removed low performing candidate 'test4' from support value map");
    });

module();