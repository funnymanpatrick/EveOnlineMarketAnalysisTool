import requests
import json
import csv

f = open("typeid.txt", "r")

items = {}
with open('dict.csv', 'ab') as csvfile:
    writer = csv.writer(csvfile)
    for line in f:
        if(line[0].isdigit()):
            l = line.strip('\n').split()
            print l[0]
            r = requests.get("http://api.eve-central.com/api/marketstat/json?typeid="+str(l[0]))
            try:
                d = r.json()        
            except:
                pass
            if(d[0]['sell']['volume'] == 0): continue
            if(not("Blueprint" in l)):        
                s = ""
                for i in range(1,len(l)):
                    s += l[i] + " "
                writer.writerow([l[0], s])

print "done"
