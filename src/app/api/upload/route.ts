import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from "uniqid";

export async function POST(req : Request){
    const formData = await req.formData();

    if(formData.has('file')){
        const file = formData.get('file') as File | null;
        
        if (!file) {
            return new Response("File not found", { status: 400 });
        }

        const s3Client = new S3Client({
            region: 'us-east-1',
            credentials:{
                accessKeyId: process.env.S3_ACCESS_KEY as string,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string
            }
        })
        const randomId = uniqid();
        const ext = file.name.split('.').pop();
        const newFileName = randomId + '.' + ext;
        const bucketName = process.env.BUCKET_NAME;

        // Read file stream into a buffer
        const chunks: Uint8Array[] = [];
        const reader = file.stream().getReader();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            if (value) chunks.push(value);
        }

        await s3Client.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: newFileName,
            Body: Buffer.concat(chunks),
            ContentType: file.type
        }));

        const link = `https://${bucketName}.s3.amazonaws.com/${newFileName}`;
        return new Response(JSON.stringify(link), {
            headers: { 'Content-Type': 'application/json' }
        });
    }
    return new Response("File not provided", { status: 400 });
}