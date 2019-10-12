#!/usr/bin/env python
#-*- coding:utf-8 -*-
import sys
import os,cStringIO,sys,traceback 
import requests
import urllib
from collections import OrderedDict
import time
import random
reload(sys)
sys.setdefaultencoding( "utf-8" )

class Process:
    def __init__(self):
        self.login()


    def login(self):

        loginUrl = "https://reg.lenovo.com.cn/auth/v3/dologin"
        headers = {
            "Content-Type":"application/x-www-form-urlencoded",
            "Host":"reg.lenovo.com.cn",
            "Origin":"https://shop.lenovo.com.cn",
            "Referer":"https://shop.lenovo.com.cn/",
            "User-Agent":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36"
        }
        data = {
            "account":"18611701867",
            "password":"baobei20",
            "ps":"1",
            "ticket":"e40e7004-4c8a-4963-8564-31271a8337d8"
        }
        Soj_session = requests.session()
        res = Soj_session.post(loginUrl, data=data, headers=headers,timeout=2)
        print (res.text) #打印返回的文本信息 

        goodsAddrss = "1005726"
        #打开一个商品的详情页
        url_sp = "https://item.lenovo.com.cn/product/%s.html" % goodsAddrss
        print (url_sp)
        res_sp = Soj_session.get(url_sp,timeout=2)
        res_sp.encoding = "UTF-8"
        time.sleep(1.5)

        #调用directBuy接口
        direct_headers = {
            "Accept":"*/*",
            "Host":"buy.lenovo.com.cn",
            "Referer":url_sp,
            "User-Agent":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36"
        }
        url_direct = "https://buy.lenovo.com.cn/api/cart/directbuy.jhtm?ss=640&itemtype=0&gcodes=%s&icount=1&opgcode=&servicecode=&customids=&sharecode=&terminal=1&callbackparam=jQuery111101795241972008248_1570770301743&_=1570770301769" % goodsAddrss
        print (url_direct)
        res_direct = Soj_session.get(url_direct,headers=direct_headers,timeout=2)
        time.sleep(1)

        #点击立即购买按钮
        buy_hearders = {
            "Host":"buy.lenovo.com.cn",
            "Referer":url_sp,
            "Upgrade-Insecure-Requests":"1",
            "User-Agent":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36"
        }
        url_buy = "https://buy.lenovo.com.cn/checkout/lenovopc.html?buytype=1"
        res_buy = Soj_session.get(url_buy,headers=buy_hearders,timeout=2)
        res_buy.encoding = "UTF-8"
        #先调用checkout接口
        checkout_headers = {
            "Accept":"*/*",
            "Host":"buy.lenovo.com.cn",
            "Referer":"https://buy.lenovo.com.cn/checkout/lenovopc.html?buytype=1",
            "User-Agent":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
            "X-Requested-With":"XMLHttpRequest"
        }
        url_checkout = "https://buy.lenovo.com.cn/api/checkout/checkout.jhtm?buyType=1&token=&tokenTimeStamp=&ran="+str(random.random())
        print (url_checkout)
        res_checkout = Soj_session.get(url_checkout,headers=checkout_headers,timeout=2)
        print (res_checkout.text)
        dict_checkout = eval(res_checkout.text.replace("false","0").replace("true","1"))
        #consigneeId = dict_checkout.get("t","").get("consignee","").get("id","")
        checkoutType = dict_checkout.get("t","").get("checkoutType","")
        print (checkoutType)
        #调用getList接口获取地址信息
        consigneeId = ""
        consignee_headers = {
            "Accept":"*/*",
            "Host":"buy.lenovo.com.cn",
            "Referer":"https://buy.lenovo.com.cn/checkout/lenovopc.html?buytype=1",
            "User-Agent":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
            "X-Requested-With":"XMLHttpRequest"
        }
        url_consignee = "https://buy.lenovo.com.cn/consignee/getList.jhtm?type=SH&pageNum=1&pageSize=10&ran=0.4201868414088046"
        res_consignee = Soj_session.get(url_consignee,headers=consignee_headers,timeout=2)
        res_consignee_dict = eval(res_consignee.text.replace("false","0").replace("true","1"))
        if res_consignee_dict.get("msg","") == "success":
            consigneeId = res_consignee_dict.get("data","")[0].get("id","")
        print (consigneeId)

        #再调用发票接口
        url_invoice = "https://buy.lenovo.com.cn/addCommonInvoice.jhtm?customername=个人&custType=0&invoiceType=1&ran=0.3939352633121549"
        res_invoice = Soj_session.get(url_invoice,timeout=2)
        print (res_invoice.text.encode("utf-8"))
        dict_invoice = eval(res_invoice.text.replace("false","0").replace("true","1"))
        invoiceId = dict_invoice.get("data","").get("id","")
        print (invoiceId)

        #点击提交订单按钮
        submit_headers = {
            "Accept":"*/*",
            "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
            "Origin":"https://buy.lenovo.com.cn",
            "Referer":"https://buy.lenovo.com.cn/checkout/lenovopc.html?buytype=1",
            "User-Agent":"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36",
            "X-Requested-With":"XMLHttpRequest"
        }
        od = OrderedDict()
        od["buyType"] = "1"
        od["happyBeanNum"] = "0"
        od["innerBuyMoney"] = "0"
        od["consigneeId"] = str(consigneeId)
        od["couponCode"] = ""
        od["couponids"] = ""
        od["cashCoupon"] = "0"
        od["storeId"] = ""
        od["storeNo"] = ""
        od["token"] = ""
        od["tokenTimeStamp"] = ""
        od["paytype"] = "0"
        od["deliverGoodsType"] = "1"
        od["invoiceId"] = str(invoiceId)
        od["invoiceType"] = "0"
        od["invoiceheadType"] = "0"
        od["invoiceheadcontent"] = "个人"
        od["receiverPhone"] = ""
        od["receiverEmail"] = ""

        od["cmanagercode"] = ""
        od["orderremark"] = ""

        od["preSaleMobile"] = ""
        od["checkoutType"] = str(checkoutType)
        od["defaultPayment"] = ""
        od["idDentity"] = ""

        data = urllib.urlencode(od)
        print (data)

        url_submit = 'https://buy.lenovo.com.cn/api/checkout/submit.jhtm'
        #发送访问请求
        resp = Soj_session.post(url_submit,data=data,headers=submit_headers,timeout=2)
        resp.encoding = "UTF-8"
        print(resp.text)

if __name__ == '__main__':  
    obj = Process()