# スクレイピングとは、Webページから特定の情報を自動的に取得数技術
# BeautifulSoupは、PythonでHTMLを解析し、特定の情報を簡単に取得できるライブラリ
from bs4 import BeautifulSoup

class DataFormatter:
    def fixHtmlData(self, text):
        # BeautifulSoupオブジェクトの作成
        soup = BeautifulSoup(text, "html.parser")
        # separatorは、<p>A</p> <p>B</>だった場合、ABとして出力されるのを防ぐもの
        htmlText = soup.get_text(separator="\n", strip=True)
        return htmlText
    
# Pythonには、gettextという、アプリを日本語や英語など多言語に翻訳するためのモジュールがある。Webで調べるときは注意
# https://aetheria.jp/19192/ 参考になるサイト