#!/usr/bin/env python3.8

from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import dataclasses
# Библиотеки необходимы для парсирования параметров запроса
import urllib.parse as urlparse
from urllib.parse import parse_qs

import os

# Каталог размещения файлов на диске
PDIR= "/work/coursesdoc"
HOST='127.0.0.1'
PORT= 8000

# Преобразование русских слов к английским
def latinizator(letter, dic):
    for i, j in dic.items():
        letter = letter.replace(i, j)
    return letter
legend = {
    'а':'a',
    'б':'b',
    'в':'v',
    'г':'g',
    'д':'d',
    'е':'e',
    'ё':'yo',
    'ж':'zh',
    'з':'z',
    'и':'i',
    'й':'y',
    'к':'k',
    'л':'l',
    'м':'m',
    'н':'n',
    'о': 'o',
    'п': 'p',
    'р': 'r',
    'с': 's',
    'т': 't',
    'у': 'u',
    'ф': 'f',
    'х': 'h',
    'ц': 'ts',
    'ч': 'ch',
    'ш': 'sh',
    'щ': 'shch',
    'ъ': 'y',
    'ы': 'y',
    'ь': "'",
    'э': 'e',
    'ю': 'yu',
    'я': 'ya',
    '-': ' ',
    'А': 'A',
    'Б': 'B',
    'В': 'V',
    'Г': 'G',
    'Д': 'D',
    'Е': 'E',
    'Ё': 'Yo',
    'Ж': 'Zh',
    'З': 'Z',
    'И': 'I',
    'Й': 'Y',
    'К': 'K',
    'Л': 'L',
    'М': 'M',
    'Н': 'N',
    'О': 'O',
    'П': 'P',
    'Р': 'R',
    'С':'S',
    'Т':'T',
    'У':'U',
    'Ф':'F',
    'Х':'H',
    'Ц':'Ts',
    'Ч':'Ch',
    'Ш':'Sh',
    'Щ':'Shch',
    'Ъ':'Y',
    'Ы':'Y',
    'Ь':"'",
    'Э':'E',
    'Ю':'Yu',
    'Я':'Ya',
    ' ':'-',
}



# Получить список файлов из дирректория со всеми подкаталогами
def list_files(startpath, f):
    for root, dirs, files in os.walk(startpath):
        # Собираем полный путь
        dir=root+os.sep
        # Это директория - добавляем в список с пометкой True
        f.append(File(os.path.basename(root),'',True))
        files=sorted(files)
        for file in files:
            # Добавляем в список файл с полным к нему путем
            f.append(File(file,dir +file, False))


@dataclasses.dataclass()
class Document:
    content:str

@dataclasses.dataclass()
class File:
    name:str
    path:str
    directory:bool


# Класс для десериализации описания файла в json
class FileEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, File):
            return obj.__dict__
        return json.JSONEncoder.default(self, obj)
# Класс для десериализации содержимого файла в json
class DocumentEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Document):
            return obj.__dict__
        return json.JSONEncoder.default(self, obj)

# Основной обработчик http запросов
class MyHandler(BaseHTTPRequestHandler):
    pass
    # Возврат клиенту списка файлов с директориями
    def do_GET(self):
        print(self.path[:8:], self.path)
        if self.path[:8:]=='/courses':
            self.send_response(200)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.end_headers()
            try:
                f=[]
                list_files(PDIR, f)
                jfile=json.dumps(f, cls=FileEncoder)
                self.wfile.write(bytes(jfile, 'utf-8'))
            except Exception as e:
                print(e)
                self.wfile.write(bytes(f'{e}', 'utf-8'))

            return
        # Возвращаем клиенту файл
        if self.path[:8:] == '/getfile':
            try:
                self.send_response(200)
                # Извлекаем полный путь к файлу - параметр = 'path', читаем файл и отправляем клиенту
                parsed = urlparse.urlparse(self.path)
                file=parse_qs(parsed.query)['path'][0]
                # Из полного пути, получаем имя файла
                newName=os.path.basename(file)
                # Преобразуем имя файла к латиннице
                newName=latinizator(newName,legend)
                # print('>>>>', newName)
                with open(file, 'rb') as f:
                    # Готовим заголовок ответа с именем файла и его размером
                    self.send_header('Content-type', 'application/octet-stream')
                    self.send_header("Content-Disposition",
                                     f'attachment; filename="{newName}"')
                    # Получаем размер файла и отправляем в заголовок
                    fs = os.fstat(f.fileno())
                    self.send_header("Content-Length", str(fs.st_size))
                    # Завершаем подготовку заголовка ответа
                    self.end_headers()
                    # Отправляем файл клиенту
                    self.wfile.write(f.read())
            except Exception as e:
                print(e)
                self.wfile.write(bytes(f'{e}', 'utf-8'))

            return



    # Метод возвращает клиенту файл в виде байтового потока
    # Что он будет с ним делать - не знаю!!!
    def do_POST(self):
        try:
            self.send_response(200)
            # self.send_header("Content-type", "application/octet-stream")
            # self.send_header("Content-type", "application/x-www-form-urlencoded")
            self.end_headers()
            content_length = int(self.headers['Content-Length'])  # <--- Получить размер переданных параметров
            post_data = self.rfile.read(content_length)  # <--- Получить собственно параметер
            # print("POST request",str(self.path), str(self.headers), post_data.decode('utf-8'))
            # Преобразуем параметры в словарь
            file=eval(post_data.decode('utf-8'))
            # Извлекаем полный путь доступа к файлу
            file=file['pathdoc']
            print(file)
            with open(str(file),'rb') as f:
                    # Готовим объект для передачи клиенту
                    doc=Document(str(f.read()))
                    jdoc=json.dumps(doc,cls=DocumentEncoder)
                    # print(jdoc)
                    self.wfile.write(bytes(jdoc,'utf-8'))

        except Exception as e:
            print("Error !!!--->>>",e)
            self.send_response(500)
            self.send_header("Content-type", "text/plain")
            self.end_headers()
            self.wfile.write(bytes("Файл не найден!".encode('utf-8')))

try:
    server = HTTPServer((HOST,PORT), MyHandler)
    print('Server ready!')
    server.serve_forever()
    print('------')
except Exception as e:
    print(e)
