# backend/DataFilter.py

class DataFilter:
    def getWordInKeyword(self, originText, keywords):
        # キーワードが見つかった場所の「前後何件」のデータを取得するか
        context_size = 5 
        
        # 取得するデータのインデックス（番号）を保存するセット（重複を防ぐため）
        filtered_indices = set()
        
        for i, text in enumerate(originText):
            for keyword in keywords:
                if keyword in text:
                    # キーワードが見つかったら、その前後 context_size 件のインデックスを記録する
                    start = max(0, i - context_size)
                    end = min(len(originText), i + context_size + 1)
                    
                    for j in range(start, end):
                        filtered_indices.add(j)
                    break # 1つのキーワードで見つかれば、他のキーワードはチェックしなくてOK
        
        # 記録したインデックス順に、元のテキストからデータを拾い直す
        filteredText = [originText[i] for i in sorted(list(filtered_indices))]
        
        return filteredText