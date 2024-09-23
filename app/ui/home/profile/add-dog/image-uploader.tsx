import s from "./image-uploader.module.scss"
import Image from "next/image"

const IMAGES = [
    "/bear_1.jpg",
    "/bear_2.png",
    "/bear_3.jpg",
    "/samantha_1.jpg",
    "/samantha_2.png",
    "/samantha_1.jpg",
]
export default function ImageUploader(){
    return (
        <div className={s.image_uploader}>
            <div className={s.images}>
                {IMAGES.map((image:string, index : number) => (
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
                <div className={s.add_image}>
                    ＋
                </div>
            </div>
        </div>
    )
}