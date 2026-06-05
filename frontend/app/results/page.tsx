// frontend/app/results/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

// Pythonから送られてくるデータの形を定義
interface LiveEvent {
  date: string;
  artist: string;
  title: string;
}

interface SearchResult {
  venue: string;
  events: LiveEvent[];
  total: number;
}

export default function ResultsPage() {
  const router = useRouter();
  const [results, setResults] = useState<SearchResult | null>(null);

  useEffect(() => {
    // 処理を一度関数の中に閉じ込めることで、Linter（チェッカー）の警告を回避します
    const loadData = () => {
      const data = sessionStorage.getItem("liveResults");
      if (data) {
        setResults(JSON.parse(data));
      } else {
        // データがない場合（URLを直接入力した時など）は検索画面に戻す
        router.push("/search");
      }
    };

    loadData(); // ここで関数を実行
  }, [router]);

  if (!results) {
    return (
      <div className="flex-1 flex justify-center items-center text-white text-xl">
        読み込み中...
      </div>
    );
  }

  return (
    <div className="py-12 px-6 w-full flex-1 flex flex-col items-center">
      <main className="w-full max-w-3xl p-8 rounded-2xl border border-white/20 bg-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.1)] backdrop-blur-md text-white">
        <h1 className="text-3xl font-extrabold mb-6 border-b border-white/20 pb-4">
          検索結果: {results.venue}
        </h1>

        <p className="text-white/80 mb-6 font-medium">
          {results.total} 件のライブが見つかりました！
        </p>

        {results.events.length === 0 ? (
          <p className="text-white/60 p-4 bg-white/5 rounded-lg text-center">
            該当するライブ情報はありませんでした。別のキーワードで試してみてください。
          </p>
        ) : (
          <ul className="space-y-4">
            {results.events.map((event, index) => (
              <li
                key={index}
                className="p-5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
              >
                <div className="text-sm text-emerald-300 font-semibold mb-1">
                  {event.date}
                </div>
                <div className="text-2xl font-bold my-1">{event.artist}</div>
                <div className="text-base text-white/80 mt-2">
                  {event.title}
                </div>
              </li>
            ))}
          </ul>
        )}

        <Button
          onClick={() => router.push("/search")}
          size="lg"
          className="mt-8 w-full py-6 text-base font-bold bg-white/20 hover:bg-white/30 text-white border border-white/30"
        >
          検索画面に戻る
        </Button>
      </main>
    </div>
  );
}
