import re

# Searches for a number following a label with the format "label number"
# ex. "time 10", and returns the number (in this case, 10 would be returned)
# If the number contains a decimal, it returns a float, otherwise it returns
# an int
def findNum(configFile, label):
	regEx = re.compile('\n'+label + ' (\d+(\.\d+)?)')
	result = regEx.search(configFile)
	if (not result):
		return label + " not found or not a number."
	elif ('.' in result.group(1)):
		return float(result.group(1))
	else:
		return int(result.group(1))

# Searches for a string following a label with the format "label string"
# ex. "color blue", and returns the string (in this case, "blue" would be returned)
def findString(configFile, label):
	regEx = re.compile('\n'+label + ' (.*)')
	result = regEx.search(configFile)
	if (result):
		return result.group(1)
	else:
		return label + " not found."

# open the config file for reading
f = open('config.ini', 'r')
configFile = f.read()

# Sample config file parsing
print findNum(configFile, 'test')
print findNum(configFile, 'color')
print findString(configFile, 'notHere')
print findNum(configFile, 'time')
print findString(configFile, 'test2')