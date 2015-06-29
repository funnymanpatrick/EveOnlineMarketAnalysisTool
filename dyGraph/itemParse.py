#Parse json(given a specific format) into a csv file
import json
import csv
import sys
#Used to print to console
from pprint import pprint

#http://api.eve-marketdata.com/api/item_history2.json?char_name=demo&region_ids=10000002&type_ids=34,456
#Add feasible item ID's to end of url
file_name = sys.argv[1]
with open(file_name) as data_file:
	data = json.load(data_file)
#Dict of relevant data
results = data['emd']['result']
csv_data = csv.writer(open(file_name[0:file_name.find('.json')]+'.csv','wb+'))
#typeID,regionID,date,lowPrice,highPrice,avgPrice,volume,orders
csv_data.writerow("date,highPrice,lowPrice,avgPrice,orders,volume".split(','))
for item in results:
	data_row = []
	data_row.append(item['row']['date'])
	data_row.append(float(item['row']['highPrice']))
	data_row.append(float(item['row']['lowPrice']))
	data_row.append(float(item['row']['avgPrice']))
	data_row.append(int(item['row']['orders']))
	data_row.append(int(item['row']['volume']))
	csv_data.writerow(data_row)
