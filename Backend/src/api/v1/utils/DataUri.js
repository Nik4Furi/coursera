//---------- Data uri function used to send the data in buffer mode
// const { DataURIParser } = require('datauri/parser');
const DataUriParser = require('datauri/parser');
const path = require('path');

//Function to send data in buffer
const getDataUri = (file) => {
    try {

        const parser = new DataUriParser();

        // console.log(file,"check file");

        let extName = path.extname(file.originalname).toString();
        // console.log(extName);

        return parser.format(extName, file.buffer);

    } catch (error) { throw new Error(error); }
}

module.exports = getDataUri;