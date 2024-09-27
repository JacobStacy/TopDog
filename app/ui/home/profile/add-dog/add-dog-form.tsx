'use client'
import { useSearchParams, useRouter } from "next/navigation";
import s from "./add-dog-form.module.scss";
import { montserrat } from '@/app/ui/fonts';
import { useEffect, useState } from "react";
import { DogType } from "@/model/dog-model";
import { addDogSchema } from "@/utils/zod";
import { ZodError } from "zod";

export default function AddDogForm() {
    const [error, setError] = useState<ZodError | null>(null);
    const [dogData, setDogData] = useState<DogType | null>(null);
    const [charCount, setCharCount] = useState<number>(0);
    const [text, setText] = useState<string>("");

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
                    setDogData(data);
                    setText(data.bio.trim());
                    setCharCount(data.bio.trim().length);
                } catch (error) {
                    if (error instanceof Error) {
                        setError(new ZodError([{ message: error.message, path: [], code: "custom" }]));
                    }
                }
            };

            fetchDogData();
        }
    }, [getBlank, dogIdParam, dogData]);

    const router = useRouter();

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const dogId = dogData?._id || null;
            if (!dogId) {
                throw new Error("Dog Id not found");
            }

            const formData = new FormData(event.currentTarget);

            const nameForm = formData.get('name');
            const ageForm = Number(formData.get('age')?.toString());
            const bioForm = formData.get('bio');

            try {
                const { name, age, bio } = await addDogSchema.parseAsync({
                    name: nameForm,
                    age: ageForm,
                    bio: bioForm,
                });

                const response = await fetch(`/api/create-dog`, {
                    method: "PATCH",
                    body: JSON.stringify({
                        dogId,
                        name,
                        age,
                        bio,
                        imageUrls: [],
                        completed: true,
                    }),
                });

                if (response.ok) {
                    router.push("/home/profile");
                } else {
                    const errorData = await response.json();
                    setError(new ZodError([{ message: errorData.error, path: [], code: "custom" }]));
                }

            } catch (e) {
                if (e instanceof ZodError) {
                    setError(e);
                } else if (e instanceof Error) {
                    setError(new ZodError([{ message: e.message, path: [], code: "custom" }]));
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                setError(new ZodError([{ message: error.message, path: [], code: "custom" }]));
            }
        }
    };

    return (
        <div className={`${s.add_dog} ${montserrat.className}`}>
            <form onSubmit={handleFormSubmit}>
                <div className={s.fields}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <div className={s.error_msg}>
                            {error?.issues?.find((issue) => issue.path.includes('name'))?.message}
                        </div>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            defaultValue={dogData?.name.trim() || ""}
                        />
                    </div>
                    <div>
                        <label htmlFor="age">Age</label>
                        <div className={s.error_msg}>
                            {error?.issues?.find((issue) => issue.path.includes('age'))?.message}
                        </div>
                        <input
                            type="number"
                            name="age"
                            id="age"
                            defaultValue={dogData?.age}
                        />
                    </div>
                    <div className={s.bio}>
                        <label htmlFor="bio">Bio</label>
                        <div className={s.error_msg}>
                            {error?.issues?.find((issue) => issue.path.includes('bio'))?.message}
                        </div>
                        <div className={s.bio_holder}>
                            <div className={`${s.charCount} ${charCount > 120 ? s.tooBig : null}`}>
                                ({charCount}/120)
                            </div>
                            <textarea
                                name="bio"
                                id="bio"
                                defaultValue={dogData?.bio.trim() || ""}
                                className={montserrat.className}
                                onChange={(e) => {
                                    setCharCount(e.target.value.length);
                                    setText(e.target.value);
                                }}
                            />
                            <div className={s.text_display}>{text}</div>
                        </div>
                    </div>
                </div>
                <button type="submit">Add Dog!</button>
            </form>
        </div>
    );
}
