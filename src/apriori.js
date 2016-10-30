function Apriori(data, options) {

    this.trainingData = data;

    options = options || {};

    defaults = {
        confidence: 10,
        minValue: 2,
        maxValue: 10,
        minSupport: 1,
        maxSupport: 100
    };

    this.options = extend(options, defaults);

    function extend(supplied, defaults) {
        if(supplied) {
            for(var key in defaults) {
                var val = supplied[key];

                if(typeof val === "undefined") {
                    supplied[key] = defaults[key];
                }
            }
        }

        return supplied;
    }
}

Apriori.prototype = {

    initialize: function() {
        this.findUniqueDataItems();
        this.createItemSupportValueMap();
        this.parseTrainingData();
    },

    findUniqueDataItems: function() {
        var uniqueItems = [];
        var trainingData = this.trainingData;

        for(var itemSet = 0; itemSet < trainingData.length; itemSet++) {
            for(var item = 0; item < trainingData[itemSet].length; item++) {
                uniqueItems.push(trainingData[itemSet][item]);
            }
        }

        uniqueItems = uniqueItems.filter(function(item, index, inputArray) {
            return inputArray.indexOf(item) === index;
        });

        this.uniqueItems = uniqueItems;
    },

    createItemSupportValueMap: function() {
        var uniqueItems = this.uniqueItems;
        var supportMap = {};

        for(var i = 0; i < uniqueItems.length; i++) {
            supportMap[uniqueItems[i]] = 0;
        }

        this.supportMap = supportMap;
    },

    parseTrainingData: function() {

        var occurrences = this.supportMap;
        var trainingData = this.trainingData;

        //For each item in every item set, we have to count how many times it appears
        for(var itemSet = 0; itemSet < trainingData.length; itemSet++) {
            for(var items = 0; items < trainingData[itemSet].length; items++) {
                ++occurrences[trainingData[itemSet][items]];
            }
        }

        this.candidates = occurrences;
    },

    pruneCandidates: function() {
        for(key in this.candidates) {
            if(this.candidates[key] < this.options.minSupport) {
                delete this.candidates[key];
            }
        }
    }
};