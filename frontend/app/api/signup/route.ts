import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 1. DBにすでに同じメールアドレスがないかチェック
    const { rows } = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (rows.length > 0) {
      return NextResponse.json(
        { message: "このメールアドレスは既に登録されています。" },
        { status: 400 },
      );
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 2. DBに新しいユーザーを保存
    await sql`
      INSERT INTO users (email, passwordHash)
      VALUES (${email}, ${hashedPassword})
    `;

    return NextResponse.json(
      { message: "ユーザー登録が成功しました！" },
      { status: 201 },
    );
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json(
      { message: "サーバー内でエラーが発生しました。" },
      { status: 500 },
    );
  }
}
