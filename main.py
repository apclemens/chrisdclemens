#!/usr/bin/env python
# -*- coding: cp1252 -*

import requests as rs
import os, shutil
from bs4 import BeautifulSoup as soup
import urllib.request

def general_changes(html):
    NAV_HTML = """
    <div class="nav">
    <a href="/commissioned">Commissioned Work</a>
    <a href="/comics">Comics</a>
    <a href="/videos">Videos</a>
    <a href="/original">Original Articles</a>
    <a href="/drawings">Drawings</a>
    <a href="/about">About</a>
    </div>
    """
    return html.replace('[NAV]', NAV_HTML)


csv_url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT7eYIZH2_oqrFqg0bTbDhyQTr-VGY2dTG3crlgLXrsf-cDGANWK4rFGAjyWVBIQQyK-mkLVVJaqrnj/pubhtml'
res = rs.get(url = csv_url)
csv_soup = soup(res.content, 'html.parser')
tables = csv_soup.findAll('table')

try:
    shutil.rmtree('docs')
except:
    pass
os.mkdir('docs')
f = open('docs/CNAME', 'w')
f.write('chrisdclemens.com')
f.close()

shutil.copytree('images', 'docs/images')

f = open('style.css', 'r')
css = f.read()
f.close()
os.mkdir('docs/assets')
f = open('docs/assets/style.css', 'w')
f.write(css)
f.close()

f = open('index.html', 'r')
html = f.read()
f.close()
f = open('docs/index.html', 'w')
f.write(html)
f.close()

# comics
comics = tables.pop(0)
trs = comics.findAll('tr')
trs.pop(0)
trs.pop(0)
trs.pop(0)
comics_info = []
archive_html = '<ul class="comics-archive">'
for tr in trs:
    tds = tr.findAll('td')
    index = tds[0].text
    title = tds[1].text
    filename = tds[2].text
    single_panel = tds[3].text
    url = tds[4].text
    comics_info.append((title, filename, single_panel, url))
    archive_html += '<li><a href="/comics/'+url+'">'+title+'</a></li>'
archive_html += '</ul>'

random_code = """
<script>
document.getElementById('rand').onclick = function() {
urls = URLS;
randomComic = urls[Math.floor(Math.random()*urls.length)];
window.location.href = 'https://chrisdclemens.com/comics/'+randomComic;
}
</script>
""".replace('URLS', str([i[3] for i in comics_info]))

first = comics_info[0][3]
last = comics_info[-1][3]
os.mkdir('docs/comics')
for i in range(len(comics_info)):
    f = open('comic.html', 'r')
    html = f.read()
    f.close()
    html = html.replace('[TITLE]', comics_info[i][0]).replace('[FIRST]', first).replace('[LAST]', last)
    if i == 0:
        html = html.replace('[PREV]', comics_info[i][3])
    else:
        html = html.replace('[PREV]', comics_info[i-1][3])
    if i == len(comics_info)-1:
        html = html.replace('[NEXT]', comics_info[i][3])
    else:
        html = html.replace('[NEXT]', comics_info[i+1][3])
    image_html = '<img src="/images/'+comics_info[i][1]+'" class="comic sp-'+comics_info[i][2]+'">'
    html = html.replace('[IMAGE]', image_html).replace('[RANDOM]', random_code)
    html = general_changes(html)
    os.mkdir('docs/comics/'+comics_info[i][3])
    f = open('docs/comics/'+comics_info[i][3]+'/index.html', 'w')
    f.write(html)
    f.close()
f = open('docs/comics/index.html', 'w')
f.write(html)
f.close()
f = open('comic_archive.html', 'r')
html = f.read().replace('[ARCHIVE]', archive_html)
html = general_changes(html)
f.close()
os.mkdir('docs/comics/archive')
f = open('docs/comics/archive/index.html', 'w')
f.write(html)
f.close()

# videos
videos = tables.pop(0)
trs = videos.findAll('tr')
trs.pop(0)
trs.pop(0)
trs.pop(0)
videos_html = ''
os.mkdir('docs/videos')
for tr in trs:
    tds = tr.findAll('td')
    title = tds[0].text
    link = tds[1].text
    videos_html += '<h3>'+title+'</h3>'
    videos_html += '<iframe width="560" height="315" src="https://www.youtube.com/embed/'+link+'?si=byVUx4u1CtdudxN1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'
f = open('videos.html', 'r')
html = f.read()
html = html.replace('[VIDEOS]', videos_html)
html = general_changes(html)
f.close()
f = open('docs/videos/index.html', 'w')
f.write(html)
f.close()

