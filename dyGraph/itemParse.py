#Parse JSON(given a specific format) into a CSV file
import json
import csv
#Used to print to console (used for debugging)
from pprint import pprint

#http://api.eve-marketdata.com/api/item_history2.json?char_name=demo&region_ids=10000002&type_ids=34,456
#Add feasible item ID's to end of url
with open('itemHistory5.json') as data_file:
	data = json.load(data_file)
#Dict of relevant data
results = data['emd']['result']
csv_data = csv.writer(open('datacsv.csv','wb+'))
#typeID,regionID,date,lowPrice,highPrice,avgPrice,volume,orders
csv_data.writerow(data['emd']['columns'].split(','))
#Loop through results
#Append data to data_row
#Write row to file
for item in results:
	data_row = []
	data_row.append(item['row']['typeID'])
	data_row.append(item['row']['regionID'])
	data_row.append(item['row']['date'])
	data_row.append(float(item['row']['lowPrice']))
	data_row.append(float(item['row']['highPrice']))
	data_row.append(float(item['row']['avgPrice']))
	data_row.append(int(item['row']['volume']))
	data_row.append(int(item['row']['orders']))
	csv_data.writerow(data_row)