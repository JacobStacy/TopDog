"use client"
import s from "./page.module.scss"
import DogCard from "@/app/ui/home/dog-card"
import { useEffect, useState } from "react";
import { DogType } from "@/model/dog-model";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { montserrat } from "@/app/ui/fonts";


export default function Leaderboard(){


    const [dogs, setDogs] = useState<DogType[]>([]);
    const [error, setError] = useState<string | null>(null);

    

    useEffect(() => {
        const fetchDogs = async () => {
            try {
                const response = await fetch('/api/get-dogs?isLeaderboard=true');

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
            {error}
            <div className={`${s.header} ${montserrat.className}`}> This Weeks Top Dogs</div>
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
                            image={
                                dog.imageUrls?.length > 0 
                                ? dog.imageUrls[0] 
                                : '/dog-icon.svg'
                            }
                            // image={ '/dog-icon.svg' }
                            currentDogs={dogs}
                            setDogs={setDogs}
                            editable={false}
                        />
                    ))}
                </ul>
            ) : (
                <></>
            )}
        </div>
    )
}