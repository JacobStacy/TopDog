// import ProfileCard from "@/app/ui/home/profile/profile-card"
import PlusCard from "@/app/ui/home/profile/plus-card"
import styles from "./page.module.scss"
import DogCard from "@/app/ui/home/profile/dog-card"

export default function Profile() {
    return(
        <div>
            <DogCard id={0}/>
            <DogCard id={1}/>
            <PlusCard/>
        </div>
    )
}