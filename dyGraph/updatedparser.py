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
highlows=[];
averages=[];
for item in results:
	data_row = []
	data_row.append(item['row']['date'])
	data_row.append(float(item['row']['highPrice']))
	highlows.append('highPrice')
	data_row.append(float(item['row']['lowPrice']))
	highlows.append('lowPrice')
	data_row.append(float(item['row']['avgPrice']))
	averages.append('avgPrice')
	csv_data.writerow(data_row)


def dauchian_channel(highandlows):
	high=0;
	low=0;
	5DayHigh=[];
	5DayLow=[];
	highlows=[];
	i=0
	for i in range(len(highandlows)):
		if high==0 and low==0:
		 	high=highandlows[i]
		 	highlows.push(high)
		elif i%2!=0: 
			high=highandlows[i];
			if len(5DayHigh)!=5: 
				5DayHigh.append(high)
				highlows.append(findHighLow(5DayHigh))
			else:
				##function to shift values over because you only look at 5 day High
				5DayHigh=newHighLow(5DayHigh)
				highlows.append(findHighLow(5DayHigh))
		else 
			low=highandlows[i]
			if len(5DayLow)!=5:
				5DayLow.push(low)
				highlows.push(findHighLow(5DayLow))
			else:
				##function to shift values over because you only look at 5 day High
				5DayLow=newHighLow(5DayLow)
				highlows.push(findHighLow(5DayLow))
	return highlows		


def weighted_mean(averages):
	var weighted_mean_divider=0
	var weighted_mean_number=0
	weighted_averages=[]
	i=0
	for i in range(len(averages)): 
		weighted_averages[i]=(averages[i]*(i*.1))
		weighted_mean_divider+=(i*.1)
		weighted_mean_number=(averages[i]*(i*.1))
	weighted_total= weighted_mean_number/weighted_mean_divider
	return weighted_total


def newHighLow(dailyHighsLows):
	newHigh=[]
	i=1
	for i in range(5):
		newHigh.push(dailyHighsLows[i])
	return newHigh


def findHighLow(dailyHighsLows):
	number=0
	i=0
	for i in range(len(dailyHighsLows):
		if(dailyHighsLows[i]>number) 
			number=dailyHighsLows[i]
	return number
