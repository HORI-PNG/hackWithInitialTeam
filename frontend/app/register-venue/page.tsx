// frontend/app/register-venue/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterVenuePage() {
  const router = useRouter();
  const [venueName, setVenueName] = useState("");
  const [venueUrl, setVenueUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleRegister = async () => {
    if (!venueName.trim() || !venueUrl.trim()) {
      setMessage({
        type: "error",
        text: "会場名とURLの両方を入力してください",
      });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/venues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: venueName, url: venueUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "登録に失敗しました。");
      }

      setMessage({
        type: "success",
        text: `${venueName} をデータベースに登録しました！`,
      });
      setVenueName("");
      setVenueUrl("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage({ type: "error", text: err.message });
      } else {
        setMessage({ type: "error", text: "予期せぬエラーが発生しました。" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 px-6 w-full flex-1 flex flex-col items-center">
      <main className="w-full max-w-xl p-8 rounded-2xl border border-white/20 bg-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.1)] backdrop-blur-md">
        <h1 className="text-3xl font-extrabold mb-8 tracking-tight text-white border-b border-white/20 pb-4">
          ライブ会場登録
        </h1>

        <div className="space-y-6">
          {/* ① 会場名入力 */}
          <div>
            <label className="text-sm font-semibold text-white/80 block mb-2">
              会場名
            </label>
            <Input
              type="text"
              value={venueName}
              onChange={(e) => setVenueName(e.target.value)}
              placeholder="例: マリンメッセ福岡 A館"
              className="w-full text-base py-5 px-4 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-white/30"
            />
          </div>

          {/* ② URL入力 */}
          <div>
            <label className="text-sm font-semibold text-white/80 block mb-2">
              公式サイトのURL
            </label>
            <Input
              type="url"
              value={venueUrl}
              onChange={(e) => setVenueUrl(e.target.value)}
              placeholder="例: https://www.marinemesse.or.jp/"
              className="w-full text-base py-5 px-4 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-white/30"
            />
          </div>

          {/* メッセージ表示エリア */}
          {message && (
            <p
              className={`text-sm mb-6 p-4 rounded-lg font-medium backdrop-blur-sm border ${
                message.type === "success"
                  ? "text-emerald-200 bg-emerald-900/40 border-emerald-500/30"
                  : "text-red-200 bg-red-900/40 border-red-500/30"
              }`}
            >
              {message.text}
            </p>
          )}

          <Button
            onClick={handleRegister}
            disabled={loading}
            size="lg"
            className="w-full py-6 text-base font-bold transition-all bg-white/20 text-white border border-white/30 hover:bg-white/30"
          >
            {loading ? "登録中..." : "会場を登録する"}
          </Button>

          <Button
            onClick={() => router.push("/")}
            variant="ghost"
            className="w-full mt-2 text-white/70 hover:text-white hover:bg-white/10"
          >
            ホームに戻る
          </Button>
        </div>
      </main>
    </div>
  );
}
