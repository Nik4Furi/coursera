const multer = require('multer');

//-------- Function to create the storage
const storage = multer.memoryStorage();

//------- Create the Upload File function to upload the files
const UploadFile = multer({
    storage
}).single('file');

module.exports = UploadFile;