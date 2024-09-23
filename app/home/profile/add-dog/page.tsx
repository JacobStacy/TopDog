import AddDogForm from "@/app/ui/home/profile/add-dog/add-dog-form"
import s from "./page.module.scss"
import ImageUploader from "@/app/ui/home/profile/add-dog/image-uploader"

export default function AddDog() {
    return (
        <div className={s.add_dog}>
            <ImageUploader/>
            <AddDogForm/>
        </div >
    )
}