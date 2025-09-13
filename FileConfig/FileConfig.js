import multer from "multer";



const storage = multer.diskStorage({
    destination:((req,file,cb)=>{
        cb(null,"uploads");
    }),
    filename:((req,file,cb)=>{
        let fileName = Date.now()+"-"+file.originalname;
        cb(null,fileName);
    })
})


const multerConfig = multer({storage:storage});
export default multerConfig;