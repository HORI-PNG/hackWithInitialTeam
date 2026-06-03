from base import VenueConfig
from MarineMesseScraper import MarineMesseScraper

VENUE_REGISTRY = {
    'マリンメッセ福岡': (MarineMesseScraper, 
                 VenueConfig(
                     name='マリンメッセ福岡',
                     url='https://www.marinemesse.or.jp/messe/event/',
                     click_times=3
                     )
                 )
}

# 想定外の入力からシステムを守るための関所
# raise（意図的にエラーを発生させる命令）
def get_scraper(venue_name: str):
    if venue_name not in VENUE_REGISTRY:
        raise ValueError(f"{venue_name}は登録されていません")
    
    scraper_class, config = VENUE_REGISTRY[venue_name]
    return scraper_class(config)