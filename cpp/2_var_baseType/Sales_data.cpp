#include<iostream>
#include "Sales_data.h"
#include<string>
int main(){
    Sales_data data1,data2;
    double price = 0;
    std::cin >> data1.bookNo >> data1.units_sold >> price;
    data1.revenue = data1.units_sold * price;
    std::cout << data1.bookNo << "," << data1.units_sold << "," << price << std::endl;
    std::cout << data1.revenue;
}

