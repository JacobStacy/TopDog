import Link from "next/link"
import styles from "./plus-card.module.scss"
import ProfileCard from "./profile-card"


export default function PlusCard() {
    return (
        <Link href="/home/profile/add-dog">
           <ProfileCard className={styles.card}>＋</ProfileCard>
        </Link>
    )
}