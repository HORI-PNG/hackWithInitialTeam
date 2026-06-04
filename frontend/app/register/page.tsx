"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchVenues, searchEvents } from "@/lib/api";

// shadcn/ui からボタンとインプットをインポート
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterPage() {
  const router = useRouter();
  const [venues, setVenues] = useState<string[]>([]);
  const [selectedVenue, setSelectedVenue] = useState<string | null>(null);
  const [artistInput, setArtistInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVenues()
      .then(setVenues)
      .catch(() => setError("会場リストの取得に失敗しました"));
  }, []);

  const handleSearch = async () => {
    if (!selectedVenue) {
      setError("会場を選択してください");
      return;
    }

    const keywords = artistInput
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k !== "");

    setLoading(true);
    setError(null);

    try {
      const result = await searchEvents(selectedVenue, keywords);
      sessionStorage.setItem("liveResults", JSON.stringify(result));
      router.push("/results");
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    // 背景のグラデーションを削除し、レイアウト用の余白だけを残す
    <div className="py-12 px-6 w-full flex-1 flex flex-col items-center">
      {/* 白背景を削除し、グラスモーフィズム（bg-white/10, backdrop-blur, border-white/20）を適用 */}
      <main className="w-full max-w-2xl p-8 rounded-2xl border border-white/20 bg-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.1)] backdrop-blur-md">
        <h1 className="text-3xl font-extrabold mb-8 tracking-tight text-white border-b border-white/20 pb-4">
          ライブ情報検索
        </h1>

        {/* 会場選択セクション */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-3">
            ① 会場を選択
          </h2>
          <div className="flex flex-wrap gap-2">
            {venues.map((venue) => {
              const isSelected = selectedVenue === venue;
              return (
                <Button
                  key={venue}
                  type="button"
                  variant={isSelected ? "default" : "outline"}
                  className={`rounded-full px-5 py-2 transition-all ${
                    isSelected
                      ? // 選択時のスタイル（少し濃い白＋少し浮く）
                        "bg-white/30 border-transparent text-white shadow-md scale-105 hover:bg-white/40"
                      : // 未選択時のスタイル（薄い枠線＋透過）
                        "bg-white/5 border-white/20 text-white hover:bg-white/15 hover:border-white/30"
                  }`}
                  onClick={() => setSelectedVenue(venue)}
                >
                  {venue}
                </Button>
              );
            })}
          </div>
        </section>

        {/* アーティスト入力セクション */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-3">
            ② アーティスト名 (カンマ区切り)
          </h2>
          <Input
            type="text"
            value={artistInput}
            onChange={(e) => setArtistInput(e.target.value)}
            placeholder="例: 緑黄色社会, Vaundy"
            // 入力欄も透過させる
            className="w-full text-base py-5 px-4 focus-visible:ring-2 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-white/30"
          />
        </section>

        {error && (
          <p className="text-sm text-red-200 mb-6 p-4 bg-red-900/40 border border-red-500/30 rounded-lg font-medium backdrop-blur-sm">
            {error}
          </p>
        )}

        {/* 検索ボタンの透過・統一感調整 */}
        <Button
          onClick={handleSearch}
          disabled={loading}
          size="lg"
          className="w-full py-6 text-base font-bold shadow-lg transition-all active:scale-[0.99] bg-white/20 text-white border border-white/30 hover:bg-white/30"
        >
          {loading ? "検索中..." : "検索する！"}
        </Button>
      </main>
    </div>
  );
}
