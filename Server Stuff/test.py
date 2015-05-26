from pymongo import MongoClient
import csv
import requests

if __name__ == "__main__":
    con = MongoClient('localhost', 27017)

    db = con.database
    items = db.items
    item_list = items.find({"ID":"368243"})
    for item in item_list:
        print item["Sell"]["Min"]
    for item in item_list:
        print item
