"use client"
import s from "./add-dog-form.module.scss"
import { montserrat } from '@/app/ui/fonts';

// Define the type for image objects in the array
// interface UploadedImage {
//     file: File;
//     preview: string;
// }

export default function AddDogForm(){
    // const [error, setError] = useState("")
    // const [selectedImages, setSelectedImages] = useState<UploadedImage[]>([]);


    const handleFormSubmit = () => {
        
    }

    return (
        <div className={`${s.add_dog} ${montserrat.className}`}>
            <div className={s.error_msg}>
                {/* {error} */}
            </div>
            <form onSubmit={handleFormSubmit}>
                <div className={s.fields}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" name="name" id="name"/>
                    </div>
                    <div>
                        <label htmlFor="age">Age:</label>
                        <input type="number" name="age" id="age"/>
                    </div>
                    <div>
                        <label htmlFor="bio">Bio:</label>
                        <input type="text" name="bio" id="bio"/>
                    </div>
                    <div>
                        <label htmlFor="breed">Breed:</label>
                        <input type="text" name="breed" id="breed"/>
                    </div>
                    
                </div>
                <button type="submit">
                    Add Dog!
                </button>
            </form>
        </div>
    )
}