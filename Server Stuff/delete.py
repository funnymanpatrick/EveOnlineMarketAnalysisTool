from pymongo import MongoClient

con = MongoClient('localhost', 27017)
db = con.database
items = db.items
item_list = items.find()
for item in item_list:
    print item
