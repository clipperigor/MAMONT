#!/usr/bin/env python3.8

from http.server import BaseHTTPRequestHandler, HTTPServer
import json
# Библиотеки необходимы для парсирования параметров запроса
import urllib.parse as urlparse
from urllib.parse import parse_qs

import os

# Каталог размещения файлов на диске

# PDIR= "/home/client/work/jdk"
PDIR= "/var/services/homes/igor/VIDEOCOURSES"
HOST='192.168.113.250'
# HOST='localhost'
PORT=8000

# Получить список файлов из дирректория со всеми подкаталогами
def list_files_in_dir(startpath):
    # for root, dirs, files in os.walk(startpath):
    f=[]
    try:
        for root, dirs, files in os.walk(startpath):
            # Собираем полный путь
            dir = root + os.sep
            dirs=sorted(dirs, reverse=True)
            files=sorted(files)

            ffiles=[]
            for d in dirs:
                ffiles.append( dir+d )
            for file in files:
                # Добавляем в список файл с полным к нему путем
                # ffiles.append(File(file, dir + file, False))
                ffiles.append( dir + file)

                # print(dir+file)
            f.append([ dir[0:-1],ffiles])
        # print(f)
        # Коренъ
        f[0][0]='.'
        return f
    except Exception as e:
        print(e)

    return f

# Основной обработчик http запросов
class MyHandler(BaseHTTPRequestHandler):
    pass
    # Возврат клиенту списка файлов с директориями
    def do_GET(self):
        # print(self.path[:6:], self.path)
        # PDIR = "/home/client/work/wildfly"
        # if self.path[:6:]=='/video':
            self.send_response(200)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.end_headers()
            try:
                parsed = urlparse.urlparse(self.path)
                PDIR = urlparse.parse_qs(parsed.query)['dir'][0]
                print('---dir==', PDIR)
                f=list_files_in_dir(PDIR)
                jfile=json.dumps(f)
                self.wfile.write(bytes(jfile, 'utf-8'))
            except Exception as e:
                print("Error:",e)
                je = json.dumps(str(e))
                self.wfile.write(bytes(je, 'utf-8'))
            return

try:
    server = HTTPServer((HOST, PORT), MyHandler)
    print('Server ready!')
    server.serve_forever()
    print('------')
except Exception as e:
    print(e)
