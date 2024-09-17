

export type User = {
    email : string;
    password : string;
}

export const users = [
    {
        email: "gibby@icarly.com",
        password: "password"
    },
    {
        email: "carly@icarly.com",
        password: "password"
    },
    {
        email: "fred@icarly.com",
        password: "password"
    },
]

export const getUserByEmail = (email: string) => {
    const found = users.find(user => user.email === email);
    return found;
}