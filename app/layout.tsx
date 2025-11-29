export const metadata = { title: "Daily Neural CN" };

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body className="bg-white text-black">{children}</body>
    </html>
  );
}
