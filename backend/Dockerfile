# ベースとなるPython環境
FROM python:3.10-slim

# Seleniumを動かすためのChromium（ブラウザ本体）とドライバをインストール
RUN apt-get update && apt-get install -y \
    chromium \
    chromium-driver \
    && rm -rf /var/lib/apt/lists/*

# 作業ディレクトリの設定
WORKDIR /app

# パッケージのインストール
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ソースコードをすべてコンテナにコピー
COPY . .

# Renderデプロイ時の起動コマンド
CMD ["uvicorn", "Main:app", "--host", "0.0.0.0", "--port", "10000"]