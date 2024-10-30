# 🐾 **Top Dog: The Ultimate Pet Profile App!** 🚀

Welcome to **Top Dog**, a **mobile-first** social media web app designed for pet lovers! This platform allows users to upload profiles of their pets, swipe through other profiles, and compete for likes to see who ranks as the **"Top Dog"** on the leaderboard.

## 📚 Table of Contents
1. [✨ Features](#features)
2. [🚀 Project Overview](#project-overview)
3. [💻 Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Running the Development Server](#running-the-development-server)
   - [Setting Up Environment Variables](#setting-up-environment-variables)
4. [🔧 Technologies Used](#technologies-used)
5. [📈 Future Plans](#future-plans)
6. [📫 Connect](#connect)
7. [🎨 Screenshots](#screenshots)
8. [⭐️ Acknowledgments](#acknowledgments)

---

## ✨ Features
- **Mobile-first Design**: Provides a seamless experience on any device.
- **Real-time Updates**: Live leaderboards and user interactions.
- **Upload and Swipe**: Share pet profiles and discover new furry friends.
- **MongoDB Backend**: Efficient data handling and storage.

---

## 🚀 Project Overview
**Top Dog** allows users to:
1. **Upload Profiles**: Showcase pets with adorable pictures and descriptions.
2. **Swipe Through Profiles**: Discover and connect with other pet lovers.
3. **Compete for Likes**: See whose pet can climb to the top of the leaderboard!

### **Goal**
To foster a vibrant community of pet lovers and expand the platform to allow adoption centers to post pets and match them with potential owners.

---

## 💻 Getting Started

Follow these steps to get your local copy of **Top Dog** up and running.

### Prerequisites
- [Node.js](https://nodejs.org) (v14 or higher)
- A package manager (npm, yarn, pnpm, or bun)

### Installation
1. **Clone the repository:**
```bash
   git clone <repository-url>
   cd top-dog
```
   

2. **Install the dependencies:**
```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
```

### Running the Development Server
To start the server, use the command:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the app in action!

### Setting Up Environment Variables
To configure the application, create a `.env` file in the root directory of your project and add the following variables:

```plaintext
GOOGLE_CLIENT_ID=<your_google_client_id>
GOOGLE_CLIENT_SECRET=<your_google_client_secret>

AUTH_SECRET=<your_auth_secret>

GITHUB_CLIENT_ID=<your_github_client_id>
GITHUB_CLIENT_SECRET=<your_github_client_secret>

MONGODB_URI=<your_mongodb_uri>

AWS_REGION=<your_aws_region>

AWS_ACCESS_KEY_ID=<your_aws_access_key_id>
AWS_SECRET_ACCESS_KEY=<your_aws_secret_access_key>
S3_BUCKET_NAME=<your_s3_bucket_name>

CRON_SECRET=<your_cron_secret>
```
Make sure to replace the placeholder values with your actual keys and secrets.

### How to Obtain the Required Services
Here are the links to get you started with the necessary services:

- **[Google Cloud Console](https://console.cloud.google.com/)**: Create a project to obtain your **Google Client ID** and **Client Secret**.
- **[GitHub Developer Settings](https://github.com/settings/developers)**: Register a new application to get your **GitHub Client ID** and **Client Secret**.
- **[MongoDB Atlas](https://www.mongodb.com/atlas/database)**: Sign up and create a new cluster to get your **MongoDB URI**.
- **[AWS Management Console](https://aws.amazon.com/console/)**: Set up an account and create an IAM user to get your **AWS Access Key ID** and **Secret Access Key**.
- **[AWS S3 Documentation](https://aws.amazon.com/s3/getting-started/)**: Learn how to create a bucket for your image uploads.
- **[Vercel Cron Jobs](https://vercel.com/docs/cron-jobs)**: Learn how to set up cron jobs on Vercel for scheduled tasks.

---

## 🔧 Technologies Used
- **Frontend**: 
  - Next.js
  - React
  - Framer
  - SCSS Modules
- **Backend**:
  - MongoDB

---

## 📈 Future Plans
- **Adoption Center Integration**: Collaborate with local shelters to feature pets available for adoption.
- **Enhanced Features**: Implement advanced search filters, user profiles, and messaging capabilities.
- **Mobile App Development**: Explore the possibility of creating a companion mobile application.

---

## 📫 Connect
Have questions or want to connect? Reach out to me on [LinkedIn](https://www.linkedin.com/in/jacobrstacy) or via email at [jacobrstacy@gmail.com](mailto:jacobrstacy@gmail.com). 

---

## 🎨 Screenshots
![Screenshot 1](https://top-dog-nine.vercel.app/Demo1.png)
![Screenshot 2](https://top-dog-nine.vercel.app/Demo2.png)
![Screenshot 3](https://top-dog-nine.vercel.app/Demo3.png)



### 📎 Check out the project here: [Top Dog](https://top-dog-nine.vercel.app)

### Tags:
#FullStackDevelopment #NextJS #MongoDB #WebDevelopment #MobileFirst #UXDesign #SoftwareEngineer
