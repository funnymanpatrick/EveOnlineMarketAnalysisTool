var hrstart = process.hrtime();
var request = require("request");
var myData = require('/root/Eve/dict.json');
var MongoClient = require('mongodb').MongoClient, format = require('util').format;

var numRequests = 0;

function onComplete(collection) {
    console.log("onComplete called: numRequests =", numRequests);
    numRequests -= 1;
    
    if (numRequests > 0) {
        return;
    }
    
    var hrend = process.hrtime(hrstart);
    console.log("Execution time : %ds %dms", hrend[0], hrend[1]/1000000);
    /*collection.find().toArray(function(err, results){
        if(!err){
            console.dir(results);
            db.close();
        }
    });
    collection.findOne({_id:18}, function(err, results){
        if(!err){
            console.dir(results);
        }
    });*/
}

function doWork(item, collection){
    var url = "http://api.eve-central.com/api/marketstat/json?typeid=" + myData[item].FIELD1;
    numRequests += 1;
    request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var data = body[0];
                collection.update(
                    { "_id": myData[item].FIELD1 },
                    {
                        $set: {
			    "Name":myData[item].FIELD2,
                            "Buy":{
                                "Volume":data.buy.volume,
                                "Weighted Average":data.buy.wavg,
                                "Unweighted Average":data.buy.avg,
                                "Variance":data.buy.variance,
                                "Standard Deviation":data.buy.stdDev,
                                "Median":data.buy.median,
                                "Max":data.buy.max,
                                "Min":data.buy.min
                            },
                            "Sell":{
                                "Volume":data.sell.volume,
                                "Weighted Average":data.sell.wavg,
                                "Unweighted Average":data.sell.avg,
                                "Variance":data.sell.variance,
                                "Standard Deviation":data.sell.stdDev,
                                "Median":data.sell.median,
                                "Max":data.sell.max,
                                "Min":data.sell.min
                            },
                            "All":{
                                "Volume":data.all.volume,
                                "Weighted Average":data.all.wavg,
                                "Unweighted Average":data.all.avg,
                                "Variance":data.all.variance,
                                "Standard Deviation":data.all.stdDev,
                                "Median":data.all.median,
                                "Max":data.all.max,
                                "Min":data.all.min
                            },
                        }
                    }, {upsert:true}

                );
            }
            onComplete(collection);
            }
        );
}

MongoClient.connect('mongodb://localhost:27017/database', function (err, db) {
    if(err){
        throw err;
    }
    var collection = db.collection('items');
    for(var item in myData){
        doWork(item, collection);
    }
    
});


