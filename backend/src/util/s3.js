const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');
const bucketName =  process.env.AWS_BUCKET_NAME 
const region =   process.env.AWS_BUCKET_REGION
const accessKeyId =   process.env.AWS_ACCESS_KEY_ID 
const  secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3({
        region,
        accessKeyId,
        secretAccessKey,
});

// upload a file to s3
const uploadFile =  (file) => {
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename,
    };
    const upload =  s3.upload(uploadParams).promise();
    return upload
}
// download a file from s3

const getFile = (fileKey) => {
    const downloadParams = {
        Bucket: bucketName,
        Key: fileKey,
    };
    const file =  s3.getObject(downloadParams).createReadStream();
    return file
}


// delete a file from s3
const unlinkFile = (filePath) => {
    s3.deleteObject({
        Bucket: bucketName,
        Key: filePath,
    }).promise();
    return true

}
module.exports = {
    uploadFile,
    getFile,
    unlinkFile
}