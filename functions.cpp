#include <iostream>
#include <vector>

float AverageVolPerOrder(float Volume, float Orders)
{
	return Volume/Orders;
}

float Margin(float High, float Low)
{
	return (High-Low)/Low;
}

float Avg(vector<float> Numbers)
{
	float Total = 0;
	for (int i = 0; i < Numbers.size(); i++)
	{
		Total += Numbers[i];
	}
	return Total/Numbers.size();
}

vector<int> HistoricalLows(vector<float> Prices)
{
	vector<int> Answer;
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

vector<int> HistoricalHighs(vector<float> Prices)
{
	vector<int> Answer;
	float Avg = Avg(Prices);

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
