#!/usr/bin/env python3.8

from http.server import BaseHTTPRequestHandler, HTTPServer
import json
# Библиотеки необходимы для парсирования параметров запроса
import urllib.parse as urlparse
from urllib.parse import parse_qs

import os

# Каталог размещения файлов на диске

# PDIR= "/home/client/work/jdk"
# PDIR= "/var/services/homes/igor/VIDEOCOURSES"
# HOST='192.168.113.250'
HOST='localhost'
PORT=8001

# Основной обработчик http запросов
class MyHandler(BaseHTTPRequestHandler):
    pass
    # Возврат клиенту списка файлов с директориями
    def do_GET(self):
        parsed = urlparse.urlparse(self.path)
        PDIR = urlparse.parse_qs(parsed.query)['path'][0]
        try:
            print('---file==', PDIR)
            with open(PDIR,'rb') as f:
                self.send_response(200)
                self.send_header('Content-type', 'application/octet-stream')
                self.send_header('Content-Disposition:', 'attachment; filename="' + os.path.basename(PDIR) + '"')
                fs = os.fstat(f.fileno())
                self.send_header("Content-Length", str(fs.st_size))
                self.end_headers()
                self.wfile.write(f.read())
        except Exception as e:
            self.send_response(500)
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
