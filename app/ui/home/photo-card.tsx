'use client'
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import styles from "./photo-card.module.scss";
import Image from "next/image";
import { PhotoCardProps } from "@/types";
import { montserrat } from '@/app/ui/fonts';

interface PhotoCardHandle {
    triggerSwipeLeft: () => void;
    triggerSwipeRight: () => void;
}

const PhotoCard = forwardRef<PhotoCardHandle, PhotoCardProps>(({ active, onDeck, data, removeCard }, ref) => {
    const [signedUrls, setSignedUrls] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState(0);
    const [localExitX, setLocalExitX] = useState(0);

    useEffect(() => {
        const updateImages = async () => {

            const signedUrls: string[] = [];

                for (const unSignedUrl of data.imageUrls) {
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
                        // console.log(data);
                        signedUrls.push(data);
                    } catch (error) {
                        console.error("Error fetching signed URL:", error);
                    }
                }
            

            setSignedUrls(signedUrls);
        };

        updateImages();
    }, []);




    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-25, 25]);
    const opacity = useTransform(x, [-100, -62.5, 0, 62.5, 200], [0, 1, 1, 1, 0]);

    const dragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.x > 150) {
            setLocalExitX(200);
            removeCard(data._id, "right");
        } else if (info.offset.x < -150) {
            setLocalExitX(-200);
            removeCard(data._id, "left");
        }
    };

    useImperativeHandle(ref, () => ({
        triggerSwipeLeft: () => {
            setLocalExitX(-200);
            removeCard(data._id, "left");
        },
        triggerSwipeRight: () => {
            setLocalExitX(200);
            removeCard(data._id, "right");
        }
    }));

    const nextImage = () => {
        if (selectedImage + 1 < signedUrls.length) {
            setSelectedImage(selectedImage + 1);
        }
    };

    const prevImage = () => {
        if (selectedImage - 1 >= 0) {
            setSelectedImage(selectedImage - 1);
        }
    };

    // console.log(onDeck);
    return (
        active ? (
            <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                className={styles.photo_card}
                onDragEnd={dragEnd}
                initial={{ scale: 0.95, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ x, rotate, opacity }}
                transition={{ type: 'tween', duration: 0.3, ease: 'easeIn' }}
                whileDrag={{ cursor: 'grabbing' }}
                exit={{ x: localExitX }}
            >
                {signedUrls.length ? (
                    signedUrls.map((image, index) => (
                        <Image
                            key={index} // corrected the key prop
                            className={`${styles.picture} ${index === selectedImage ? '' : styles.hidden}`} // Apply hidden class to non-selected images
                            src={image}
                            alt={`Picture of ${data.name}`}
                            height={540}
                            width={405}
                            priority // Preload
                            unoptimized
                        />
                    ))
                ) : (
                    <Image
                        key="index"
                        className={styles.picture}
                        src="/dog-icon.svg"
                        alt={`Picture of ${data.name}`}
                        height={540}
                        width={405}
                        unoptimized
                    />
                )}
                <div className={styles.overlay}>
                    <div className={styles.photo_count}>
                        {signedUrls.map((url, index) => (
                            <div className={`${styles.bar} ${index === selectedImage ? styles.selected : 'cock'}`}></div>
                        ))}
                    </div>
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
                            {data.name}, <span className={styles.age}>{data.age}</span>
                        </div>
                        <div className={styles.desc_line}>
                            {data.bio}
                        </div>
                    </div>
                </div>
            </motion.div>
        ) : onDeck ? (
            <div className={
                `${styles.photo_card} ${styles.hidden}`
            }>
                {signedUrls.length ? (
                    signedUrls.map((image, index) => (
                        <Image
                            key={index} // corrected the key prop
                            className={`${styles.picture} ${index === selectedImage ? '' : styles.hidden}`} // Apply hidden class to non-selected images
                            src={image}
                            alt={`Picture of ${data.name}`}
                            height={540}
                            width={405}
                            priority // Preload
                            unoptimized
                        />
                    ))
                ) : (
                    <Image
                        key="index"
                        className={styles.picture}
                        src="/dog-icon.svg"
                        alt={`Picture of ${data.name}`}
                        height={540}
                        width={405}
                        unoptimized
                    />
                )}
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
                            {data.name}, <span className={styles.age}>{data.age}</span>
                        </div>
                        <div className={styles.desc_line}>
                            {data.bio}
                        </div>
                    </div>
                </div>
            </div>
        ) : null
    );
});

// Set the display name to avoid the ESLint warning
PhotoCard.displayName = 'PhotoCard';

export default PhotoCard;
