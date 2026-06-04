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
          下のボックスを選択して、登録またはお気に入りの確認を行ってください。
        </p>
      </div>

      {/* 3つの透過ボックスリンク */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* ボックス1：ライブ会場確認 */}
        <Link
          href="/register?type=venue"
          // 変更点: transform系のクラス（-translate-y-2など）や影を消し、色の変化だけを残す
          className="group block overflow-hidden rounded-2xl border border-white/20 bg-transparent p-6 backdrop-blur-sm transition-colors duration-300 hover:bg-white/10 hover:border-white/40"
        >
          <div className="mb-5 h-32 w-full rounded-xl bg-black/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-black/20">
            <span className="text-4xl">🏟️</span>
          </div>
          <h2 className="mb-3 text-xl font-bold leading-tight text-white/90 transition-colors group-hover:text-white">
            ライブ会場登録
          </h2>
          <p className="text-sm leading-relaxed text-white/70 transition-colors group-hover:text-white/90">
            新しいイベント会場やライブハウスの情報をシステムに登録します。キャパシティやアクセスの管理が可能です。
          </p>
        </Link>

        {/* ボックス2：アーティスト登録 */}
        <Link
          href="/register?type=artist"
          className="group block overflow-hidden rounded-2xl border border-white/20 bg-transparent p-6 backdrop-blur-sm transition-colors duration-300 hover:bg-white/10 hover:border-white/40"
        >
          <div className="mb-5 h-32 w-full rounded-xl bg-black/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-black/20">
            <span className="text-4xl">🎸</span>
          </div>
          <h2 className="mb-3 text-xl font-bold leading-tight text-white/90 transition-colors group-hover:text-white">
            アーティスト登録
          </h2>
          <p className="text-sm leading-relaxed text-white/70 transition-colors group-hover:text-white/90">
            出演アーティストやバンドのプロフィール、SNSリンク等の情報を新規追加・更新します。
          </p>
        </Link>

        {/* ボックス3：お気に入り */}
        <Link
          href="/results?filter=favorites"
          className="group block overflow-hidden rounded-2xl border border-white/20 bg-transparent p-6 backdrop-blur-sm transition-colors duration-300 hover:bg-white/10 hover:border-white/40"
        >
          <div className="mb-5 h-32 w-full rounded-xl bg-black/10 flex items-center justify-center transition-colors duration-300 group-hover:bg-black/20">
            <span className="text-4xl">⭐</span>
          </div>
          <h2 className="mb-3 text-xl font-bold leading-tight text-white/90 transition-colors group-hover:text-white">
            お気に入り
          </h2>
          <p className="text-sm leading-relaxed text-white/70 transition-colors group-hover:text-white/90">
            チェックした会場やアーティストのリストを一覧で確認します。検索画面のフィルタ結果へ移動します。
          </p>
        </Link>
      </div>
    </main>
  );
}
