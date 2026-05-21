import json
import google.genai as genai
from google.genai import types
import httpx


class JsonGetterByAPI:
    def getJson(self, filteredText, api):
        client = genai.Client(api_key=api)
        # 使用可能なAPIは、「check_models.py」を実行
        model = "gemini-2.5-flash"
        prompt = "渡したテキストデータの中から、アーティストのライブ情報を抽出してください。"
        text = "\n".join(filteredText)
        try:
            # プログラム（Python）側で正しいJSONとして読み込むためには、複数あるデータを配列[ ]で全体を囲む必要がある
            response_gemini = client.models.generate_content(
                model=model, 
                contents=[prompt, text],
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    # ここで出力してほしいスキーマを定義できます
                    response_schema={
                        "type": "ARRAY",
                        "items": {
                            "type": "OBJECT",
                            "properties": {
                                "date": {"type": "STRING"},
                                "artist": {"type": "STRING"},
                                "title": {"type": "STRING"}
                            }
                        }
                    }
                ),
            )
            return response_gemini.text
        except httpx.RequestError as e_req:
            print("エラー : ",e_req)
            return "[]"
        except genai.errors.ServerError as e_gemini:
            print("アクセスが集中しています。時間をおいてください", e_gemini)
            return "[]"
        except Exception as e:
            print("エラーが発生しました: ", e)
            return "[]"    
        
        
        
        
        
# https://qiita.com/automation2025/items/838c02b2583f556f8a72　参考になるサイト
# https://ai.google.dev/gemini-api/docs/migrate?hl=ja　最新版に変更
# https://qiita.com/d_kvn/items/5da7f5cdfc8200172a39　pythonのエラー処理