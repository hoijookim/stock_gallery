# -*- coding:utf-8 -*-
from cx_Oracle import connect
from pykrx import stock

con = connect("hoijoo/1234@192.168.75.192:1521/xe")   
cur = con.cursor()
tickers = stock.get_market_ticker_list()
for c in tickers:
    sql = "create table s_%s(s_date date primary key, s_endprice varchar2(8 char), s_startprice varchar2(8 char), s_highprice varchar2(8 char), s_lowprice varchar2(8 char), s_amount varchar2(20 char))" % (c)
    cur.execute(sql)
    con.commit()
#     sql1 = "drop table s_%s cascade constraint purge" % (c)
#     cur.execute(sql1)
#     con.commit()
print("성공")
# s = stock.get_market_ohlcv_by_date("2020201", "20200210", "060310", "d", True)
# endPrice = str(s['종가']).split("\n")
# startPrice = str(s['시가']).split("\n")
# highPrice = str(s['고가']).split("\n")
# lowPrice = str(s['저가']).split("\n")
# amount = str(s['거래량']).split("\n")
# for i in range(1, (len(endPrice) - 1)):
#     date = str(s.index[i-1]).split(" ")
#     print(date[0])
#     endPrice1 = endPrice[i].split("    ")
#     startPrice1 = startPrice[i].split("    ")
#     highPrice1 = highPrice[i].split("    ")
#     lowPrice1 = lowPrice[i].split("    ")
#     amount1 = amount[i].split("    ")
#     print(endPrice1, startPrice1, highPrice1, lowPrice1, amount1)

