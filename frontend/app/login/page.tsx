// frontend/app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, UserPlus, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  // アカウント作成用の状態
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  // ログイン用の状態
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupEmail || signupPassword.length < 8) {
      alert("メールアドレスを入力し、パスワードは8文字以上にしてください。");
      return;
    }
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: signupEmail, password: signupPassword }),
      });
      const data = await response.json();
      alert("サーバーからの返答: " + data.message);
      if (response.ok) {
        setLoginEmail(signupEmail);
        setSignupEmail("");
        setSignupPassword("");
      }
    } catch (error) {
      console.error("通信エラー:", error);
      alert("サーバーに接続できませんでした。");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      alert("メールアドレスとパスワードを入力してください。");
      return;
    }
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await response.json();
      alert("サーバーからの返答: " + data.message);
      if (response.ok) {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "/"; // 強制リロードでヘッダーを更新
      }
    } catch (error) {
      console.error("通信エラー:", error);
      alert("サーバーに接続できませんでした。");
    }
  };

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 flex flex-col items-center justify-center p-6 md:p-12">
      {/* ホームに戻るボタン */}
      <button
        onClick={() => router.push("/")}
        className="mb-6 text-white/70 hover:text-white underline transition-colors"
      >
        ← ホームに戻る
      </button>

      <div className="w-full max-w-md space-y-6">
        {/* アカウント作成エリア */}
        <div className="p-8 rounded-2xl border border-white/10 bg-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.1)] backdrop-blur-md">
          <h2 className="flex items-center gap-2 text-xl font-bold text-white mb-6">
            <UserPlus size={24} className="text-blue-400" /> ①
            新規アカウント作成
          </h2>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">
                メールアドレス
              </label>
              <input
                type="email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30"
                placeholder="example@email.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">
                パスワード（8文字以上）
              </label>
              <div className="relative">
                <input
                  type={showSignupPassword ? "text" : "password"}
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30"
                  placeholder="パスワードを入力"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-white/50 hover:text-white"
                  onClick={() => setShowSignupPassword(!showSignupPassword)}
                >
                  {showSignupPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all"
            >
              アカウントを作成する
            </button>
          </form>
        </div>

        {/* ログインエリア */}
        <div className="p-8 rounded-2xl border border-white/10 bg-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.1)] backdrop-blur-md">
          <h2 className="flex items-center gap-2 text-xl font-bold text-white mb-6">
            <LogIn size={24} className="text-emerald-400" /> ② ログイン
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">
                メールアドレス
              </label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30"
                placeholder="example@email.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">
                パスワード
              </label>
              <div className="relative">
                <input
                  type={showLoginPassword ? "text" : "password"}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30"
                  placeholder="パスワードを入力"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-white/50 hover:text-white"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                >
                  {showLoginPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all"
            >
              ログインする
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
