// frontend/app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

  // ① ユーザー登録ボタンを押したときの処理
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
        // 登録成功したらログイン欄に自動補完してパスワードをクリア
        setLoginEmail(signupEmail);
        setSignupEmail("");
        setSignupPassword("");
      }
    } catch (error) {
      console.error("通信エラー:", error);
      alert("サーバーに接続できませんでした。");
    }
  };

  // ② ログインボタンを押したときの処理
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
        // ログイン成功時にトップページ等へ遷移
        router.push("/");
      }
    } catch (error) {
      console.error("通信エラー:", error);
      alert("サーバーに接続できませんでした。");
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 flex flex-col justify-center p-6 md:p-12 text-white">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
          ユーザー認証
        </h1>
        <p className="text-white/80 max-w-md mx-auto">
          アカウントを作成するか、ログインしてシステムを利用してください。
        </p>
      </div>

      {/* 2カラムレイアウト（PCでは横並び、スマホでは縦並び） */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* ① アカウント作成ボックス */}
        <div className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.1)] flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold leading-tight mb-6 flex items-center gap-2 border-b border-white/10 pb-3">
              <UserPlus size={22} className="text-blue-300" />①
              新規アカウント作成
            </h2>

            <form onSubmit={handleSignup} className="space-y-5">
              <div>
                <label className="text-sm font-semibold text-white/80 block mb-2">
                  メールアドレス
                </label>
                <Input
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full bg-white/5 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-white/30 py-5"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-white/80 block mb-2">
                  パスワード（8文字以上）
                </label>
                <div className="relative">
                  <Input
                    type={showSignupPassword ? "text" : "password"}
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="パスワードを入力"
                    className="w-full bg-white/5 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-white/30 py-5 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  >
                    {showSignupPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full mt-4 py-6 font-bold bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-xl transition-all shadow-md active:scale-[0.99]"
              >
                アカウントを作成する
              </Button>
            </form>
          </div>
        </div>

        {/* ② ログインボックス */}
        <div className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.1)] flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold leading-tight mb-6 flex items-center gap-2 border-b border-white/10 pb-3">
              <LogIn size={22} className="text-emerald-300" />② ログイン
            </h2>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="text-sm font-semibold text-white/80 block mb-2">
                  メールアドレス
                </label>
                <Input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full bg-white/5 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-white/30 py-5"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-white/80 block mb-2">
                  パスワード
                </label>
                <div className="relative">
                  <Input
                    type={showLoginPassword ? "text" : "password"}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="パスワードを入力"
                    className="w-full bg-white/5 border-white/20 text-white placeholder:text-white/40 focus-visible:ring-white/30 py-5 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                  >
                    {showLoginPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full mt-4 py-6 font-bold bg-white/20 hover:bg-white/30 text-white border border-white/30 rounded-xl transition-all shadow-md active:scale-[0.99]"
              >
                ログインする
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
