"use client"; // [cite: 464]

import { useState, useEffect } from "react"; // [cite: 469]
import { useRouter } from "next/navigation"; // [cite: 469]
import { fetchVenues, searchEvents } from "@/lib/api"; // [cite: 470]

export default function RegisterPage() {
  const router = useRouter(); // [cite: 474]
  const [venues, setVenues] = useState<string[]>([]); // [cite: 476]
  const [selectedVenue, setSelectedVenue] = useState<string | null>(null); // [cite: 477]
  const [artistInput, setArtistInput] = useState(""); // [cite: 478]
  const [loading, setLoading] = useState(false); // [cite: 479]
  const [error, setError] = useState<string | null>(null); // [cite: 480]

  useEffect(() => {
    fetchVenues()
      .then(setVenues)
      .catch(() => setError("会場リストの取得に失敗しました"));
  }, []); // [cite: 481, 482, 484, 485]

  const handleSearch = async () => {
    // [cite: 486]
    if (!selectedVenue) {
      setError("会場を選択してください");
      return;
    } // [cite: 487, 488, 489]

    const keywords = artistInput
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k !== ""); // [cite: 492, 493, 495]

    setLoading(true);
    setError(null); // [cite: 496]

    try {
      const result = await searchEvents(selectedVenue, keywords); // [cite: 499]
      sessionStorage.setItem("liveResults", JSON.stringify(result)); // [cite: 502]
      router.push("/results"); // [cite: 506]
    } catch (err) {
      // [cite: 507]
      setError(err instanceof Error ? err.message : "エラーが発生しました"); // [cite: 508]
    } finally {
      // [cite: 509]
      setLoading(false); // [cite: 510]
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <main className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-4">
          ライブ情報検索
        </h1>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-3">① 会場を選択</h2>
          <div className="flex flex-wrap gap-2">
            {venues.map((venue) => (
              <button
                key={venue}
                onClick={() => setSelectedVenue(venue)}
                className={`px-4 py-2 rounded-full border-2 transition-colors ${
                  selectedVenue === venue
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                }`}
              >
                {venue}
              </button>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-3">
            ② アーティスト名 (カンマ区切り)
          </h2>
          <input
            type="text"
            value={artistInput}
            onChange={(e) => setArtistInput(e.target.value)}
            placeholder="例: 緑黄色社会, Vaundy"
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2"
          />
        </section>

        {error && (
          <p className="text-red-500 mb-4 p-3 bg-red-50 rounded">{error}</p>
        )}

        <button
          onClick={handleSearch}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "検索中..." : "検索する！"}
        </button>
      </main>
    </div>
  ); // [cite: 520, 522, 526, 527, 529, 532, 534, 535, 536, 537, 538, 539, 540, 547, 548, 549, 550, 553, 554, 555, 563, 565, 567, 570, 571, 572, 574]
}
