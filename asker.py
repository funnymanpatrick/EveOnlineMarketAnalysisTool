import search

s = raw_input('What would you like to do?\n1. Request name\n2. Buy Information\n3. Sell Information\n')

data = {}

if s == "1":
    itemID = raw_input('Enter an item ID: ')
    name = search.findName(itemID)
    print "Item", itemID, "is", name
if s == "2":
    mode = "buy"
    itemID = raw_input("You want the buy information for which item ID?")
    print "Enter one or more numbers corresponding to the information you want(i.e. 1 2 3 4)"
    print "1. Volume\n2. Weighted Average\n3. Unweighted Average\n4. Variance"
    print "5. Standard Deviation\n6. Median\n7. Max Price\n8. Min Price"
    choice = raw_input()
    choices = choice.split()
    name = search.findName(itemID)
    print "Item", itemID, "is", name    
    data = search.execute(mode, itemID, choices)
    
    
if s == "3":    
    mode = "sell"
    itemID = raw_input("You want the sell information for which item ID?")
    print "Enter one or more numbers corresponding to the information you want(i.e. 1 2 3 4)"
    print "1. Volume\n2. Weighted Average\n3. Unweighted Average\n4. Variance"
    print "5. Standard Deviation\n6. Median\n7. Max Price\n8. Min Price"
    choice = raw_input()
    choices = choice.split()
    name = search.findName(itemID)
    print "Item", itemID, "is", name    
    data = search.execute(mode, itemID, choices)
      