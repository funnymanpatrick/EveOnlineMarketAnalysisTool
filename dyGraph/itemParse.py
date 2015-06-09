#Parse json(given a specific format) into a csv file
import json
import csv
#Used to print to console
from pprint import pprint

#http://api.eve-marketdata.com/api/item_history2.json?char_name=demo&region_ids=10000002&type_ids=34,456
#Add feasible item ID's to end of url
with open('item34.json') as data_file:
	data = json.load(data_file)
#Dict of relevant data
results = data['emd']['result']
csv_data = csv.writer(open('example.csv','wb+'))
#typeID,regionID,date,lowPrice,highPrice,avgPrice,volume,orders
csv_data.writerow("date,highPrice,lowPrice,avgPrice".split(','))
for item in results:
	data_row = []
	data_row.append(item['row']['date'])
	data_row.append(float(item['row']['highPrice']))
	data_row.append(float(item['row']['lowPrice']))
	data_row.append(float(item['row']['avgPrice']))
	csv_data.writerow(data_row)