# -*- coding: utf-8 -*

import sys
reload(sys)
sys.setdefaultencoding('utf8')
import xlrd
import re
import sys
import os

income_real_path = "./income_real";
income_raw_path = "./income_raw";

def get_data(file_path):
    files = os.listdir(file_path);
    real_income_datas = [];
    for f in files:
        real_book = xlrd.open_workbook(file_path + "/" + f);    
        real_sheet = real_book.sheets()[0];
        rows = real_sheet.nrows;
        for index in range(rows):
            real_income_datas.append(real_sheet.row_values(index));
    return real_income_datas;

def get_raw_income(file_path):
    raw_data = get_data(file_path);
    raw_income = {};
    for row in raw_data:
        if (re.match('AGFA\d',row[3]) is not  None and "收入" in row[1]): 
            raw_income[row[3]] = row[4];
    return raw_income;
            
def get_real_income(file_path):
    real_data = get_data(file_path);
    real_income ={};
    invalid_data = [];
    for row in real_data:
        if (row[6] is not None and len(row[6])>6 and re.match('AGFA\d',row[6])):
            real_income[row[6].split(",")[0]] = row[1];
            if (len(row[6].split(",")) >1):
                real_income[row[6].split(",")[1]] = row[1];
        elif(row[6] is None or len(row[6])<7):
            invalid_data.append(row);
    return real_income, invalid_data

def diff_data(raw_income, real_income):
    for number in raw_income:
        raw_price = raw_income[number];
        #if ( real_income.get(number, "0")!="0" and abs(real_income[number] / 1.17 - raw_price) >0.31 ):
            # print number 
            # print real_income.get(number, "not exit")
            # print raw_price;
            # print "=========";
        if (real_income.get(number,"0") == "0"):
            print number
            print raw_price
            print "======="

def process_invalid(data):
    for d in data:
        print d

if __name__ == '__main__':
    raw_income = get_raw_income(income_raw_path)
    real_income, invalid_data = get_real_income(income_real_path);
    diff_data(raw_income, real_income);
   # process_invalid(invalid_data);
    
