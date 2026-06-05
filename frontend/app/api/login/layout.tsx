// frontend/app/login/layout.tsx
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // ここには Header や Footer を含めない
    // 背景色もここで統一します
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
      {children}
    </div>
  );
}
