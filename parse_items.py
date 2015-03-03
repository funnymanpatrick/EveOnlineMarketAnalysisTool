'''
Eve Online Market Analysis Tool
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
'''


import requests
import json

f = open("typeid.txt", "r")

items = {}
for line in f:
    if(line[0].isdigit()):
        l = line.strip('\n').split()
        if(int(l[0]) < 18): continue
        r = requests.get("http://api.eve-central.com/api/marketstat/json?typeid="+str(l[0]))
        d = r.json()        
        if(d[0]['sell']['volume'] == 0): continue
        if(not("Blueprint" in l)):        
            s = ""
            for i in range(1,len(l)):
                s += l[i] + " "
            items[int(l[0])] = s

for item in sorted(items):
    print item, ":", items[item]
    
print len(items)