# drawings
drawings = tables.pop(0)
trs = drawings.findAll('tr')
trs.pop(0)
trs.pop(0)
trs.pop(0)
drawings_html = ''
os.mkdir('docs/drawings')
for tr in trs:
    tds = tr.findAll('td')
    title = tds[0].text
    filename = tds[1].text
    drawings_html += """
<div class="image-box">
<img src="/images/FILENAME">
<!--<div class="caption">CAPTION</div>-->
</div>
    """.replace('FILENAME', filename).replace('CAPTION', title)
f = open('drawings.html', 'r')
html = f.read()
html = html.replace('[DRAWINGS]', drawings_html)
html = general_changes(html)
f.close()
f = open('docs/drawings/index.html', 'w')
f.write(html)
f.close()

# commissioned
commissioned = tables.pop(0)
trs = commissioned.findAll('tr')
trs.pop(0)
trs.pop(0)
commissioned_cards = ''
trs.pop(0)
i = 0
os.mkdir('docs/commissioned')
for tr in trs:
    tds = tr.findAll('td')
    title = tds[0].text
    thumbnail = tds[1].text
    url = tds[2].text
    layout = tds[3].text
    files = tds[4].text
    captions = tds[5].text
    text = tds[6].text

    f = open('project.html', 'r')
    html = f.read()
    f.close()
    html = html.replace('[TITLE]', title)
    html = html.replace('[TEXT]', text)
    files_text = ''
    files_array = files.split(',')
    captions_array = captions.split(';')
    for i in range(len(files_array)):
        files_text += '<figure><img src="/images/'+files_array[i]+'"></figure>'
        if captions:
            files_text += '<h3>'+captions_array[i]+'</h3>'
    html = html.replace('[FILES]', files_text)
    html = general_changes(html)
    os.mkdir('docs/commissioned/'+url)
    f = open('docs/commissioned/'+url+'/index.html', 'w')
    f.write(html)
    f.close()
    if i%2 == 0: parity = 'even'
    else: parity = 'odd'
    i += 1
    commissioned_cards += """
    <a class="commissioned-card PARITY" href="/commissioned/URL">
    <span>TITLE</span>
    <figure><img src="/images/THUMBNAIL"></figure>
    </a>
    """.replace('TITLE', title).replace('PARITY', parity).replace('THUMBNAIL', thumbnail).replace('URL', url)

f = open('commissioned.html', 'r')
html = f.read()
f.close()
html = html.replace('[COMMISSIONED]', commissioned_cards)
html = general_changes(html)
f = open('docs/commissioned/index.html', 'w')
f.write(html)
f.close()

# original
original = tables.pop(0)
trs = original.findAll('tr')
trs.pop(0)
trs.pop(0)
trs.pop(0)
os.mkdir('docs/original')
original_html = ''
for tr in trs:
    tds = tr.findAll('td')
    title = tds[0].text
    image = tds[1].text
    link = tds[2].text
    url = tds[3].text
    original_html += """
<a href="LINK">
<img src="/images/IMAGE">
<span>TITLE</span>
</a>
    """.replace('LINK', '/original/'+url).replace('IMAGE', image).replace('TITLE', title)

    fp = urllib.request.urlopen(link)
    mybytes = fp.read()
    mystr = mybytes.decode('utf8')
    fp.close()
    page_soup = soup(mybytes, 'html.parser')
    body = page_soup.find('div', attrs={'class': 'post-body'})
    f = open('original_article.html', 'r')
    html = f.read().replace('[TITLE]', title).replace('[ARTICLE]', str(body))
    replacements = [(u"’", "'"), (u'“','"'), (u'”', '"'), (u"‘", "'"), (u'\xa0',' ')]
    for r in replacements:
        html = html.replace(r[0], r[1])
    html = general_changes(html)
    f.close()
    os.mkdir('docs/original/'+url)
    f = open('docs/original/'+url+'/index.html', 'w')
    f.write(html)
    f.close()

f = open('original.html', 'r')
html = f.read()
html = general_changes(html)
f.close()
f = open('docs/original/index.html', 'w')
f.write(html.replace('[ORIGINAL]', original_html))
f.close()

# about
about = tables.pop(0)
tr = about.findAll('tr')[-1]
about_text = tr.findAll('td')[0].text
f = open('about.html', 'r')
html = f.read().replace('[ABOUT]', about_text)
html = general_changes(html)
f.close()
os.mkdir('docs/about')
f = open('docs/about/index.html', 'w')
f.write(html)
f.close()
