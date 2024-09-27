import { NextRequest, NextResponse } from "next/server";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';




export const PATCH = async (request: NextRequest) => {
    console.log("in get image----------------------");
    try {
        const {
            unSignedUrl,
        } = await request.json();

        console.log("unsigned", unSignedUrl);



        const command = new GetObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME!,
            Key: unSignedUrl,
        });

        console.log("before getSigned")
        const url = await getSignedUrl(s3, command);

        return NextResponse.json(url, { status: 200 })
    } catch (error) {
        console.error('Error fetching image from S3:', error);
        return new Response('Error fetching image from S3');
    }
}


const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    },
    region: process.env.AWS_REGION
});