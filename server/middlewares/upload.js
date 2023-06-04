const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, callback){
        callback(null, 'public/assets/images/upload_images');
    },
    filename: function (req, file, callback){
        console.log(file);
        callback(null, file.originalname);
    }
})

const upload = multer({storage});

module.exports = upload;