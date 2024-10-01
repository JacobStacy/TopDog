import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"

import "./globals.scss";



export const metadata: Metadata = {
    title: "Top Dog",
    description: "Who's the top dog?",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en">
            <Analytics />
            <body>
                <div className="supported">
                    {children}
                </div>
                <div className="not_supported">
                    This screen size is not supported.
                </div>
            </body>
        </html>
    );
}
