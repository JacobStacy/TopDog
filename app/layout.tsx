import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";
import "./globals.scss";

export const metadata: Metadata = {
    title: "Top Dog - Find the Best Dogs",
    description: "Discover the top dogs around and vote for your favorites. A social platform for dog lovers!",
    keywords: "dogs, top dogs, social media, dog lovers, dog ranking, vote dogs",
    authors: [{ name: "Jacob R. Stacy" }],
    openGraph: {
        title: "Top Dog - Who's the Top Dog?",
        description: "Vote for your favorite dogs and see who ranks at the top!",
        url: "https://top-dog-nine.vercel.app/android-chrome-512x512.png",
        type: "website",
        images: [
            {
                url: "https://top-dog-nine.vercel.app/android-chrome-512x512.png",
                width: 1200,
                height: 630,
                alt: "Top Dog Logo"
            }
        ]
    }
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Top Dog - Find the Best Dogs",
    "url": "https://top-dog-nine.vercel.app",
    "author": {
        "@type": "Person",
        "name": "Jacob R. Stacy"
    },
    "description": "Discover the top dogs around and vote for your favorites. A social platform for dog lovers."
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <Analytics />
            <body>
                <div className="supported">
                    <SessionProvider>
                        {children}
                    </SessionProvider>
                </div>
                <div className="not_supported">
                    This screen size is not supported.
                </div>
            </body>
        </html>
    );
}
