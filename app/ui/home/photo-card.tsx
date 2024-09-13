"use client"
import styles from "./photo-card.module.scss"
import { montserrat } from '@/app/ui/fonts';
import Image from "next/image"
import { useState } from "react";
import {
    easeIn,
    motion,
    PanInfo,
    useMotionValue,
    useTransform,
} from "framer-motion"
import PhotoCardProps from "@/types";



export default function PhotoCard ({
    data,
    active,
    removeCard 
}: PhotoCardProps) {
    const [selectedImage, setSelectedImage] = useState(0); // State to track selected image index

    const nextImage = () => {
        if (selectedImage + 1 < imageUrls.length) {
            setSelectedImage(selectedImage + 1); // Update state to set selected image
        }
    };

    const prevImage = () => {
        if (selectedImage - 1 >= 0 )
        setSelectedImage(selectedImage - 1); // Update state to set selected image

    };

    // Assuming you have an array of image URLs
    const imageUrls = [
        '/bear_1.jpg',
        '/bear_3.jpg',
        '/samantha_1.jpg',
    ];

    return(
        <div className={styles.photo_card}>
            <Image
                key="index"
                className={`
                    ${styles.picture}
                `}
                src={imageUrls[selectedImage]}
                alt="The picture of the actual top dog, my childhood dog bear"
                height={540}
                width={405}
            />
            <div className={styles.overlay}>
                <div className={styles.btns}>
                    <button 
                        aria-label="Go back an image" 
                        className={styles.btn}
                        onClick={prevImage}
                    /> 
                    <button 
                        aria-label="Go to next an image"
                        className={styles.btn}
                        onClick={nextImage}
                    />
                </div>
                <div className={`${styles.info} ${montserrat.className}`}>
                    <div className={styles.name_line}>
                        Bear, <span className={styles.age}>13</span>
                    </div>
                    <div className={styles.desc_line}>
                        Fun loving dog that enjoys long naps on the couch
                    </div>
                </div>
            </div>
        </div>
    )
}