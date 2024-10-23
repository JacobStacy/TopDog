import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";
import "./globals.scss";

export const metadata: Metadata = {
    title: "Top Dog - Discover and Vote for the Best Dogs Online | Dog Lovers Community",
    description: "Join Top Dog, the platform for dog lovers! Find, rank, and vote for popular dogs. Share your favorites and compete for top rankings!",
    keywords: "best dogs, vote for dogs, dog lovers social media, rank dogs, popular dogs, top dog platform, find top dogs, dog rankings, dog voting",
    authors: [{ name: "Jacob R. Stacy" }],
    openGraph: {
        title: "Top Dog - Who's the Best Dog? Cast Your Vote!",
        description: "Discover and vote for the most popular dogs! Join a vibrant community of dog lovers, support your favorite pups, and help them climb to the top of the leaderboard.",
        url: "https://top-dog-nine.vercel.app/",
        type: "website",
        images: [
            {
                url: "https://top-dog-nine.vercel.app/android-chrome-512x512.png",
                width: 1200,
                height: 630,
                alt: "Top Dog Logo - Vote for the Best Dogs"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        site: "@topdogapp",
        title: "Top Dog - Vote for the Best Dogs Online",
        description: "Join the ultimate dog voting platform where you can help rank the best dogs online. Vote for your favorites now!",
        images: [
            {
                url: "https://top-dog-nine.vercel.app/android-chrome-512x512.png",
                alt: "Top Dog Logo - Join the Dog Voting Fun!"
            }
        ]
    }
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Top Dog - Discover and Rank the Best Dogs",
    "url": "https://top-dog-nine.vercel.app",
    "author": {
        "@type": "Person",
        "name": "Jacob R. Stacy"
    },
    "description": "Join Top Dog, the platform for dog lovers! Find, rank, and vote for popular dogs. Share your favorites and compete for top rankings!",
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                <meta name="robots" content="index,follow" />
                <meta name="theme-color" content="#F2BEBB" />
                <meta name="author" content="Jacob R. Stacy" />
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
