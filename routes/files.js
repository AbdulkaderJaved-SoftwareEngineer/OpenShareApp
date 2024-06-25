const router = require('express').Router();
const { error } = require('console');
const multer = require('multer');
const path = require('path');
const File = require('../models/file');
const {v4:uuid4} = require('uuid');
let storage = multer.diskStorage(
    {
        destination:(req,file,cb)=>cb(null,'uploads/'),
        filename:(req,file,cb)=>
            {
              // ----------> Unique Name Generation <----------------  
                //Each file that we are storing must have a unique name in order to avoid overwriting of file 
                // File will contain Date in Epoch - 9 digit number.file_extension
                // 44222231-882829212.zip
                const uniqueName = `${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`;
                cb(null,uniqueName);
            }

    });


let upload = multer({
    storage:storage,
    limits:{fileSize:100000*100}
}).single('myfile')

router.post('/',(req,res)=>{
    //Validate the Request
  
    //Storage
        upload(req,res, async(err)=>{
            if(!req.file)
                {
        return res.json({error:"You have not Uploaded any files. !"})
                }
        
            if(err)
                {
                    return res.status(500).send({error:err.message})
                }
    //Store into Database
    const file = new File({
        filename:req.file.filename,
        uuid:uuid4(),
        path: req.file.path,
        size : req.file.size
    });
    const response = await file.save();
return res.json({file:`${process.env.APP_BASE_URL}/files/${response.uuid}`})

// URL = http://localhost:3000/files/r433eEdkd445SSSa-ndnjjj

        });






    // Sending the Response
})

module.exports = router;