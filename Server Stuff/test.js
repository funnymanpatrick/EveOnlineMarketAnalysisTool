/*    Eve Online Market Analysis Tool
    Copyright (C) 2015  Eve Online Market Analysis Tool Team

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

//Code for Functions


//Takes in the Volume and # of Orders for a given item and returns the average volume per order
function staticAverageVolumePerOrder(Volume, Orders)
{
    if (Orders === 0) {return 0.0;}
    return (Volume/Orders);
}

//Takes in the High and Low Price for a given item and gives a rough estimate of volume under ideal circumstances
function staticMargin(High,Low)
{
    if (Low === 0) {return 0.0;}
    return (High-Low)/Low;
}

//Takes in the Buy average and Sell average for a given item, and a third optional argument that is the tax modifier based on skills, returns the Real Margin
function staticRealMargin(Buy,Sell,skillmod)
{
    if (skillmod === undefined) {skillmod = 1.0;}
    if (Sell === 0) {return 0.0;}
    {
        return ((Sell-Buy)/Buy)*skillmod;
    }
}

//Uses a characters relevant in game skills to calculate the Broker's Fee the player will be charged on a given transaction
function BrokerFee(BrokerRelationsSkill, FactionStanding, CorpStanding)
{
    return Math.pow(Math.E,(Math.log(1-(0.05 * BrokerRelationsSkill))-(0.1 * FactionStanding) - (0.04 * CorpStanding)));
}

//Uses a characters relevant in game skills to calculate the Sales Tax the player will be charged on a given transaction
function SalesTax(AccountingSkill)
{
    return 0.01 - (0.001 * AccountingSkill);
}

//Finds an average of a set of numbers
function Avg(data)
{
    var tot = 0;
    if (data.length === 0) {return 0.0;}
    for (var i = 0; i < data.length; i++)
    {
        tot += data[i];
    }
    return tot/data.length;
}

//Finds prices where the price is lower than the 2 days before and after it
function HistoricalLows(Prices)
{
    var Answer;
    var avg = Avg(Prices);

    // Assumes prices is vector of all prices over the past 12 months
    // Assumes prices[0] is price from 12 months before prices[prices.size() - 1]
    for (var i = 0; i < Prices.length; i++)
    {
        if (i === 0)
        {
            if (Prices[i] < Prices [i+1] && Prices[i] < Prices[i+2]  && Prices[i] < avg) 
                {Answer[Answer.length] = i;}
        }
        else if (i === Prices.length)
        {
            if (Prices[i] < Prices[i-1] && Prices[i] < Prices[i-2] && Prices[i] < avg) 
                {Answer[Answer.length] = i;}
        }
        else if (i === 1)
        {
            if (Prices[i] < (Prices[i-1] + Prices[i+2])/2 && Prices[i] < Prices[i+2] && Prices[i] < avg) 
                {Answer[Answer.length] = i;}
        }
        else if (i === Prices.length - 1)
        {
            if (Prices[i] < (Prices[i-1] + Prices[i+1])/2 && Prices[i] < Prices[i-2] && Prices[i] < avg) 
                {Answer[Answer.length] = i;}
        }
        else
        {
            if (Prices[i] < (Prices[i-1] + Prices[i+1])/2 && Prices[i] < (Prices[i-2] + Prices[i+2])/2 && Prices[i] < avg) 
                {Answer[Answer.length] = i;}
        }
    }
    return Answer;
}

//Finds prices where the price is higher than the 2 days before and after it
function HistoricalHighs(Prices)
{
    var Answer;
    var avg = Avg(Prices);

    // Assumes prices is vector of all prices over the past 12 months
    // Assumes prices[0] is price from 12 months before prices[prices.size() - 1]

    for (var i = 0; i < Prices.length; i++)
    {
        if (i === 0)
        {
            if (Prices[i] > Prices [i+1] && Prices[i] > Prices[i+2] && Prices[i] > avg) 
                {Answer[Answer.length] = i;}
        }
        else if (i === Prices.size())
        {
            if (Prices[i] > Prices[i-1] && Prices[i] > Prices[i-2] && Prices[i] > avg) 
                {Answer[Answer.length] = i;}
        }
        else if (i === 1)
        {
            if (Prices[i] > (Prices[i-1] + Prices[i+1])/2 && Prices[i] > Prices[i+2] && Prices[i] < avg) 
                {Answer[Answer.length] = i;}
        }
        else if (i === Prices.size()-1)
        {
            if (Prices[i] > (Prices[i-1] + Prices[i+1])/2 && Prices[i] > Prices[i-2] && Prices[i] < avg) 
                {Answer[Answer.length] = i;}
        }
        else
        {
            if (Prices[i] > (Prices[i-1] + Prices[i+1])/2 && Prices[i] > (Prices[i-2] + Prices[i+2])/2 && Prices[i] > avg) 
                {Answer[Answer.length] = i;}
        }
    }
    return Answer;
}

// Returns the P/E ratio of an item over the last 12 months
// High P/E ratios generally imply riskier investments
// If the stock has dropped in the past 12 months, there is no P/E ratio
function peRatio(prices)
{
    // Assumes prices is vector of all prices over the past 12 months
    // Assumes prices[0] is price from 12 months before prices[prices.size() - 1]
    var PE = -1;
    
    if (prices[prices.length - 1] - prices[0] <= 0)
    {
        return PE;
    }
    PE = prices[prices.length - 1] / (prices[prices.length - 1] - prices[0]);
    return PE;
}

//End of Functions

//MongoDB Update code


var hrstart = process.hrtime();
var request = require("request");
var myData = require('/root/Eve/dict.json');
var MongoClient = require('mongodb').MongoClient, format = require('util').format;

var numRequests = 0;

function onComplete(collection) {
    //console.log("onComplete called: numRequests =", numRequests);
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
    });
    */
}

function doWork(item, collection){
    //Jita(The Forge) - 10000002
    //Amarr(Domain) - 10000043
    //Rens(Heimatar) - 10000030
    //Dodixie(Sinq Laison) - 10000032
    //Hek(Metropolis) - 10000042
    var url = "http://api.eve-marketdata.com/api/item_history2.json?char_name=Patrick_Crockett&region_ids=10000002,10000043,10000030,10000032,10000042&type_ids=" + myData[item].FIELD1+"&days=365";
    numRequests += 1;
    //console.log(myData[item].FIELD1);
    request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var data = body.emd;
                for(var i = 0; i < data.result.length; i++){
                    if(typeof data.result[i].row != 'undefined'){
                        collection.update(
                            { "_id": data.result[i].row.date},
                            {
                                $set: {
                                    "Name":myData[item].FIELD2,
                                    "Region":parseInt(data.result[i].row.regionID),
                                    "Low Price":parseInt(data.result[i].row.lowPrice),
                                    "High Price":parseInt(data.result[i].row.highPrice),
                                    "Average Price":parseInt(data.result[i].row.avgPrice),
                                    "Volume":parseInt(data.result[i].row.volume),
                                    "Orders":parseInt(data.result[i].row.orders)
                                }
                            }, {upsert:true}
                        );
                    }
                }
            }
            onComplete(collection);
            }
        );
}

MongoClient.connect('mongodb://localhost:27017/database', function (err, db) {
    if(err){
        throw err;
    }
    
    for(var item in myData){
        var collection = db.collection(item);
        doWork(item, collection);
    }
    
});


