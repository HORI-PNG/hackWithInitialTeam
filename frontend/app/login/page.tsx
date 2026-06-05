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
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* 元の index.html の CSS を完全再現 */
        .login-wrapper {
          font-family: "Helvetica Neue", Arial, sans-serif;
          background-color: #f4f6f9;
          color: #333;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 20px;
          /* 親要素(layout.tsx)の背景色を上書きするための絶対配置 */
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 100;
        }
        .login-box {
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          padding: 30px;
          width: 100%;
          max-width: 400px;
          margin-bottom: 20px;
        }
        .login-box h2 {
          font-size: 1.4rem;
          margin-top: 0;
          margin-bottom: 20px;
          color: #2c3e50;
          border-bottom: 2px solid #eee;
          padding-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .form-group {
          margin-bottom: 15px;
          text-align: left;
        }
        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
          color: #555;
          font-size: 0.9rem;
        }
        .form-group input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
          font-size: 1rem;
          color: #333;
          background-color: #fff;
        }
        .form-group input:focus {
          outline: none;
          border-color: #007bff;
        }
        .password-wrapper {
          position: relative;
        }
        .toggle-btn {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #888;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .action-btn {
          width: 100%;
          padding: 12px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1.1rem;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s;
          margin-top: 10px;
        }
        .action-btn:hover {
          background-color: #0056b3;
        }
        .action-btn.login-color {
          background-color: #10b981;
        }
        .action-btn.login-color:hover {
          background-color: #059669;
        }
      `,
        }}
      />

      <div className="login-wrapper">
        {/* ホームに戻るボタン（元のUIにはありませんでしたが、画面遷移用に配置） */}
        <button
          onClick={() => router.push("/")}
          style={{
            marginBottom: "20px",
            color: "#007bff",
            background: "none",
            border: "none",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          ← ホームに戻る
        </button>

        {/* アカウント作成エリア */}
        <div className="login-box">
          <h2>
            <UserPlus size={24} color="#007bff" /> ① 新規アカウント作成
          </h2>
          <form onSubmit={handleSignup}>
            <div className="form-group">
              <label>メールアドレス</label>
              <input
                type="email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                placeholder="example@email.com"
                required
              />
            </div>
            <div className="form-group">
              <label>パスワード（8文字以上）</label>
              <div className="password-wrapper">
                <input
                  type={showSignupPassword ? "text" : "password"}
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="パスワードを入力"
                  required
                />
                <button
                  type="button"
                  className="toggle-btn"
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
            <button type="submit" className="action-btn">
              アカウントを作成する
            </button>
          </form>
        </div>

        {/* ログインエリア */}
        <div className="login-box">
          <h2>
            <LogIn size={24} color="#10b981" /> ② ログイン
          </h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>メールアドレス</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="example@email.com"
                required
              />
            </div>
            <div className="form-group">
              <label>パスワード</label>
              <div className="password-wrapper">
                <input
                  type={showLoginPassword ? "text" : "password"}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="パスワードを入力"
                  required
                />
                <button
                  type="button"
                  className="toggle-btn"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                >
                  {showLoginPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <button type="submit" className="action-btn login-color">
              ログインする
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
