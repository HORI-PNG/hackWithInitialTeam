// frontend/app/api/create-tables/route.ts
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // 1. usersテーブルの作成（ユーザー認証用）
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        passwordHash VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 2. artistsテーブルの作成（アーティスト登録用）
    await sql`
      CREATE TABLE IF NOT EXISTS artists (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        createdAt TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    return NextResponse.json(
      { message: "テーブルの作成に大成功しました！" },
      { status: 200 },
    );
  } catch (error) {
    console.error("テーブル作成エラー:", error);
    return NextResponse.json(
      { error: "テーブルの作成に失敗しました。エラーログを確認してください。" },
      { status: 500 },
    );
  }
}
