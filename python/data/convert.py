#!/usr/bin/python
#encoding=utf8
"""
    created by guqi <guqi@baidu.com>
    bce yuqing  tools
"""

import sys
reload(sys)
sys.setdefaultencoding('utf-8')

import datetime
import hashlib
import hmac
import time
import json
import urllib2
import urllib
import hmac
import os
import sys

zh_title = {
'signal_relevance':'风险信号关联程度',
'signal_name':'风险信号名称',
'msg_abstract':'消息摘要',
'msg_title':'消息标题',
'msg_sub_title':'消息副标题',
'signal_level':'风险信号级别',
'search_type':'检索类型',
'msg_level':'消息重要级别',
'msg_date':'消息日期',
'msg_text':'消息正文',
'msg_keywords':'消息关键词',
'keywords':'关键词',
'search_type_inner':'内部检索类型',
'company_name':'公司名',
'gov_depart':'行政机构',
'tag':'行政处罚级别'
}

if __name__ == "__main__":
    filename = sys.argv[1]
    file = open(filename, 'r')
    fields = []
    for line in file:
        jdict = json.loads(line)
        ret = ""
        if len(fields) == 0:
            for k,v in jdict.items():
                fields.append(k)
                ret = ret + zh_title.get(k, k) + "\t"
            print ret
        ret = ""
        for k in fields:
            if k in jdict:
                ret = ret + str(jdict[k]).replace("\n", " ").replace("\t", " ") + "\t"
            else:
                ret = ret + "\t"
        print ret
