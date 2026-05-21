# .envファイルから環境変数を読み込み、pythonの実行環境に設定するため
#  load_dotenv()
# カレントあるいは親ディレクトリにある.envファイルを自動的に検索し、その内容が環境変数として設定されます。
from dotenv import load_dotenv
import os

class EnvGetter:
    def __init__(self):
        load_dotenv()
        self.apiKey = os.getenv("ApiKey")
        self.location = os.getenv("MarinMesse")
    
    def apiGet(self):    
        return self.apiKey
        
    
    def MarineMesseSet(self):
        return self.location