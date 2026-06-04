"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // GraduationCap はフッターに移動するため削除

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/10 px-6 py-4 backdrop-blur-md text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold tracking-wider hover:opacity-80 transition-opacity"
        >
          場所でライブチェッカー
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="rounded-full border border-white/40 bg-white/10 px-4 py-1.5 text-sm font-medium transition-colors hover:bg-white/20"
          >
            ログイン
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 transition-colors hover:bg-white/20 focus:outline-none"
            aria-label="メニューを開閉"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="absolute left-0 top-full w-full border-b border-white/20 bg-[#7d99a6]/95 p-6 backdrop-blur-lg md:p-8 animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="mx-auto max-w-6xl flex flex-col gap-6">
            <nav className="flex flex-col gap-4 text-lg font-semibold">
              <Link
                href="/register?type=venue"
                onClick={() => setIsOpen(false)}
                className="pb-2 border-b border-white/10 hover:pl-2 transition-all"
              >
                ライブ会場登録
              </Link>
              <Link
                href="/register?type=artist"
                onClick={() => setIsOpen(false)}
                className="pb-2 border-b border-white/10 hover:pl-2 transition-all"
              >
                アーティスト登録
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
