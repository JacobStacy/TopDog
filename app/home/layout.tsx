import styles from "./layout.module.scss";
import { montserrat } from '@/app/ui/fonts';
import DogIcon from "@/public/dog-icon.svg";
import RankIcon from "@/public/rank-icon.svg"
import UserIcon from "@/public/user-icon.svg"
import { logout } from "@/app/actions";
import Link from "next/link";
import { SessionProvider } from "next-auth/react";


export default function HomeLayout( {
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <>
            <header className={`
                ${styles.home_header}
                ${montserrat.className}
            `}>
                <Link href="/">TopDog</Link>
                
            </header>
            <main className={styles.main}>
                <SessionProvider>
                    {children}
                </SessionProvider>
            </main>
            <footer className={styles.home_footer}>
                <nav>
                    <ul>
                        <li>
                            <Link href="/home">
                                <button aria-label="Home">
                                    <DogIcon className={styles.dog}/>
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/home/leaderboard">
                                <button aria-label="Leaderboard">
                                    <RankIcon className={styles.rank}/>
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link href="/home/profile">
                                <button aria-label="Your Profile" type="submit">
                                    <UserIcon className={styles.user}/>
                                </button>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </footer>
        </>
    )
}