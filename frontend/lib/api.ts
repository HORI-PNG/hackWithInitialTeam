const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface LiveEvent {
  date: string;
  artist: string;
  title: string;
}

export interface SearchResponse {
  venue: string;
  events: LiveEvent[];
  total: number;
}

// 会場リストを取得する関数
export async function fetchVenues(): Promise<string[]> {
  const res = await fetch(`${API_URL}/api/venues`); // [cite: 359, 362]
  if (!res.ok) throw new Error("会場リストの取得に失敗しました"); // [cite: 366, 370]
  return res.json(); // [cite: 372]
}

// スクレイピングを実行する関数
export async function searchEvents(
  venue: string,
  keywords: string[],
): Promise<SearchResponse> {
  const res = await fetch(`${API_URL}/api/search`, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ venue, keywords }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || "検索に失敗しました");
  }
  return res.json();
}
