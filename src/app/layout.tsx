import "./globals.css";
import languageData from "./data/languagedata";
import ClientLayout from "./components/ClientLayout";
import Script from "next/script";

export const metadata = {
  title: "Tech Libraries - Programming Language Resources & Documentation Hub",
  description: "Discover comprehensive programming language libraries, frameworks, and documentation. Your one-stop resource for JavaScript, Python, Java, React, Node.js and more.",
  keywords: "programming languages, libraries, documentation, JavaScript, Python, Java, React, Node.js, frameworks, development resources",
  authors: [{ name: "Tech Libraries" }],
  creator: "Tech Libraries",
  publisher: "Tech Libraries",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.techlibrary.space",
    siteName: "Tech Libraries",
    title: "Tech Libraries - Programming Language Resources & Documentation Hub",
    description: "Discover comprehensive programming language libraries, frameworks, and documentation. Your one-stop resource for JavaScript, Python, Java, React, Node.js and more.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tech Libraries - Programming Resources",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tech Libraries - Programming Language Resources",
    description: "Discover comprehensive programming language libraries and documentation",
    images: ["/twitter-image.png"],
    creator: "@techlibraries",
  },
  alternates: {
    canonical: "https://www.techlibrary.space",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WXCLWC2D');
            `,
          }}
        />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7391347597198934"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "uqmlnqklbu");
            `,
          }}
        />
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Tech Libraries",
              description: "Comprehensive programming language libraries and documentation hub",
              url: "https://techlibrary.space",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://techlibrary.space/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className="bg-white">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WXCLWC2D"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <ClientLayout languageData={languageData}>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
