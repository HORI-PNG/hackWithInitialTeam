import requests

# クラス名は名詞
# Webからデータを取ってくるファイル（DataFetcher）
class DataFetcher:
    # selfは必ず書かなければいけない
    def getHtml(self, url):
        response = requests.get(url)
        text = response.text
        # 今回はWebページからデータを取得するので、.text
        # APIの場合は.json()
        return text
        
# https://qiita.com/yukikoblog8376/items/bfdf6309a076c594abcd オブジェクト指向をPythonでするときの参考
