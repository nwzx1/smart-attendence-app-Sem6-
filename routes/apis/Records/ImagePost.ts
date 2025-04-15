import fs from 'fs'
import path from 'path'

export default async (c: any, who: string) => {
    const data = await c.req.formData();
    const file = data.get(who) as any;
    const name = data.get('name') as string;

    if (!file) {
        return c.json({ error: 'No file uploaded' }, 400);
    }
    if (!name) {
        return c.json({ error: 'No name provided' }, 400);
    }

    const fileExtension = path.extname(file.name).toLowerCase();

    const validExtensions = ['.tiff', '.png', '.jpg', '.jpeg', '.jfif'];
    if (!validExtensions.includes(fileExtension)) {
        return c.json({ error: 'Invalid file extension' }, 400);
    }


    const uploadDir = path.resolve(`assets/img/${who}`);
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Save the file
    const filePath = path.join(uploadDir, name + fileExtension);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer as any);

    return c.json({
        message: 'File uploaded successfully',
        fileName: name + fileExtension,
        name,
        fileExtension,
    });
}