"use client"
// import ProfileCard from "@/app/ui/home/profile/profile-card"
import PlusCard from "@/app/ui/home/profile/plus-card"
// import styles from "./page.module.scss"
import DogCard from "@/app/ui/home/profile/dog-card"
import { useEffect, useState } from "react";

export default function Profile() {
    const [dogs, setDogs] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDogs = async () => {
            try {
                const response = await fetch('/api/get-dogs');

                if (!response.ok) {
                    throw new Error("Failed to fetch dogs");
                }

                const data = await response.json();
                setDogs(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unexpected error occurred");
                }
            }
        };

        fetchDogs();
    }, []);

    return (
        <div>
            {dogs.length > 0 ? (
                <ul>
                    {dogs.map((dog, index) => (
                        <DogCard 
                            key={index}
                            id={dog._id}
                            name={dog.name} 
                            age={dog.age} 
                            breed={dog.breed} 
                            bio={dog.bio} 
                            likes={dog.likes} 
                            rank={dog.rank}
                            // image={
                            //     dog.imageUrls?.length > 0 
                            //     ? dog.imageUrls[0] 
                            //     : '/dog-icon.svg'
                            // }
                            image={ '/dog-icon.svg' }
                            currentDogs={dogs}
                            setDogs={setDogs}
                        />
                    ))}
                </ul>
            ) : (
                <></>
            )}
            <PlusCard />
        </div>
    )
}