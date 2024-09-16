
'use client'
import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import PhotoCard from "@/app/ui/home/photo-card";
import IActionButtons from "../ui/home/iaction-btns";
import { PhotoCardData } from "@/types";
import { photoCardData } from "@/utils/data";
import styles from "./page.module.scss";

interface PhotoCardHandle {
    triggerSwipeLeft: () => void;
    triggerSwipeRight: () => void;
}

export default function Home() {
    const [cards, setCards] = useState<PhotoCardData[]>(photoCardData);
    const [rightSwipe, setRightSwipe] = useState(0);
    const [leftSwipe, setLeftSwipe] = useState(0);

    const cardRef = useRef<PhotoCardHandle[]>([]);
    const activeIndex = cards.length - 1;

    const removeCard = (id: number, action: 'right' | 'left') => {
        setCards(prev => prev.filter(card => card.id !== id));
        if (action === 'right') {
            setRightSwipe(prev => prev + 1);
        } else {
            setLeftSwipe(prev => prev + 1);
        }
    };

    return (
        <>
            <div className={styles.photo_card_holder}>
                <AnimatePresence>
                    {cards.length ? (
                        cards.map((card, index) => (
                            <PhotoCard
                                key={card.id}
                                data={card}
                                active={card.id === activeIndex}
                                removeCard={removeCard}
                                ref={(el) => { cardRef.current[index] = el as PhotoCardHandle; }}
                            />
                        ))
                    ) : (
                        <h2>
                            Come back tomorrow for more
                        </h2>
                    )}
                </AnimatePresence>
            </div>

            <IActionButtons
                triggerSwipeLeft={() => cardRef.current[activeIndex]?.triggerSwipeLeft()}
                triggerSwipeRight={() => cardRef.current[activeIndex]?.triggerSwipeRight()}
                removeCard={removeCard}
            />
        </>
    );
}
