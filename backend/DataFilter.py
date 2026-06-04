class DataFilter:
    def getWordInKeyword(self, originText, keywords):
        filteredText = []
        for text in originText:
            for keyword in keywords:
                if keyword in text:
                    filteredText.append(text)
                    break
        return filteredText