import styles from "./dog-card.module.scss";
import ProfileCard from "./profile-card";
import Image from "next/image";
import { Schema } from "mongoose";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { DogType } from "@/model/dog-model";

export default function DogCard({
    id,
    name,
    age,
    breed,
    bio,
    likes,
    rank,
    image,
    currentDogs,
    setDogs,
} : {
    id: Schema.Types.ObjectId,
    name: string;
    age: number;
    breed: string;
    bio: string;
    likes: number;
    rank: number;
    image: string;
    currentDogs: DogType[];
    setDogs: Dispatch<SetStateAction<DogType[]>>;
}) {
    

    const handleDelete = async () => {
        const confirmed = confirm(`Are you sure you want to delete ${name}?`);

        if (confirmed) {
            try {
                const response = await fetch(`/api/delete-dog`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        dogId: id,
                    })
                });

                if (!response.ok) {
                    const errorData = await response.text();
                    throw new Error(errorData || "Failed to delete dog.");
                } 

                // Update dogs state 
                const filteredDogs = currentDogs.filter((dog: DogType) => dog._id !== id);
                setDogs(filteredDogs);

            } catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message || "Failed to delete dog.");
                }
            }
        }
    }


    return(
        <ProfileCard className={styles.card}>
            <div className={styles.image_holder}>
                <Image
                    src={image}
                    alt={`picture of ${name}`}
                    width={102}
                    height={136}
                />
            </div>
            <div className={styles.info}>
                <div className={styles.top_line}>
                    <div className={styles.name_age}>
                        {name}, <span>{age}</span>
                    </div>
                    
                    <div className={styles.likes_options}>

                        <input id={`${id}`} type="checkbox"/>
                        <div className={styles.likes}>♥ {likes}</div>
                        <div className={styles.options}>
                            <div className={styles.options_menu}>
                                <Link
                                    className={styles.option}
                                    href={`/home/profile/add-dog?dogId=${id.toString()}`}
                                >
                                    <div>
                                        Edit
                                    </div>
                                </Link>
                                <div 
                                    className={styles.option}
                                    onClick={handleDelete}
                                >
                                    Delete
                                </div>
                            </div>
                            <label htmlFor={`${id}`} aria-label="Toggle Options Menu">
                                <span>•••</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className={styles.bottom_section}>
                    <div className={styles.rank}>
                        <span className={styles.info_label}> </span>
                        ✪ {rank}nd
                    </div>
                    <div className={styles.desc}>
                        <span className={styles.info_label}>Bio: </span> 
                        {bio}
                    </div>
                    <div className={styles.breed}>
                        <span className={styles.info_label}>Breed: </span>
                        {breed}
                    </div>
                </div>
                
            </div>
        </ProfileCard>
    );
}