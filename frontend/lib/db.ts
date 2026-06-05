// frontend/lib/db.ts
type User = {
  email: string;
  passwordHash: string;
};

const globalForDb = globalThis as unknown as {
  users: User[] | undefined;
};

// サーバー起動中、メモリ内にユーザーデータを保持します
export const users = globalForDb.users ?? [];

if (process.env.NODE_ENV !== "production") {
  globalForDb.users = users;
}
