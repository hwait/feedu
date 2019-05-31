import requests
from requests.exceptions import RequestException
import pandas as pd
import json

headers = {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Content-Type': 'application/json',
            'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:54.0) Gecko/20100101 Firefox/54.0',
            'Connection': 'keep-alive',
            'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjowLCJhY3RpdmUiOnRydWUsInVzZXJzIjpbXSwibmFtZSI6ItCU0LDRgNGM0Y8iLCJzdXJuYW1lIjoi0JrQsNGI0LDQstC60LjQvdCwIiwiZW1haWwiOiJkYXNoYTdkNUBnbWFpbC5jb20iLCJhdmF0YXIiOiIvL3d3dy5ncmF2YXRhci5jb20vYXZhdGFyL2I1Yzk0MWM1Yzc3ZmJlNzVhNTM2ZWZiZDYwZmIyODA2P3M9MjAwJnI9cGcmZD1tbSIsImRhdGUiOiIyMDE5LTAzLTEwVDA2OjI2OjU2LjI4MloiLCJfX3YiOjEsImlkIjoiNWM4NGFlMzAwNzhiY2QwMmZjYzAxODFmIiwiaWF0IjoxNTU5MzIzMjc3LCJleHAiOjE1NTkzMjY4Nzd9.EPwQrKqdl6VmaiL-A1016fgv-yZNofLUpW7pM9BOR0M'
            
        }

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