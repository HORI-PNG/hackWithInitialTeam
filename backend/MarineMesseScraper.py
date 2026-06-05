# Seleniumは実際のブラウザを遠隔操作する自動化フレームワーク
# Byクラスは、要素を指定するため
# WebDriverWaitは、Seleniumを使用する場面において、asyncなどの複雑な処理やtimeなどの物足りない処理よりよい
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
# Optionsは、ブラウザのオプションを設定するためのクラスで、今回はヘッドレスモードで起動するために使用。ウィンドウサイズの変更などもできる
from selenium.webdriver.chrome.options import Options
from typing import List
import time

from base import VenueScraperBase

class MarineMesseScraper(VenueScraperBase):
    def getTextSelector(self) -> str:
        return '.text.sd.appear'
    
    # フロントエンドから複数のアーティスト名が来た時に、複数返せるようにリストで定義
    def getRawTexts(self) -> List[str]:
        options = Options()
        options.add_argument('--headless')  # 画面を表示させない
        options.add_argument('--no-sandbox')  # セキュリティ機能を無効化するオプション。デプロイ側で使うことが多いらしい
        options.add_argument('--disable-dev-shm-usage')  # 共有メモリを無効化するオプション。これもデプロイ側で使うことが多いらしい
        
        driver = webdriver.Chrome(options=options)
        originText = []
        
        try:
            # self.config.url からURLを自動取得
            driver.get(self.config.url)
            
            # クリックする回数を指定する
            for i in range(self.config.click_times):
                # ボタンが画面に現れ、かつクリック可能になるまで安全に待つ
                button = WebDriverWait(driver, 10).until(
                    EC.element_to_be_clickable((By.CSS_SELECTOR, '.button.sd.appear'))
                    )
                # 第２引数を基準に中央にスクロール
                driver.execute_script("arguments[0].scrollIntoView({block:'center'});", button)
                button.click()
                # ここに待機時間がなければクリックされたUIが表示される前にまたfor文に入る
                time.sleep(5)

            searchBox = WebDriverWait(driver, 10).until(
                EC.presence_of_all_elements_located((By.CSS_SELECTOR, '.text.sd.appear'))
                )
            for text in searchBox:
                originText.append(text.get_attribute('innerText'))
                
            return originText
        finally:
            driver.quit()



# https://af-e.net/python-selenium-click-wait/#rtoc-2　参考になるサイト
# https://ai-kenkyujo.com/programming/language/python/selenium/
# https://www.octoparse.jp/blog/python-web-scraping
# https://aetheria.jp/23353/#get-attribute-textcontent-%E3%81%AB%E3%82%88%E3%82%8B%E8%A9%B3%E7%B4%B0%E3%81%AA%E3%83%86%E3%82%AD%E3%82%B9%E3%83%88%E5%8F%96%E5%BE%97
# https://office54.net/python/scraping/selenium-get-attribute　get_attributeの参考サイト
# https://af-e.net/python-selenium-button-click/#rtoc-1　ボタン操作の参考

# https://inlady-log.com/selenium-click-not-working-simple/#index_id4　画面を中央に寄せないと、ヘッダーのボタンと重なって押せない

