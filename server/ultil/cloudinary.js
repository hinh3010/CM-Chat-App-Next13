import { v2 as cloudinary } from 'cloudinary'
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const folderCloudinary = 'hellocacbantre'

/**
 * 
 * @param {FormDataEntryValue} file 
 * @param {string} folder 
 */
const uploads = async (file, folder = folderCloudinary) => {
    if (!file) throw new Error('An error occurred during upload')

    const buffer = Buffer.from(await file.arrayBuffer());
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: folder }, (error, result) => {
            if (error || !result) reject(new Error('Something went wrong'))

            // resolve({
            //     mimetype: result.resource_type,
            //     size: file.size,
            //     path: result.secure_url
            // })
            resolve(result.secure_url)
        })
            .end(buffer)
    })
};

export { uploads, cloudinary };