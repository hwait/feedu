import requests
from requests.exceptions import RequestException
import pandas as pd
import json
import re
import os
import codecs

def ls(link,fn):
    
    if os.path.isfile('data/{0}.html'.format(fn)):
        with codecs.open('data/{0}.html'.format(fn),'r',encoding='utf8') as f:
            html=f.read()
            if len(html)>100000:
                return html
    s = requests.Session()
    #s.headers=headers
    try:
        r=s.get(link)
    except RequestException as e:
        print('ERROR!',e)
        return ''
    with codecs.open('data/{0}.html'.format(fn),'w',encoding='utf8') as f:
        f.write(r.text)
    return r.text


headers = {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Content-Type': 'application/json',
            'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:54.0) Gecko/20100101 Firefox/54.0',
            'Connection': 'keep-alive',
            'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjowLCJhY3RpdmUiOnRydWUsInVzZXJzIjpbXSwibmFtZSI6ItCU0LDRgNGM0Y8iLCJzdXJuYW1lIjoi0JrQsNGI0LDQstC60LjQvdCwIiwiZW1haWwiOiJkYXNoYTdkNUBnbWFpbC5jb20iLCJhdmF0YXIiOiIvL3d3dy5ncmF2YXRhci5jb20vYXZhdGFyL2I1Yzk0MWM1Yzc3ZmJlNzVhNTM2ZWZiZDYwZmIyODA2P3M9MjAwJnI9cGcmZD1tbSIsImRhdGUiOiIyMDE5LTAzLTEwVDA2OjI2OjU2LjI4MloiLCJfX3YiOjEsImlkIjoiNWM4NGFlMzAwNzhiY2QwMmZjYzAxODFmIiwiaWF0IjoxNTY0Njg4MjAzLCJleHAiOjE1NjQ2OTE4MDN9.-8DgqKUFXd8Zvawrzf_ykh2Zlx5-iHsunIYrPkoI9cA'
            
        }
s = requests.Session()
s.headers=headers
    
sdf = pd.read_csv('subj.csv', encoding = "utf-8")
for i, row in sdf.iterrows():
    (subj,boo,cn)=row.link.split('/')
    link='https://interneturok.ru/subject/{}'.format(row.link)
    course={}
    course['subjects'] = [row.cid]
    course['books'] = []    
    course['name'] = f'INU: {subj} {cn} class.' 
    course['sname'] = f'INU: {subj}-{cn}'
    course['link'] = ''
    course['lessonsn'] = str(sdf.cid.count())
    course['description'] =  f'INU: {subj} {cn} class.' 
    course_json = json.dumps(course)
    print(i, subj, cn, sdf.cid.count())
    """
    try:
        r=s.post('http://localhost:3000/api/courses/save',data=course_json)
        cid=r.json()['_id']
    except RequestException as e:
        print('ERROR!',e)
        break
    """
    #cid='5d42ac880ae1f0350854135c'
    txt=ls(link,'{}-{}'.format(subj,cn))
    txt=txt.replace('<sup>','').replace('</sup>','').replace('<sub>','').replace('</sub>','')
    mm=re.findall(r'<a href="([^"]+)" id="ember\d+" class="link ember-view">([^<]+)</a>',txt)
    c=0
    for m in mm:
        c+=1
        lesson={}
        lesson['course'] = row.cid
        lesson['name'] = m[1] 
        lesson['nmb'] = c
        lesson['link'] = f'https://interneturok.ru{m[0]}' 
        lesson_json = json.dumps(lesson)
        print(lesson_json)
        try:
            r=s.post('http://localhost:3000/api/lessons/save',data=lesson_json)
            print(r.text)
        except RequestException as e:
            print('ERROR!',e)
            break
        #break
    #break

"""
sdf = pd.read_csv('subjects.csv')
ldf = pd.read_csv('lessons3.csv',sep=';')
#ldf.append(pd.read_csv('lessons3.csv',sep=';'), ignore_index=True)
ldf=pd.merge(ldf,sdf,on='subject')
cdf=ldf.drop_duplicates(subset=['subject','classn'])
for i, row in cdf.iterrows():
    df=ldf.loc[(ldf.subject==row.subject) & (ldf.classn==row.classn) ]
    course={}
    course['subjects'] = [row.subject]
    course['books'] = []    
    course['name'] = f'RESH: {row.subname} {row.classn} класс.' 
    course['sname'] = f'RESH: {row.subname}-{row.classn}'
    course['link'] = ''
    course['lessonsn'] = str(df._id.count())
    course['description'] =  f'RESH: {row.subname} {row.classn} класс.' 
    course_json = json.dumps(course)
    print(i, row.subname, row.name, row.classn, df._id.count(),course_json)
    
    s = requests.Session()
    s.headers=headers
    
    try:
        r=s.post('http://localhost:3000/api/courses/save',data=course_json)
        cid=r.json()['id']
    except RequestException as e:
        print('ERROR!',e)
        break
    
    for j, l in df.iterrows():
        lesson={}
        lesson['course'] = cid
        lesson['name'] = l['name'] 
        lesson['nmb'] = str(l.nmb)
        lesson['link'] = f'https://resh.edu.ru/Lesson/lesson/{l.reshid}' 
        lesson_json = json.dumps(lesson)
        print(lesson_json)
        try:
            r=s.post('http://localhost:3000/api/lessons/save',data=lesson_json)
            print(r.text)
        except RequestException as e:
            print('ERROR!',e)
            break
        #break
    #break
    
"""

    
    