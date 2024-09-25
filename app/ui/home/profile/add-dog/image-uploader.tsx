"use client"
import { useRef } from "react";
import s from "./image-uploader.module.scss";
import Image from "next/image";
import { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { DogType } from "@/model/dog-model";


export default function ImageUploader() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [dogData, setDogData] = useState<DogType | null>(null);
    const [images, setImages] = useState<string[]>([])

    const params = useSearchParams();
    const getBlank = params.get("getBlank") === "true";
    const dogIdParam = params.get("dogId");

    useEffect(() => {
        const fetchDogData = async () => {
            try {
                if (getBlank) {
                    const response = await fetch("/api/get-dog?getBlank=true");
                    if (!response.ok) {
                        throw new Error("Failed to fetch dog");
                    }
                    const data = await response.json();
                    console.log("dog data", data)
                    setDogData(data);
                } else{
                    const response = await fetch(`/api/get-dog?dogId=${dogIdParam}`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch dog");
                    }
                    const data = await response.json();
                    console.log("dog data", data)
                    setDogData(data);
                    
                }
                
                
            } catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
            }
        };

        fetchDogData();
        
    }, [getBlank, dogIdParam]);

    useEffect(() => {
        const updateImages = async () => {
            console.log("updating images");
    
            const signedUrls: string[] = [];
    
            console.log(dogData?.imageUrls)
            if (dogData?.imageUrls) {
            
                for (const unSignedUrl of dogData.imageUrls) {
                    try {
                        const response = await fetch('/api/get-image', {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ unSignedUrl }),
                        });
    
                        if (!response.ok) {
                            throw new Error('Failed to fetch signed URL');
                        }
    
                        const data = await response.json();
                        console.log(data);
                        signedUrls.push(data);
                    } catch (error) {
                        console.error("Error fetching signed URL:", error);
                    }
                }
            }
    
    
            
            setImages(signedUrls);
            console.log(images)
            
        };
    
        updateImages();
    }, [dogData])


    
    const handleAddImage = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Trigger file input when add_image is clicked
        }
    }

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {

            const file = files[0];
            // console.log(file);
            // Create a FormData object to send the file and additional data
            const formData = new FormData();
            formData.append("dogId", dogData?._id.toString() || ""); // Add dogId
            formData.append("imageFile", file); // Add the file
            formData.append("fileName", file.name); // Add the file name if needed

            // Send the request to the server-side API endpoint
            try {
                const response = await fetch("/api/add-image", {
                    method: "PATCH",
                    body: formData,
                });

                
                if (!response.ok) {
                    throw new Error("Error with upload");
                }

                // Handle successful upload (e.g., update UI, display success message)
                console.log("Image uploaded successfully!");
            } catch (error) {
                console.error("Error uploading image:", error);
                // Handle upload errors (e.g., display error message)
            }
        }


    }

    return (
        <div className={s.image_uploader}>
            <div className={s.images}>
                {images.map((image: string, index: number) => (
                    <div
                        className={s.image_holder}
                        key={index}
                    >
                        <Image
                            className={s.image}
                            src={image}
                            alt={`image ${index}`}
                            width={204}
                            height={272}
                        />
                    </div>
                ))}
                <div
                    className={s.add_image}
                    onClick={handleAddImage}
                    aria-label="Click to add new image"
                >
                    ＋
                </div>
                <input
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    type="file"
                    name="images"
                    id="images"
                    accept=".jpg, .jpeg, .png, .bmp, .webp, .tiff"
                />
            </div>
        </div>
    )
}