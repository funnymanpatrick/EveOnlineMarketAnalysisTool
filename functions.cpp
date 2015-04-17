#include <iostream>
#include <vector>

//Assuming an input of the volume for a given item and the number of unique orders
//This will tell us how many of an item the average trader has in each order
float AverageVolPerOrder(float Volume, float Orders)
{
	if (Orders == 0) return 0.0;
	return Volume/Orders;
}

//Takes in the daily high/low for an item
//Gives a rough estimate on the margin for a given item, this will later account for skills
float Margin(float High, float Low)
{
	if (Low == 0) return 0.0;
	return (High-Low)/Low;
}

//Takes in the average buy and sell for a given item, returns a better estimate of the margin
float Real_Margin(float Sell, float Buy)
{
	if (Buy == 0) return 0.0;
	return (Sell-Buy)/Buy;
}

//Find the average of a vector of floats
float Avg(vector<float> Numbers)
{
	if (Numbers.size() == 0) return 0.0;
	float Total = 0;
	for (int i = 0; i < Numbers.size(); i++)
	{
		Total += Numbers[i];
	}

	return Total/Numbers.size();
}

//Finds prices where the price is lower than the 2 days before and after it
vector<int> HistoricalLows(vector<float> Prices)
{
	vector<int> Answer;
	float Avg = Avg(Prices);

	// Assumes prices is vector of all prices over the past 12 months
	// Assumes prices[0] is price from 12 months before prices[prices.size() - 1]
	for (int i = 0; i < Prices.size(); i++)
	{
		if (i == 0)
		{
			if (Prices[i] < Prices [i+1] && Prices[i] < Prices[i+2]  && Prices[i] < Avg) Answer.pushback(i);
		}
		else if (i == Prices.size())
		{
			if (i] < Prices[i-1] && Prices[i] < Prices[i-2] && Prices[i] < Avg) Answer.pushback(i);
		}
		else if (i == 1)
		{
			if (Prices[i] < (Prices[i-1] + Prices[i+2])/2 && Prices[i] < Prices[i+2] && Prices[i] < Avg) Answer.pushback(i);
		}
		else if (i == Prices.size()-1)
		{
			if (Prices[i] < (Prices[i-1] + Prices[i+1])/2 && Prices[i] < Prices[i-2] && Prices[i] < Avg) Answer.pushback(i);
		}
		else
		{
			if (Prices[i] < (Prices[i-1] + Prices[i+1])/2 && Prices[i] < (Prices[i-2] + Prices[i+2])/2 && Prices[i] < Avg) Answer.pushback(i);
		}
	}
	return Answer;
}

//Finds prices where the price is higher than the 2 days before and after it
vector<int> HistoricalHighs(vector<float> Prices)
{
	vector<int> Answer;
	float Avg = Avg(Prices);

	// Assumes prices is vector of all prices over the past 12 months
	// Assumes prices[0] is price from 12 months before prices[prices.size() - 1]

	for (int i = 0; i < Prices.size(); i++)
	{
		if (i == 0)
		{
			if (Prices[i] > Prices [i+1] && Prices[i] > Prices[i+2] && Prices[i] > Avg) Answer.pushback(i);
		}
		else if (i == Prices.size())
		{
			if (Prices[i] > Prices[i-1] && Prices[i] > Prices[i-2] && Prices[i] > Avg) Answer.pushback(i);
		}
		else if (i == 1)
		{
			if (Prices[i] > (Prices[i-1] + Prices[i+1])/2 && Prices[i] > Prices[i+2] && Prices[i] < Avg) Answer.pushback(i);
		}
		else if (i == Prices.size()-1)
		{
			if (Prices[i] > (Prices[i-1] + Prices[i+1])/2 && Prices[i] > Prices[i-2] && Prices[i] < Avg) Answer.pushback(i);
		}
		else
		{
			if (Prices[i] > (Prices[i-1] + Prices[i+1])/2 && Prices[i] > (Prices[i-2] + Prices[i+2])/2 && Prices[i] > Avg) Answer.pushback(i);
		}
	}
	return Answer;
}

// Returns the P/E ratio of an item over the last 12 months
// High P/E ratios generally imply riskier investments
// If the stock has dropped in the past 12 months, there is no P/E ratio
float peRatio(vector<float> prices)
{
	// Assumes prices is vector of all prices over the past 12 months
	// Assumes prices[0] is price from 12 months before prices[prices.size() - 1]
	float PE = -1;
	
	if (prices[prices.size() - 1] - prices[0] <= 0)
	{
		return PE;
	}
	PE = prices[prices.size()-1] / (prices[prices.size() - 1] - prices[0]);
	return PE;
}