"use client"; // [cite: 583]

import { useState, useEffect } from "react"; // [cite: 584]
import { useRouter } from "next/navigation"; // [cite: 585]
import { SearchResponse, LiveEvent } from "@/lib/api"; // [cite: 586]

export default function ResultsPage() {
  const router = useRouter(); // [cite: 589]
  const [data, setData] = useState<SearchResponse | null>(null); // [cite: 590]

  useEffect(() => {
    const stored = sessionStorage.getItem("liveResults"); // [cite: 592]
    if (!stored) {
      // [cite: 593]
      router.push("/register"); // [cite: 598]
      return; // [cite: 599]
    }
    // 次の行のチェックを無効化して、警告を無視する
    // eslint-disable-next-line
    setData(JSON.parse(stored)); // [cite: 602, 603]
  }, [router]); // [cite: 604]

  if (!data)
    return <div className="p-6 text-gray-500">データを読み込み中...</div>; // [cite: 608]

  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">{data.venue}</h1>
          <p className="text-gray-500">
            {data.total}件のライブ情報が見つかりました
          </p>
        </div>
        <button
          onClick={() => router.push("/register")}
          className="px-4 py-2 border rounded-lg hover:bg-gray-50"
        >
          ← 検索に戻る
        </button>
      </div>

      {data.total === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p>該当するライブ情報が見つかりませんでした</p>
        </div>
      ) : (
        <table className="w-full border-collapse shadow-sm rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-700 text-white">
              <th className="p-3 text-left font-semibold">日付</th>
              <th className="p-3 text-left font-semibold">アーティスト</th>
              <th className="p-3 text-left font-semibold">タイトル</th>
            </tr>
          </thead>
          <tbody>
            {data.events.map((event: LiveEvent, index: number) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-blue-50"}
              >
                <td className="p-3 border-b border-gray-100">{event.date}</td>
                <td className="p-3 border-b border-gray-100 font-medium">
                  {event.artist}
                </td>
                <td className="p-3 border-b border-gray-100">{event.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  ); // [cite: 610, 612, 613, 615, 617, 618, 619, 627, 628, 629, 634, 636, 637, 638, 640, 643, 652, 653, 655, 657, 658, 659, 661, 663, 664]
}
