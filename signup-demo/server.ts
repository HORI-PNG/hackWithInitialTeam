import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";

const app = express();
app.use(cors());
app.use(express.json());

// データベース代わりの配列（サーバーを再起動するとリセットされます）
const users: Array<{ email: string; passwordHash: string }> = [];

// ==========================================
// ① ユーザー登録の窓口（前回作成）
// ==========================================
app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;

  const userExists = users.some((user) => user.email === email);
  if (userExists) {
    return res
      .status(400)
      .json({ message: "このメールアドレスは既に登録されています。" });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    users.push({ email, passwordHash: hashedPassword });

    console.log("--- 新しいユーザーが登録されました ---");
    console.log("メールアドレス:", email);
    console.log("暗号化されたパスワード（ハッシュ）:", hashedPassword);
    console.log("------------------------------------");

    res.status(201).json({ message: "ユーザー登録が成功しました！" });
  } catch (error) {
    res.status(500).json({ message: "サーバー内でエラーが発生しました。" });
  }
});

// ==========================================
// ログインの窓口
// ==========================================
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  // 1. 登録されているユーザーの中から、メールアドレスが一致する人を探す
  const user = users.find((u) => u.email === email);

  // ユーザーが見つからない場合
  if (!user) {
    return res.status(400).json({
      message: "メールアドレス、またはパスワードが正しくありません。",
    });
  }

  try {
    // 2. 入力されたパスワードと、保存されている暗号化パスワードを比較する
    // (bcryptが自動で計算して一致するかチェックしてくれます)
    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      // パスワードが間違っている場合
      return res.status(400).json({
        message: "メールアドレス、またはパスワードが正しくありません。",
      });
    }

    // 3. 一致していればログイン成功！
    console.log(`[ログイン成功] ${email} がログインしました。`);
    res.json({ message: "ログインに成功しました！おめでとうございます！" });
  } catch (error) {
    console.error("ログイン処理エラー:", error);
    res.status(500).json({ message: "サーバー内でエラーが発生しました。" });
  }
});

app.listen(3000, () => {
  console.log("Backend server running on http://localhost:3000");
});
