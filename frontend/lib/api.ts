// frontend/lib/api.ts

// Python（FastAPI）サーバーのアドレス
const BACKEND_URL = "https://hackwithinitialteam.onrender.com";

// 1. 会場リストを取得するAPI（GET）
export async function fetchVenues(): Promise<string[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/venues`);
    if (!res.ok) {
      throw new Error("会場リストの取得に失敗しました");
    }
    return await res.json();
  } catch (error) {
    console.error("fetchVenues エラー:", error);
    // サーバーが落ちている時のための保険（フォールバック）
    return ["Error Venue"];
  }
}

// 2. ライブ情報を検索するAPI（POST）
export async function searchEvents(venue: string, keywords: string[]) {
  const res = await fetch(`${BACKEND_URL}/api/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // Python側が要求している { venue: str, keywords: List[str] } の形に合わせて送信
    body: JSON.stringify({
      venue: venue,
      keywords: keywords,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    throw new Error(errorData?.detail || "検索中にエラーが発生しました");
  }

  // Pythonの SearchResponse モデル通りのデータが返ってくる
  return await res.json();
}
