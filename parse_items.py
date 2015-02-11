f = open("typeid.txt", "r")

items = {}
for line in f:
    if(line[0].isdigit()):
        l = line.strip('\n').split()
        if(int(l[0]) < 20): continue
        if(not("Blueprint" in l)):        
            s = ""
            for i in range(1,len(l)):
                s += l[i] + " "
            items[int(l[0])] = s

for item in sorted(items):
    print item, ":", items[item]
    
