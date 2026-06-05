import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sql } from "@vercel/postgres"; // これを追加

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 1. DBからメールアドレスでユーザーを検索
    const { rows } = await sql`SELECT * FROM users WHERE email = ${email}`;
    const user = rows[0];

    if (!user) {
      return NextResponse.json(
        { message: "メールアドレス、またはパスワードが正しくありません。" },
        { status: 400 },
      );
    }

    // 2. パスワードの照合
    // 💡注意: Postgresはカラム名を自動で小文字にする仕様があるため `passwordhash` と指定します
    const isMatch = await bcrypt.compare(password, user.passwordhash);

    if (!isMatch) {
      return NextResponse.json(
        { message: "メールアドレス、またはパスワードが正しくありません。" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "ログインに成功しました！" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { message: "サーバー内でエラーが発生しました。" },
      { status: 500 },
    );
  }
}
