// frontend/app/api/venues/route.ts
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// データを保存する機能（POST）
export async function POST(request: Request) {
  try {
    const { name, url } = await request.json();

    if (!name || !url) {
      return NextResponse.json(
        { error: "会場名とURLの両方を入力してください。" },
        { status: 400 },
      );
    }

    await sql`
      INSERT INTO venues (name, url)
      VALUES (${name}, ${url})
    `;

    return NextResponse.json(
      { message: "会場の登録に成功しました！" },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("会場登録エラー:", error);
    if (error instanceof Error && error.message.includes("unique constraint")) {
      return NextResponse.json(
        { error: "この会場はすでに登録されています。" },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: "データベースへの保存に失敗しました。" },
      { status: 500 },
    );
  }
}

// データ一覧を取得する機能（GET）
export async function GET() {
  try {
    const { rows } = await sql`
      SELECT * FROM venues ORDER BY name ASC
    `;
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("会場取得エラー:", error);
    return NextResponse.json(
      { error: "データベースからの取得に失敗しました。" },
      { status: 500 },
    );
  }
}
