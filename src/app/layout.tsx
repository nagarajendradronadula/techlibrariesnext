import "./globals.css";
import languageData from "./data/languagedata";
import ClientLayout from "./components/ClientLayout";

export const metadata = {
  title: "Tech Libraries - Programming Language Resources",
  description: "Explore comprehensive programming language libraries and documentation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white">
        <ClientLayout languageData={languageData}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
