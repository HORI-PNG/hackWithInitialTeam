"use client";

import Lottie from "lottie-react";
// 配置したJSONファイルをインポートします
import loadingData from "./opener-loading.json";

export default function LoadingAnimation() {
  return (
    // アニメーションのサイズ調整（お好みで w-48 h-48 などを変えてください）
    <div className="w-32 h-32 md:w-48 md:h-48 opacity-90">
      <Lottie
        animationData={loadingData}
        loop={true} // ぐるぐるループさせる
        autoplay={true} // 自動再生
      />
    </div>
  );
}
