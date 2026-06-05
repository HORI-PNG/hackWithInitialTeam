// frontend/app/api/signup/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { users } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const userExists = users.some((user) => user.email === email);
    if (userExists) {
      return NextResponse.json(
        { message: "このメールアドレスは既に登録されています。" },
        { status: 400 },
      );
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    users.push({ email, passwordHash: hashedPassword });

    console.log("--- 新しいユーザーが登録されました ---");
    console.log("メールアドレス:", email);
    console.log("暗号化されたパスワード（ハッシュ）:", hashedPassword);
    console.log("------------------------------------");

    return NextResponse.json(
      { message: "ユーザー登録が成功しました！" },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "サーバー内でエラーが発生しました。" },
      { status: 500 },
    );
  }
}
