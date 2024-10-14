import Link from "next/link"
import styles from "./plus-card.module.scss"
import ProfileCard from "../profile-card"



export default function PlusCard() {

    const handleClick = async () => {
        try {
            const response = await fetch('/api/create-dog', {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    name: " ",
                    age: " ",
                    bio: " ",
                    rank: 0,
                    likes: 0,
                    imageUrls: [],
                    completed: false
                })
            });
            if (!response.ok) {
                // console.log(response);
                throw new Error('Failed to create a blank dog entry');
            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Link 
            href='/home/profile/add-dog?getBlank=true'
            onClick={handleClick}
        >
            <ProfileCard className={styles.card}>＋</ProfileCard>
        </Link>
    )
}