// frontend/app/api/artists/route.ts
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// 1. データを保存する機能（既存のもの）
export async function POST(request: Request) {
  try {
    const { name } = await request.json();

    if (!name) {
      return NextResponse.json(
        { error: "アーティスト名が入力されていません。" },
        { status: 400 },
      );
    }

    await sql`
      INSERT INTO artists (name)
      VALUES (${name})
    `;

    return NextResponse.json(
      { message: "登録に成功しました！" },
      { status: 200 },
    );
  } catch (error: unknown) {
    console.error("登録エラー:", error);
    if (error instanceof Error && error.message.includes("unique constraint")) {
      return NextResponse.json(
        { error: "このアーティストはすでに登録されています。" },
        { status: 400 },
      );
    }
    return NextResponse.json(
      { error: "データベースへの保存に失敗しました。" },
      { status: 500 },
    );
  }
}

// ★ここを追加！ 2. データベースからアーティスト一覧を読み出す機能（GET）
export async function GET() {
  try {
    // artistsテーブルから名前のあいうえお順（ASC）で全件取得する
    const { rows } = await sql`
      SELECT * FROM artists ORDER BY name ASC
    `;

    // 取得したデータをそのまま画面に返してあげる
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("アーティスト取得エラー:", error);
    return NextResponse.json(
      { error: "データベースからの取得に失敗しました。" },
      { status: 500 },
    );
  }
}
