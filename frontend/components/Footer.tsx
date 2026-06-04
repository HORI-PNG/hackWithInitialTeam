import { GraduationCap } from "lucide-react";

export default function Footer() {
  // リンクのURL
  const links = {
    github: "https://github.com",
    qiita: "https://qiita.com",
    lab: "https://example.com/lab",
  };

  return (
    <footer className="w-full border-t border-white/20 bg-white/5 py-6 px-6 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row text-sm text-white/80">
        {/* 左側：コピーライト */}
        <p>&copy; {new Date().getFullYear()} 場所でライブチェッカー</p>

        {/* 右側：外部リンク */}
        <div className="flex items-center gap-6 font-medium">
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors font-bold"
          >
            [GitHub]
          </a>
          <a
            href={links.qiita}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors font-bold"
          >
            Qiita
          </a>
          <a
            href={links.lab}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <GraduationCap size={16} /> 研究室紹介
          </a>
        </div>
      </div>
    </footer>
  );
}
