const express=require('express');
const app = express();
const multer=require('multer');
const Post= require('./api/models/post')
const postdata=new Post();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+getExt(file.mimetype));
    }
  })
   
  const getExt=(mimeTypes)=>{
      switch(mimeTypes){
          case 'image/jpeg':
              return '.jpeg';
          case 'image/png':
              return '.png';
          case 'image/jpg':
                return '.jpg';         
      }


  }
  var upload = multer({ storage: storage })
app.use(express.json());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    next();
})

app.use('/uploads' ,express.static('uploads/'))

app.get('/api/posts',(req,res)=>{
    
    if( res.status(200))
    {
     
    res.send(postdata.getlist());
    
    }
})
app.get('/api/posts/:post_id',(req,res)=>{

    //console.log(req.params.post_id);
  if(res.status(200))
   res.send(postdata.getIndividual(req.params.post_id));
   else
  res.send("Not Found");
})

app.post('/api/posts',upload.single('post-image'),(req,res)=>{
   
    const newPost={
        "id":Date.now(),
        "title":req.body.title,
        "content":req.body.content,
        "post_image": req.file.path,
        "added_date":Date.now()
    }
   
    res.send(postdata.addnewpost(newPost));


})

app.listen('3000',()=>{
    console.log('listening on');
   
})