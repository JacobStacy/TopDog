'use client'
import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import PhotoCard from "@/app/ui/home/photo-card";
import IActionButtons from "../ui/home/iaction-btns";
import styles from "./page.module.scss";
import { DogType } from "@/model/dog-model";
import { Schema } from "mongoose";
import { montserrat } from '@/app/ui/fonts';
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

interface PhotoCardHandle {
    triggerSwipeLeft: () => void;
    triggerSwipeRight: () => void;
}

export default function Home() {


    const [cards, setCards] = useState<DogType[]>([]);
    const [limitRate, setLimitRate] = useState<boolean>(false);
    const session = useSession();

    const cardRef = useRef<PhotoCardHandle[]>([]);
    const activeIndex = cards.length - 1;

    useEffect(() => {
        if (session?.status == "unauthenticated") {
            redirect("/get-started"); // Redirect if session exists
        }
    }, [session]);

    useEffect(() => {
        const setTut = async () => {
            try {
                const response = await fetch("/api/update-tut", {
                    method: "POST",
                });
    
                if (!response.ok) {
                    throw new Error("Failed to update tutorial status.");
                }
    
                
            } catch (err) {
                throw err;
            }
        }
        setTut();
    }, [])

    const getDogs = async () => {
        try {
            const response = await fetch('/api/get-dogs?isFrontPage=true');

            if (!response.ok) {
                throw new Error('Failed to fetch dogs');
            }

            const data = await response.json();
            console.log("data", data);

            if (data.length > 0) {
                setLimitRate(false);
            } else {
                setLimitRate(true);
            }

            setCards(data);
        } catch (error) {
            console.error("Error fetching dogs:", error);
        }
    };

    useEffect(() => {
        getDogs();
    }, []);

    useEffect(() => {
        if (cards.length === 0) {

            if (limitRate){
                console.log("Pulling again in 20s")
                const timer = setTimeout(() => {
                    getDogs();
                }, 20000);
    
                return () => clearTimeout(timer);
            } else {
                // Delay to make sure the last dog don't get displayed again
                console.log("Pulling again in .5s")
                const timer = setTimeout(() => {
                    getDogs();
                }, 500);
    
                return () => clearTimeout(timer);
            }
        }
    }, [cards]);

    const removeCard = async (id: Schema.Types.ObjectId, action: 'right' | 'left') => {
        console.log("in remove card ==============")
        setCards(prev => prev.filter(card => card._id !== id));

        const formData = new FormData();
        formData.append("dogId", id.toString() || "");
        formData.append("swipe", action);

        console.log("formData:", formData);

        try {
            console.log("dogID", id);
            const response = await fetch('/api/interaction', {
                method: "PATCH",
                body: formData,
            });
            if (!response.ok) {
                console.log(response);
                throw new Error('Failed to send interaction');
            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className={styles.photo_card_holder}>
                <AnimatePresence>
                    {cards.length ? (
                        cards.map((card, index) => (
                            <PhotoCard
                                key={card._id.toString()}
                                data={card}
                                active={card._id === cards[activeIndex]._id}
                                onDeck={activeIndex - 1 >= 0 && card._id === cards[activeIndex - 1]._id}
                                removeCard={removeCard}
                                ref={(el) => { cardRef.current[index] = el as PhotoCardHandle; }}
                            />
                        ))
                    ) : (
                        <div className={`${styles.empty} ${montserrat.className}`}>
                            We're all out for now :(
                            <br /><br />
                            Come back later for more!!
                        </div>
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
