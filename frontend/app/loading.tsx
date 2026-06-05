import LoadingAnimation from "@/components/LoadingAnimation";

export default function Loading() {
  return (
    // フッターやヘッダーの間のメイン領域のド真ん中に配置します
    <div className="flex flex-1 flex-col items-center justify-center min-h-[60vh] gap-6">
      {/* ここにLottieのアニメーションが表示される */}
      <LoadingAnimation />

      <p className="text-white/80 font-medium tracking-widest animate-pulse">
        Now Loading...
      </p>
    </div>
  );
}
