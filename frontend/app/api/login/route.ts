// frontend/app/api/login/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { users } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const user = users.find((u) => u.email === email);

    if (!user) {
      return NextResponse.json(
        { message: "メールアドレス、またはパスワードが正しくありません。" },
        { status: 400 },
      );
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

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
    return NextResponse.json(
      { message: "サーバー内でエラーが発生しました。" },
      { status: 500 },
    );
  }
}
