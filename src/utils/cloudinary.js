const cloudinary = require("cloudinary");
cloudinary.config({
    cloud_name: 'dlqhd5nhy',
    api_key: '611863171916668',
    api_secret: 'O4GgmOsEFu9wd1MQxFWDfaqD0Uc'
});
const cloudinaryUloadImg = async (fileToUpload) => {
    return new Promise((resolve) => {
        cloudinary.uploader.upload(fileToUpload, (result) => {
            console.log(result)
            resolve(
                {url: result.secure_url}, {resource_type: "auto"})
        })
    });
}
const cloudinaryDeleteImg = async (imageUrl) => {
    return new Promise((resolve) => {
        const urlArray = imageUrl.split('/')
        const image = urlArray[urlArray.length - 1]
        const imageName = image.split('.')[0]
        cloudinary.uploader.destroy(imageName, (resp, error) => {
            if (error) {
                resolve({msg: 'Impossible de supprimer le document', error})
            }
            let msg = resp.result === 'ok' ? 'Le fichier a été supprimer avec succes' : 'Le fichier est introuvable'
            resolve({msg})
        })
    })
}
module.exports = {cloudinaryUloadImg, cloudinaryDeleteImg}