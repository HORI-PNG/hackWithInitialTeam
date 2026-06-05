// frontend/app/register/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ArtistRegisterPage() {
  const [artistName, setArtistName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleRegister = async () => {
    if (!artistName.trim()) {
      setMessage({ type: "error", text: "アーティスト名を入力してください" });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      // データベース通信
      const response = await fetch("/api/artists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: artistName }), // 入力された名前を送信
      });

      const data = await response.json();

      if (!response.ok) {
        // サーバーからエラーが返ってきた場合（重複など）
        throw new Error(data.error || "登録に失敗しました。");
      }

      // 成功した場合
      setMessage({
        type: "success",
        text: `${artistName} をデータベースに登録しました！`,
      });
      setArtistName(""); // フォームをクリア
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage({ type: "error", text: err.message });
      } else {
        setMessage({ type: "error", text: "不明なエラーが発生しました。" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 px-6 w-full flex-1 flex flex-col items-center">
      <main className="w-full max-w-xl p-8 rounded-2xl border border-white/20 bg-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.1)] backdrop-blur-md">
        <h1 className="text-3xl font-extrabold mb-8 tracking-tight text-white border-b border-white/20 pb-4">
          アーティスト登録
        </h1>

        <section className="mb-8">
          <h2 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-3">
            アーティスト名を追加
          </h2>
          <Input
            type="text"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
            placeholder="例: ヨルシカ, Ado"
            className="w-full text-base py-5 px-4 focus-visible:ring-2 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-white/30"
          />
          <p className="mt-3 text-xs text-white/60 leading-relaxed">
            ここで登録したアーティストは、検索時の候補やシステム全体のデータベースに追加されます。
          </p>
        </section>

        {message && (
          <p
            className={`text-sm mb-6 p-4 border rounded-lg font-medium backdrop-blur-sm ${
              message.type === "error"
                ? "text-red-200 bg-red-900/40 border-red-500/30"
                : "text-emerald-200 bg-emerald-900/40 border-emerald-500/30"
            }`}
          >
            {message.text}
          </p>
        )}

        <Button
          onClick={handleRegister}
          disabled={loading}
          size="lg"
          className="w-full py-6 text-base font-bold shadow-lg transition-all active:scale-[0.99] bg-white/20 text-white border border-white/30 hover:bg-white/30"
        >
          {loading ? "登録中..." : "登録する"}
        </Button>
      </main>
    </div>
  );
}
