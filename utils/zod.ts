import { object, string, number} from "zod"

export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required"),
})


export const addDogSchema = object({
  name: string({ required_error: "Name is required" })
    .min(1, "Name is required")
    .max(16, "Name cannot exceed 16 characters"),

  age: number({ required_error: "Age is required" })
    .min(0, "Age must be a positive number"),

  bio: string({ required_error: "Bio is required" })
    .min(1, "Bio is required")
    .max(120, "Bio cannot exceed 120 characters"),
});