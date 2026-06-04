"use strict";
// ==========================================
//  画面の要素（HTMLの部品）を一括で取得
// ==========================================
// ユーザー登録用の部品
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signupBtn = document.getElementById("signupBtn");
const togglePasswordBtn = document.getElementById("togglePassword");
const eyeIcon = document.getElementById("eyeIcon");
//  ログイン用の部品
const loginEmailInput = document.getElementById("loginEmail");
const loginPasswordInput = document.getElementById("loginPassword");
const loginBtn = document.getElementById("loginBtn");
const toggleLoginPasswordBtn = document.getElementById("toggleLoginPassword");
const loginEyeIcon = document.getElementById("loginEyeIcon");
// ==========================================
// ユーザー登録ボタンを押したときの処理
// ==========================================
signupBtn.addEventListener("click", async () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    if (!email || password.length < 8) {
        alert("メールアドレスを入力し、パスワードは8文字以上にしてください。");
        return;
    }
    try {
        const response = await fetch("http://localhost:3000/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        alert("サーバーからの返答: " + data.message);
    }
    catch (error) {
        console.error("通信エラー:", error);
        alert("サーバーに接続できませんでした。");
    }
});
// ==========================================
// ログインボタンを押したときの処理
// ==========================================
loginBtn.addEventListener("click", async () => {
    const email = loginEmailInput.value;
    const password = loginPasswordInput.value;
    if (!email || !password) {
        alert("メールアドレスとパスワードを入力してください。");
        return;
    }
    try {
        const response = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        alert("サーバーからの返答: " + data.message);
    }
    catch (error) {
        console.error("通信エラー:", error);
        alert("サーバーに接続できませんでした。");
    }
});
// ==========================================
// パスワード表示/非表示の切り替え処理
// ==========================================
// 登録用パスワードの切り替え
togglePasswordBtn.addEventListener("click", () => {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.className = "fa-solid fa-eye-slash";
    }
    else {
        passwordInput.type = "password";
        eyeIcon.className = "fa-solid fa-eye";
    }
});
// ログイン用パスワードの切り替え
toggleLoginPasswordBtn.addEventListener("click", () => {
    if (loginPasswordInput.type === "password") {
        loginPasswordInput.type = "text";
        loginEyeIcon.className = "fa-solid fa-eye-slash";
    }
    else {
        loginPasswordInput.type = "password";
        loginEyeIcon.className = "fa-solid fa-eye";
    }
});
