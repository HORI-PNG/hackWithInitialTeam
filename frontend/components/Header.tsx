"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  // 画面が読み込まれたときに、ログインしているかどうかをチェックする
  useEffect(() => {
    // ログイン状態を確認してStateを更新する関数
    const syncLoginState = () => {
      const user = localStorage.getItem("isLoggedIn");
      setIsLoggedIn(user === "true");
    };

    // 1. 初回表示時に実行
    syncLoginState();

    // 2. 外部システムの変更を購読（エラー文の推奨に沿った対応）
    // これにより、別のタブでログイン・ログアウトした際も自動でヘッダーが切り替わります
    window.addEventListener("storage", syncLoginState);

    // クリーンアップ関数（コンポーネントが破棄されるときに監視を解除）
    return () => {
      window.removeEventListener("storage", syncLoginState);
    };
  }, []);

  // ログアウト処理
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    alert("ログアウトしました。");
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/20 bg-white/10 px-6 py-4 backdrop-blur-md text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold tracking-wider hover:opacity-80 transition-opacity"
        >
          場所でライブチェッカー
        </Link>

        <div className="flex items-center gap-4">
          {/* ログイン状態によってボタンを切り替える */}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 rounded-full border border-red-400/40 bg-red-500/10 px-4 py-1.5 text-sm font-medium text-red-200 transition-colors hover:bg-red-500/20"
            >
              <LogOut size={14} />
              ログout
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-full border border-white/40 bg-white/10 px-4 py-1.5 text-sm font-medium transition-colors hover:bg-white/20"
            >
              ログイン
            </Link>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 transition-colors hover:bg-white/20 focus:outline-none"
            aria-label="メニューを開閉"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ドロップダウンメニュー */}
      {isOpen && (
        <div className="absolute left-0 top-full w-full border-b border-white/20 bg-[#7d99a6]/95 p-6 backdrop-blur-lg md:p-8 animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="mx-auto max-w-6xl flex flex-col gap-6">
            <nav className="flex flex-col gap-4 text-lg font-semibold">
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="pb-2 border-b border-white/10 hover:pl-2 transition-all"
              >
                アーティスト登録
              </Link>
              <Link
                href="/search"
                onClick={() => setIsOpen(false)}
                className="pb-2 border-b border-white/10 hover:pl-2 transition-all"
              >
                ライブ情報検索
              </Link>
              <Link
                href="/results?filter=favorites"
                onClick={() => setIsOpen(false)}
                className="pb-2 border-b border-white/10 hover:pl-2 transition-all"
              >
                お気に入り
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
