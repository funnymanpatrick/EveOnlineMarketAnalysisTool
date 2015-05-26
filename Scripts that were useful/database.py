from pymongo import Connection
import csv
import requests

if __name__ == "__main__":
    con = Connection()
    
    db = con.database
    items = db.items
    item_list = items.find({"ID":"368243"})
    for item in item_list:
        print item["Sell"]["Min"]
    #for item in item_list:
        #print item
    #with open('dict.csv', mode='r') as infile:
        #reader = csv.reader(infile)
        #for row in reader:
            #try:
                #r = requests.get("http://api.eve-central.com/api/marketstat/json?typeid="+row[0])
                #d = r.json()[0]            
                #db.items.insert({"ID":row[0], "Name":row[1],
                                 #"Buy":{"Volume":d['buy']['volume'],
                                        #"Weighted Average":d['buy']['wavg'],
                                        #"Unweighted Average":d['buy']['avg'],
                                        #"Variance":d['buy']['variance'],
                                        #"Standard Deviation":d['buy']['stdDev'],
                                        #"Median":d['buy']['median'],
                                        #"Max":d['buy']['max'],
                                        #"Min":d['buy']['min']
                                        #},
                                 #"Sell":{"Volume":d['sell']['volume'],
                                        #"Weighted Average":d['sell']['wavg'],
                                        #"Unweighted Average":d['sell']['avg'],
                                        #"Variance":d['sell']['variance'],
                                        #"Standard Deviation":d['sell']['stdDev'],
                                        #"Median":d['sell']['median'],
                                        #"Max":d['sell']['max'],
                                        #"Min":d['sell']['min']
                                        #},    
                                 #"All":{"Volume":d['all']['volume'],
                                        #"Weighted Average":d['all']['wavg'],
                                        #"Unweighted Average":d['all']['avg'],
                                        #"Variance":d['all']['variance'],
                                        #"Standard Deviation":d['all']['stdDev'],
                                        #"Median":d['all']['median'],
                                        #"Max":d['all']['max'],
                                        #"Min":d['all']['min']
                                        #}                             
                                #})
            #except:
                #pass
    
