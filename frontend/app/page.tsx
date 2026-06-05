// frontend/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 flex flex-col justify-center p-6 md:p-12">
      {/* キャッチコピーなどのエリア */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-white">
          簡単に、スマートに管理。
        </h1>
        <p className="text-white/80 max-w-md mx-auto">
          下のボックスを選択して、登録または検索・お気に入りの確認を行ってください。
        </p>
      </div>

      {/* 3つの透過ボックスリンク */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* ボックス1：アーティスト登録 */}
        <Link
          href="/register"
          className="group block overflow-hidden rounded-2xl border border-white/20 bg-transparent p-6 backdrop-blur-sm transition-colors duration-300 hover:bg-white/10 hover:border-white/40"
        >
          {/* ▼ アーティスト用の背景画像 ▼ */}
          <div
            className="relative mb-5 h-32 w-full overflow-hidden rounded-xl bg-black/10 bg-cover bg-center transition-all duration-500 group-hover:shadow-lg"
            style={{ backgroundImage: "url('/artist.png')" }}
          >
            <div className="absolute inset-0 bg-black/40 transition-colors duration-300 group-hover:bg-black/20" />
            <div className="relative flex h-full items-center justify-center transition-transform duration-500 group-hover:scale-110">
              <span className="text-4xl drop-shadow-md"></span>
            </div>
          </div>
          {/* ▲ ここまで ▲ */}

          <h2 className="mb-3 text-xl font-bold leading-tight text-white/90 transition-colors group-hover:text-white">
            アーティスト登録
          </h2>
          <p className="text-sm leading-relaxed text-white/70 transition-colors group-hover:text-white/90">
            出演アーティストやバンドのプロフィール等の情報を新規追加します。
          </p>
        </Link>

        {/* ボックス2：ライブ情報検索 */}
        <Link
          href="/search"
          className="group block overflow-hidden rounded-2xl border border-white/20 bg-transparent p-6 backdrop-blur-sm transition-colors duration-300 hover:bg-white/10 hover:border-white/40"
        >
          {/* ▼ スタジアム（ライブ会場）の背景画像 ▼ */}
          <div
            className="relative mb-5 h-32 w-full overflow-hidden rounded-xl bg-black/10 bg-cover bg-center transition-all duration-500 group-hover:shadow-lg"
            style={{ backgroundImage: "url('/stadium.png')" }}
          >
            <div className="absolute inset-0 bg-black/40 transition-colors duration-300 group-hover:bg-black/20" />
            <div className="relative flex h-full items-center justify-center transition-transform duration-500 group-hover:scale-110">
              <span className="text-4xl drop-shadow-md"></span>
            </div>
          </div>
          {/* ▲ ここまで ▲ */}

          <h2 className="mb-3 text-xl font-bold leading-tight text-white/90 transition-colors group-hover:text-white">
            ライブ情報検索
          </h2>
          <p className="text-sm leading-relaxed text-white/70 transition-colors group-hover:text-white/90">
            会場とアーティスト名から、開催予定のライブイベントを検索します。
          </p>
        </Link>

        {/* ボックス3：お気に入り（画像指定なし・アイコンのまま） */}
        <Link
          href="/results?filter=favorites"
          className="group block overflow-hidden rounded-2xl border border-white/20 bg-transparent p-6 backdrop-blur-sm transition-colors duration-300 hover:bg-white/10 hover:border-white/40"
        >
          <div className="mb-5 h-32 w-full rounded-xl bg-black/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-black/20">
            <span className="text-4xl transition-transform duration-500 group-hover:scale-110">
              ⭐
            </span>
          </div>
          <h2 className="mb-3 text-xl font-bold leading-tight text-white/90 transition-colors group-hover:text-white">
            お気に入り
          </h2>
          <p className="text-sm leading-relaxed text-white/70 transition-colors group-hover:text-white/90">
            チェックした会場やアーティストのリストを一覧で確認します。
          </p>
        </Link>
      </div>
    </main>
  );
}
