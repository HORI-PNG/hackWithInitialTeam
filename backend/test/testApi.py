import requests
import json

def test_search_api():
    url = "http://localhost:8000/api/search"
    
    # フロントエンド（Next.js）から送られてくる想定のデータ
    payload = {
        "venue": "マリンメッセ福岡",
        "keywords": ["緑黄色社会", "Vaundy", "ヨルシカ"]
    }
    
    headers = {
        "Content-Type": "application/json"
    }

    print(f"送信データ: {payload}")
    print("APIへリクエストを送信中...（スクレイピングとAI処理のため数秒〜十数秒かかります）\n")

    try:
        # POSTリクエストを送信
        response = requests.post(url, json=payload, headers=headers)
        
        # HTTPステータスコードをチェック
        response.raise_for_status()
        
        # 結果をJSONとして受け取り、綺麗に整形して出力
        result = response.json()
        print("=== テスト成功: APIレスポンス ===")
        print(json.dumps(result, indent=2, ensure_ascii=False))
        
    except requests.exceptions.RequestException as e:
        print("=== テスト失敗 ===")
        print(f"エラー詳細: {e}")
        if response is not None:
            print(f"サーバーからの返答: {response.text}")

if __name__ == "__main__":
    test_search_api()