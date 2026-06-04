from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import List

@dataclass
class VenueConfig:
    # 会場の名前やURL、ボタンを押す回数などの設定を保持するデータクラス
    name: str
    url: str
    click_times: int

class VenueScraperBase(ABC):
    # すべての会場スクレイパーが従うべき抽象基底クラス
    
    def __init__(self, config: VenueConfig):
        self.config = config

    @abstractmethod
    def getTextSelector(self) -> str:
        # テキスト要素のCSSセレクターを返す（子クラスで必ず実装）
        pass

    @abstractmethod
    def getRawTexts(self) -> List[str]:
        # 実際にブラウザを動かして生のテキストリストを取得する（子クラスで必ず実装）
        pass

    def getFormattedData(self) -> List[str]:
        # 取得したテキストから前後の空白や空行を取り除く共通メソッド
        texts = self.getRawTexts()
        return [t.strip() for t in texts if t.strip()]