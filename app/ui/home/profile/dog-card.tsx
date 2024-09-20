import styles from "./dog-card.module.scss";
import ProfileCard from "./profile-card";
import Image from "next/image";

export default function DogCard({
    id
} : {
    id: number;
}) {
    return(
        <ProfileCard className={styles.card}>
            <div className={styles.image_holder}>
                <Image
                    src="/bear_1.jpg"
                    alt="picture of bear"
                    width={102}
                    height={136}
                />
            </div>
            <div className={styles.info}>
                <div className={styles.top_line}>
                    <div className={styles.name_age}>Bear, <span>13</span></div>
                    
                    <div className={styles.likes_options}>

                        <input id={`${id}`} type="checkbox"/>
                        <div className={styles.likes}>♥ 30</div>
                        <div className={styles.options}>
                            <div className={styles.options_menu}>
                                <div className={styles.option}>
                                    Edit
                                </div>
                                <div className={styles.option}>
                                    Delete
                                </div>
                            </div>
                            <label htmlFor={`${id}`} aria-label="Toggle Options Menu">
                                <span>•••</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className={styles.bottom_section}>
                    <div className={styles.rank}>
                        <span className={styles.info_label}> </span>
                        ✪ 2nd
                    </div>
                    <div className={styles.desc}>
                        <span className={styles.info_label}>Bio: </span> 
                        Fun loving do that enjoys long naps on the couch
                    </div>
                    <div className={styles.breed}>
                        <span className={styles.info_label}>Breed: </span>
                        German Sheperd Lab Mix
                    </div>
                </div>
                
            </div>
        </ProfileCard>
    );
}