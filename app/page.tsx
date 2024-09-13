import Link from "next/link";
import styles from "./page.module.scss";
import { montserrat } from '@/app/ui/fonts';


export default function Welcome() {
    return (
        <main>
            <div className={`${styles.welcome} ${montserrat.className}`}>
                Welcome to TopDog
                <Link className={styles.lets_go} href="/get-started">
                    <div className={styles.inner}>Let's Go!</div>
                </Link>
            </div>
        </main>
    )
}

