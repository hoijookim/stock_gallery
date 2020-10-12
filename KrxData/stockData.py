# -*- coding:utf-8 -*-
from pykrx import stock
from cx_Oracle import connect
import os
LOCATION = r"D:\instantclient_19_6"
os.environ["PATH"] = LOCATION + ";" + os.environ["PATH"]

#https://github.com/sharebook-kr/pykrx
#https://jsideas.net/daily_to_weekly/

con = connect("hoijoo/1234@183.102.147.123:1521/xe")
cur = con.cursor()

tickers = stock.get_market_ticker_list()
print(tickers)
for i in tickers:
    s = stock.get_market_ohlcv_by_date("20201008", "20201012", i, "d", True)
    stockcode = i
    print("=======")
    print(i)
#     print(s)
    
    endPrice = str(s['종가']).split("\n")
    startPrice = str(s['시가']).split("\n")
    highPrice = str(s['고가']).split("\n")
    lowPrice = str(s['저가']).split("\n")
    amount = str(s['거래량']).split("\n")
    for i in range(1, (len(endPrice) - 1)):
        date = str(s.index[i-1]).split(" ")
        print(date[0])
        endPrice1 = endPrice[i].split("    ")
        startPrice1 = startPrice[i].split("    ")
        highPrice1 = highPrice[i].split("    ")
        lowPrice1 = lowPrice[i].split("    ")
        amount1 = amount[i].split("    ")
        print(endPrice1, startPrice1, highPrice1, lowPrice1, amount1)

        if len(endPrice1) == 2 and len(startPrice1) == 2 and len(highPrice1) == 2 and len(lowPrice1) == 2 and len(amount1) == 2 :
            sql = "insert into s_%s values(to_date('%s', 'YYYY-MM-DD'), %s, %s, %s, %s, %s)" % (stockcode, date[0], endPrice1[1].strip(), startPrice1[1].strip(), highPrice1[1].strip(), lowPrice1[1].strip(), amount1[1].strip())
#             sql = "insert into s_%s values(%s, %s, %s, %s, %s, %s)" % (stockcode, date[0], endPrice1[1].strip(), startPrice1[1].strip(), highPrice1[1].strip(), lowPrice1[1].strip(), amount1[1].strip())

            print(sql)
        elif (len(endPrice1) > 2) or (len(startPrice1) > 2) or (len(highPrice1) > 2) or (len(lowPrice1) > 2) or (len(amount1) > 2):
            if(len(amount1) > 2):
                amount1[1] = amount1[len(amount1) - 1].strip()
            if(len(lowPrice1) > 2):
                lowPrice1[1] = lowPrice1[len(lowPrice1) - 1].strip()
            if(len(highPrice1) > 2):
                highPrice1[1] = highPrice1[len(highPrice1) - 1].strip()
            if(len(startPrice1) > 2):
                startPrice1[1] = startPrice1[len(startPrice1) - 1].strip()
            if(len(endPrice1) > 2):
                endPrice1[1] = endPrice1[len(endPrice1) - 1].strip()
            sql = "insert into s_%s values(to_date('%s', 'YYYY-MM-DD'), %s, %s, %s, %s, %s)" % (stockcode, date[0], endPrice1[1], startPrice1[1], highPrice1[1], lowPrice1[1], amount1[1])
#             sql = "insert into s_%s values(%s, %s, %s, %s, %s, %s)" % (stockcode, date[0], endPrice1[1], startPrice1[1], highPrice1[1], lowPrice1[1], amount1[1])
            print(sql)
            print("------")
                
        cur.execute(sql)
        con.commit()
print("성공")






 


