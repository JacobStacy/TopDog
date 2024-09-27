"use client"
import styles from "./dog-card.module.scss";
import ProfileCard from "./profile-card";
import Image from "next/image";
import { Schema } from "mongoose";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
    editable,
}: {
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
    editable: boolean;
}) {

    const [signedImage, setSignedImage] = useState<string>(``)

    useEffect(() => {
        if (image && image != '/dog-icon.svg') {
            const updateImages = async () => {
                try {
                    const response = await fetch('/api/get-image', {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ unSignedUrl: image }),
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch signed URL');
                    }

                    const data = await response.json();
                    // console.log("data", data)
                    setSignedImage(data);
                } catch (error) {
                    console.error("Error fetching signed URL:", error);
                }
            };
            updateImages();
        } else {
            setSignedImage('/dog-icon.svg');
        }


    }, [image]);


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

    const addOrdinalSuffix = (rank:number) => {
        const lastDigit = rank % 10;
        const lastTwoDigits = rank % 100;
    
        if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
            return rank + "th";
        }
    
        if (lastDigit === 1) return rank + "st";
        if (lastDigit === 2) return rank + "nd";
        if (lastDigit === 3) return rank + "rd";
    
        return rank + "th";
    };


    return (
        <ProfileCard className={styles.card}>
            <div className={styles.image_holder}>
                <Image
                    src={signedImage}
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

                        <input id={`${id}`} type="checkbox" />
                        <div className={styles.likes}>♥ {likes}</div>
                        {editable ?
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
                            : null
                        }

                    </div>
                </div>
                <div className={styles.bottom_section}>
                    <div className={styles.rank}>
                        <span className={styles.info_label}> </span>
                        ✪ {addOrdinalSuffix(rank)}
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