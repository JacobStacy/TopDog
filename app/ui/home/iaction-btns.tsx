'use client'
import { forwardRef } from "react";
import styles from "./iaction-btns.module.scss";
import CheckIcon from "@/public/check-icon.svg";
import CrossIcon from "@/public/cross-icon.svg";
import StarIcon from "@/public/star-icon.svg";
import { IActionBtnsProps } from "@/types";

const IActionButtons = forwardRef(({ triggerSwipeLeft, triggerSwipeRight }: IActionBtnsProps, ref) => {
    const handleSwipe = (action: 'left' | 'right') => {
        if (action === 'left') {
            triggerSwipeLeft();
        } else if (action === 'right') {
            triggerSwipeRight();
        }
    };

    return (
        <div className={styles.iaction_btns}>
            <ul>
                <li>
                    <button 
                        onClick={() => handleSwipe("left")} 
                        aria-label="Dislike"
                    >
                        <CrossIcon className={styles.cross} />
                    </button>
                </li>
                <li>
                    <button aria-label="Mega Like">
                        <StarIcon className={styles.star} />
                    </button>
                </li>
                <li>
                    <button 
                        onClick={() => handleSwipe("right")} 
                        aria-label="Like"
                    >
                        <CheckIcon className={styles.check} />
                    </button>
                </li>
            </ul>
        </div>
    );
});

export default IActionButtons;
