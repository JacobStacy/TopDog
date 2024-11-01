import AddDogForm from "@/app/ui/home/profile/add-dog/add-dog-form"
import s from "./page.module.scss"
import ImageUploader from "@/app/ui/home/profile/add-dog/image-uploader"
import { auth } from "@/auth";
import { User } from "@/model/user-model";
import { dbConnect } from "@/lib/mongo";
import { redirect } from "next/navigation";



export default async function AddDog() {


    await dbConnect();
    const session = await auth();
    // console.log(session?.user?.email);
    const user = await User.findOne({
        email: session?.user?.email,
    });



    // const response = await fetch('/api/get-dog?getBlank=true');

    // if (!response.ok) {
    //     throw new Error("Failed to fetch dogs");
    // }

    // const data = await response.json();

    

    
    // Check if the user exists
    if (!user) {
        redirect("/get-started")
    } else {
        return (
            <div className={s.add_dog}>
                <ImageUploader/> 
                <AddDogForm/>
            </div >
        )
    }

}