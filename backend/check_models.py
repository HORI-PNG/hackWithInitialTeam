import google.generativeai as genai
from dotenv import load_dotenv
import os

class APIModelChecker:
    def check_models(self):
        # .envから読み込む
        load_dotenv()
        api_key = os.getenv("ApiKey")
        
        genai.configure(api_key=api_key)
        
        print("==現在使用可能なモデル一覧==")
        for m in genai.list_models():
            if 'generateContent' in m.supported_generation_methods:
                print(m.name)
                
# ファイルが直接呼ばれると、どんなファイル名であろうと、nameにはmainが入る
# 別のファイルからインポートされると、nameにはcheck_models（ファイル名）が入る
if __name__ == "__main__":
    APIModelChecker().check_modeles()
                
# https://zenn.dev/croco_82/articles/30a4112805c5dd　参考になるサイト