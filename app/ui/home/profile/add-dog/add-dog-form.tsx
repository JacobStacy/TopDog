'use client'
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import s from "./add-dog-form.module.scss"
import { montserrat } from '@/app/ui/fonts';
import { useEffect, useState } from "react"
import { DogType } from "@/model/dog-model";
import { addDogSchema } from "@/utils/zod";



export default function AddDogForm() {
    // const [error, setError] = useState("")
    // const [selectedImages, setSelectedImages] = useState<UploadedImage[]>([]);
    const [dogData, setDogData] = useState<DogType | null>(null);

    const params = useSearchParams();
    const getBlank = params.get("getBlank") === "true";
    const dogIdParam = params.get("dogId");

    useEffect(() => {
        if (!dogData) {
            const fetchDogData = async () => {
                try {
                    let url = "/api/get-dog";
                    if (getBlank) {
                        url += "?getBlank=true";
                    } else if (dogIdParam) {
                        url += `?dogId=${dogIdParam}`;
                    } else {
                        return; // No need to fetch if neither parameter is set
                    }

                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error("Failed to fetch dog");
                    }
                    const data = await response.json();
                    console.log("dog data", data);
                    setDogData(data);
                } catch (error) {
                    if (error instanceof Error) {
                        setError(error.message);
                        throw error;
                    }
                }
            };

            fetchDogData();
        }
    }, [getBlank, dogIdParam, dogData]);

    const [error, setError] = useState("");
    const router = useRouter();

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("handling submit")
        try {
            const dogId = dogData?._id || null;
            if (!dogId) {
                throw new Error("Dog Id not found")
            }

            const formData = new FormData(event.currentTarget);

            const nameForm = formData.get('name');
            const ageForm = Number(formData.get('age')?.toString());
            const breedForm = formData.get('breed');
            const bioForm = formData.get('bio');
            

            
            try {
                console.log(formData)
                const {name, age, breed, bio} = await addDogSchema.parseAsync({
                    name: nameForm,
                    age: ageForm,
                    breed: breedForm,
                    bio: bioForm,
                })

                const response = await fetch(`/api/create-dog`, {
                    method: "PATCH", 
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        dogId,
                        name,
                        age,
                        breed,
                        bio,
                        imageUrls: [],
                        completed: true, 
                    })
                });

                if (response.ok) {
                    router.push("/home/profile");
                } else {
                    const errorData = await response.json();
                    setError(errorData.error || "Failed to update dog");
                    throw new Error(errorData.error);
                }

            } catch(e) {
                if (e instanceof Error) {
                    setError(e.message);
                } else {
                    throw new Error("Error in update submit handler");
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                throw new Error("Error in update submit handler");
            }
        }
    };



    return (
        <div className={`${s.add_dog} ${montserrat.className}`}>
            <div className={s.error_msg}>
                {error}
            </div>
            <form onSubmit={handleFormSubmit}>
                <div className={s.fields}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            defaultValue={dogData?.name || ""}
                        />
                    </div>
                    <div>
                        <label htmlFor="age">Age:</label>
                        <input
                            type="number"
                            name="age"
                            id="age"
                            defaultValue={dogData?.age}
                        />
                    </div>
                    <div>
                        <label htmlFor="bio">Bio:</label>
                        <input
                            type="text"
                            name="bio"
                            id="bio"
                            defaultValue={dogData?.bio || ""}
                        />
                    </div>
                    <div>
                        <label htmlFor="breed">Breed:</label>
                        <input
                            type="text"
                            name="breed"
                            id="breed"
                            defaultValue={dogData?.breed || ""}
                        />
                    </div>

                </div>
                <button type="submit">
                    Add Dog!
                </button>
            </form>
        </div>
    )
}