import styles from "./layout.module.scss";
import { montserrat } from '@/app/ui/fonts';
import Logout from "@/app/ui/logout-form";


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
                <Logout/>
            </header>
            <main>
                {children}
            </main>
            <footer className={styles.home_footer}>

            </footer>
        </>
    )
}