import { uploads } from "../ultil/cloudinary"


/**
 * 
 * @param {Request} request 
 * @returns 
 */
export const uploadCloudinary = async (request) => {
    const formData = await request.formData()
    const file = formData.get('file')
    return await uploads(file, 'artworks')
}
