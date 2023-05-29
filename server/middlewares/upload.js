const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, callback){
        cb(null, 'public/assets/images/upload_images');
    },
    filename: function (req, file, cb){
        console.log(file);
        cb(null, file.originalname);
    }
})

const upload = multer({storage});

module.exports = upload;