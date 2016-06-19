# -*- coding: utf-8 -*-
import sys
import os
import os.path
import json
import unicodedata
import urllib.parse
import urllib.request
import shutil
import xml.etree.ElementTree as ET

def parse(line, prev):
    line = line.strip()

    if len(line) == 0:
        return prev, ""

    idx = line.find('•')
    if idx != -1:
        line = line[idx + 1:]

    if '-' in line:
        page = line.split('-')[-1]
        text = line[0:len(line) - len(page) - 1]
        return '\n'.join([prev, text]), page.strip()
    else:
        return '\n'.join([prev, line]), ""

def verifyPage(page, line):
    try:
        int(page)
    except ValueError as e:
        print(line)
        raise


def migrate(path, name):
    print('----%s----' % name)

    input_f = open(path, 'r', encoding='utf-8')

    quotes = []

    prev = ''
    for line in input_f.readlines():
        text, page = parse(line, prev)

        if len(page) > 0:
            verifyPage(page, line)

            pair = dict()
            pair['text'] = text.lstrip()
            pair['page'] = page
            quotes += [pair, ]
            prev = ''
        else:
            prev = text

    input_f.close()

    if len(prev):
        pair['text'] = prev
        pair['page'] = 0


    book = {
        'title': name,
        'quotes': quotes
    }

    return book


def createIndexFile(path, out_path):
    books = []
    for f in os.listdir(path):
        if (f[0] == '.'):
            continue

        with open(os.path.join(path, f), 'r') as file:
            data = json.load(file, encoding='utf-8')

        book = {
            'id': data['title'],
            'title': data['title'],
            'author': data['author'],
            'image': data['image']
        }
        books += [book, ]

    with open(out_path, 'w') as output_f:
        json.dump(books, output_f,
                  indent=4, sort_keys=False, ensure_ascii=False)


def queryBookInfo(title):
    print('query: %s' % title)
    naver_api = 'https://openapi.naver.com/v1/search/book.xml'
    values = {
        'query': title
    }
    headers = {
        'X-Naver-Client-Id': '46rTLtquVVqmStBVwabQ',
        'X-Naver-Client-Secret': 'XaILYlwwa_'
    }

    data = urllib.parse.urlencode(values)
    url = naver_api + '?' + data
    req = urllib.request.Request(url, None, headers)
    with urllib.request.urlopen(req) as response:
        the_page = response.read()
        print(the_page.decode('utf-8'))

    root = ET.fromstring(the_page)
    channel = root.find('channel')
    books_found = channel.findall('item')
    if not books_found:
        print('query failed: ' + title)
        first_book = None
    else:
        first_book = books_found[0]


    keys = ['link', 'image', 'author', 'publisher']
    book_info = dict()
    for k in keys:
        if first_book:
            book_info[k] = first_book.find(k).text
        else:
            book_info[k] = ''

    return book_info


shutil.rmtree('out/')
os.mkdir('out/')


# read and migrate data
data_path = 'data/'
books = []
for f in os.listdir(data_path):
    if os.path.isfile(os.path.join(data_path, f)):
        f = unicodedata.normalize('NFC', f)
        books += [migrate(os.path.join(data_path, f), f), ]

# make json
for book in books:
    book_info = queryBookInfo(book['title'])
    book.update(book_info)
    with open('out/' + book['title'] + '.json', 'w') as file:
        json.dump(book, file, indent=4, sort_keys=False, ensure_ascii=False)

#
createIndexFile('out/', 'out/books.json')
