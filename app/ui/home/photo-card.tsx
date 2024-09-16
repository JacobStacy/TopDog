'use client'
import { forwardRef, useImperativeHandle, useState } from "react";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import styles from "./photo-card.module.scss";
import Image from "next/image";
import { PhotoCardProps } from "@/types";
import { montserrat } from '@/app/ui/fonts';

interface PhotoCardHandle {
    triggerSwipeLeft: () => void;
    triggerSwipeRight: () => void;
}

const PhotoCard = forwardRef<PhotoCardHandle, PhotoCardProps>(({ active, data, removeCard }, ref) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [localExitX, setLocalExitX] = useState(0);
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-25, 25]);
    const opacity = useTransform(x, [-100, -62.5, 0, 62.5, 200], [0, 1, 1, 1, 0]);

    const dragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.x > 150) {
            setLocalExitX(200);
            removeCard(data.id, "right");
        } else if (info.offset.x < -150) {
            setLocalExitX(-200);
            removeCard(data.id, "left");
        }
    };

    useImperativeHandle(ref, () => ({
        triggerSwipeLeft: () => {
            setLocalExitX(-200);
            removeCard(data.id, "left");
        },
        triggerSwipeRight: () => {
            setLocalExitX(200);
            removeCard(data.id, "right");
        }
    }));

    const nextImage = () => {
        if (selectedImage + 1 < data.photos.length) {
            setSelectedImage(selectedImage + 1);
        }
    };

    const prevImage = () => {
        if (selectedImage - 1 >= 0) {
            setSelectedImage(selectedImage - 1);
        }
    };

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
                <Image
                    key="index"
                    className={styles.picture}
                    src={data.photos[selectedImage]}
                    alt={`Picture of ${data.name}`}
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
                            {data.name}, <span className={styles.age}>{data.age}</span>
                        </div>
                        <div className={styles.desc_line}>
                            {data.desc}
                        </div>
                    </div>
                </div>
            </motion.div>
        ) : null
    );
});

export default PhotoCard;
