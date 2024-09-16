import styles from "./layout.module.scss";
import { montserrat } from '@/app/ui/fonts';
import Logout from "@/app/ui/logout-form";
import Image from "next/image";
import DogIcon from "@/public/dog-icon.svg";
import RankIcon from "@/public/rank-icon.svg"
import UserIcon from "@/public/user-icon.svg"
import { logout } from "@/app/actions";


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
                TopDog
            </header>
            <main className={styles.main}>
                {children}
            </main>
            <footer className={styles.home_footer}>
                <nav>
                    <ul>
                        <li>
                            <button aria-label="Home">
                                <DogIcon className={styles.dog}/>
                            </button>
                        </li>
                        <li>
                            <button aria-label="Leaderboard">
                                <RankIcon className={styles.rank}/>
                            </button>
                        </li>
                        <li>
                            <form action={logout}>
                                <button aria-label="Your Profile" type="submit">
                                    <UserIcon className={styles.user}/>
                                </button>
                            </form>
                        </li>
                    </ul>
                </nav>
            </footer>
        </>
    )
}