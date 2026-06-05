from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
# 静的な型定位にするためのpydantic
from pydantic import BaseModel
from typing import List
import json
# .envファイルを読み込んでPythonで使えるようにするためのライブラリ
import os

from dotenv import load_dotenv
from __init__ import get_scraper, get_venue_names
from MarineMesseScraper import MarineMesseScraper
from JsonGetterByAPI import JsonGetterByAPI
from DataFilter import DataFilter

load_dotenv()
api_key = os.getenv("ApiKey")

app = FastAPI(title="場所でライブチェッカーAPI")

# フロントエンド（Next.js）が別のポート(3000)から通信できるようにCORSを設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:3000",
    "https://hack-with-initial-team.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=['*'],  # どの種類のHTTPリクエストも許可
    allow_headers=['*'],  # どの種類のHTTPヘッダーも許可
)       

# Pydanticモデル：通信データの型を定義（ここでList[str]などを活用）
class SearchRequest(BaseModel):
    venue: str
    keywords: List[str]

class LiveEvent(BaseModel):
    date: str
    artist: str
    title: str
    
class SearchResponse(BaseModel):
    venue: str
    events: List[LiveEvent]  # フロントへ返す構造化されたライブ情報の配列
    total: int
    
@app.get('/api/venues', response_model=List[str])
def get_venues():
    return get_venue_names()
    
# Next.jsから叩かれる、Web APIとしての窓口（エンドポイント）
@app.post('/api/search', response_model=SearchResponse)
def search(req: SearchRequest):
    if not api_key:
        raise HTTPException(status_code=500, detail="APIキーが設定されていません。")
        
    try:
        # 1. リクエストされた会場名から適切なスクレイパーを自動取得
        scraper = get_scraper(req.venue)
        
        # 2. スクレイピングを実行（内部でヘッドレスChromeが動く）
        raw_texts = scraper.getFormattedData()
        print("=== スクレイピング結果 ===", raw_texts)
        
        # 3. ユーザーが指定したキーワード（req.keywords）でフィルタリング
        filtered = DataFilter().getWordInKeyword(raw_texts, req.keywords)
        print("=== フィルタリング結果 ===", filtered)
        
        # 4. Gemini APIに投げて構造化JSONを取得
        json_str = JsonGetterByAPI().getJson(filtered, api_key)
        
        # 5. 文字列としてのJSONを、Pythonのオブジェクト（LiveEventのリスト）に変換
        events = [LiveEvent(**e) for e in json.loads(json_str)]
        
        # 6. フロントエンドへレスポンスを返却
        return SearchResponse(venue=req.venue, events=events, total=len(events))
        
    except ValueError as e_val:
        raise HTTPException(status_code=400, detail=str(e_val))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"サーバー内部エラー: {str(e)}")
    
if __name__ == "__main__":
    import uvicorn
    # Main:app は「Main.py の app という FastAPI インスタンス」という意味です
    uvicorn.run("Main:app", host="127.0.0.1", port=8000, reload=True)