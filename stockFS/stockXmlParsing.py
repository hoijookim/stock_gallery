# -*- coding:utf-8 -*-
from urllib.request import urlopen 
from zipfile import ZipFile 
from io import BytesIO 
import xml.etree.ElementTree as elemTree 
from cx_Oracle import connect
API_key = "61f9046510cf08525a9d6a580aaf752a4bc0f789" 
url = "https://opendart.fss.or.kr/api/corpCode.xml?crtfc_key=" + API_key
resp = urlopen(url) 
with ZipFile(BytesIO(resp.read())) as zf: 
    file_list = zf.namelist() 
    while len(file_list) > 0: 
        file_name = file_list.pop() 
        corpCode = zf.open(file_name).read().decode() 
        
tree = elemTree.fromstring(corpCode) 

XML_stocklist = tree.findall("list") 
corp_code = [x.findtext("corp_code") for x in XML_stocklist] 
corp_name = [x.findtext("corp_name") for x in XML_stocklist] 
stock_code = [x.findtext("stock_code") for x in XML_stocklist] 
modify_date = [x.findtext("modify_date") for x in XML_stocklist] 
con = connect("hoijoo/1234@192.168.75.192:1521/xe")
cur = con.cursor()
for i in range(len(corp_code)):
    if stock_code[i] != " ":
        sql = "insert into corpcode values('%s', '%s', '%s')" % (stock_code[i], corp_name[i], corp_code[i])
        print(sql)
        cur.execute(sql)
        if cur.rowcount == 1:
            print("OK")
            con.commit()

con.close()



