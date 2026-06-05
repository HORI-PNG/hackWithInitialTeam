// frontend/app/search/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { searchEvents } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// データベースから取得するアーティストの型定義
interface DBArtist {
  id: number;
  name: string;
  createdat: string;
}

export default function SearchPage() {
  const router = useRouter();
  const [venues, setVenues] = useState<string[]>(["マリンメッセ福岡"]); // 初期状態で選択済みにする
  const [selectedVenue, setSelectedVenue] = useState<string | null>(
    "マリンメッセ福岡",
  );

  // データベースから取得したアーティストを保存する状態
  const [registeredArtists, setRegisteredArtists] = useState<DBArtist[]>([]);

  const [artistInput, setArtistInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 画面が開いたときに会場リストと、DBからアーティストリストを取得する
  useEffect(() => {
    // データベースからアーティスト一覧を取得
    fetch("/api/artists")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => setRegisteredArtists(data))
      .catch(() => console.error("登録済みアーティストの取得に失敗しました"));
  }, []);

  // 登録済みアーティストのボタンを押したときの処理
  const handleSelectArtist = (name: string) => {
    if (artistInput.includes(name)) return; // すでに入っていれば何もしない

    if (artistInput.trim() === "") {
      setArtistInput(name);
    } else {
      setArtistInput(`${artistInput}, ${name}`); // カンマ区切りで追加
    }
  };

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
    <div className="py-12 px-6 w-full flex-1 flex flex-col items-center">
      <main className="w-full max-w-2xl p-8 rounded-2xl border border-white/20 bg-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.1)] backdrop-blur-md">
        <h1 className="text-3xl font-extrabold mb-8 tracking-tight text-white border-b border-white/20 pb-4">
          ライブ情報検索
        </h1>

        {/* ① 会場選択 */}
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
                      ? "bg-white/30 border-transparent text-white shadow-md scale-105 hover:bg-white/40"
                      : "bg-white/5 border-white/20 text-white hover:bg-white/15 hover:border-white/30"
                  }`}
                  onClick={() => setSelectedVenue(venue)}
                >
                  {venue}
                </Button>
              );
            })}
          </div>
        </section>

        {/* ② 登録済みアーティストから選ぶ */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-3">
            ② 登録済みアーティスト（クリックで入力欄に追加）
          </h2>
          <div className="flex flex-wrap gap-2">
            {registeredArtists.length === 0 ? (
              <p className="text-sm text-white/40 italic">
                登録されたアーティストはまだありません
              </p>
            ) : (
              registeredArtists.map((artist) => (
                <Button
                  key={artist.id}
                  type="button"
                  variant="outline"
                  className="rounded-lg px-4 py-1.5 text-xs bg-white/5 border-white/10 text-white/90 hover:bg-white/20 hover:border-white/30 transition-all"
                  onClick={() => handleSelectArtist(artist.name)}
                >
                  ＋ {artist.name}
                </Button>
              ))
            )}
          </div>
        </section>

        {/* ③ アーティスト名手入力 */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-3">
            ③ 選択中のアーティスト (直接入力・変更も可能)
          </h2>
          <Input
            type="text"
            value={artistInput}
            onChange={(e) => setArtistInput(e.target.value)}
            placeholder="例: 緑黄色社会, Vaundy"
            className="w-full text-base py-5 px-4 focus-visible:ring-2 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-white/30"
          />
        </section>

        {error && (
          <p className="text-sm text-red-200 mb-6 p-4 bg-red-900/40 border border-red-500/30 rounded-lg font-medium backdrop-blur-sm">
            {error}
          </p>
        )}

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
