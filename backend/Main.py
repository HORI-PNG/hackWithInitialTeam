from MarineMesseScraper import MarineMesseScraper
from JsonGetterByAPI import JsonGetterByAPI
from DataFilter import DataFilter
from EnvGetter import EnvGetter

def main():
    env = EnvGetter()
    apiKey = env.apiGet()
    url = env.MarineMesseSet()
    keywords = ['緑黄色社会', 'Vaundy', 'ヨルシカ', 'YOASOBI', 'Ado']
    text = MarineMesseScraper().getFormattedData(url)
    filteredText = DataFilter().getWordInKeyword(text, keywords)
    dataList = JsonGetterByAPI().getJson(filteredText, apiKey)
       
    print(dataList)
        
if __name__ == "__main__":
    main()          
            
# Pythonにおける美しい設計
# mainの役割は、クラスを生み出し、順番に仕事を振っていくただの実行手順（スクリプト）である
# Mainという「状態を持たない、ただ処理をまとめただけのモノ」をわざわざ生み出す（クラスを作成する）のは、Pythonの世界では少し大げさ（冗長）だと考えられている
# https://www.octoparse.jp/blog/python-web-scraping　Webスクレイピングの参考サイト
# https://qiita.com/ai_engineering_note/items/3a07c06ceea32da916e2　renderdページ取得の参考サイト
# https://zenn.dev/nakakiiro/articles/python_dot_env　envの参考サイト