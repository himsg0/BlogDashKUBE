const { request, response } = require('express');
const express= require('express');
const { route } = require('express/lib/application');
const Blog = require('./../models/Blog');
const multer = require('multer');
const router = express.Router();



//define storage for the images

const storage = multer.diskStorage({
    //destination for files
    destination: function (request, file, callback) {
      callback(null, './public/uploads/images');
    },
  
    //add back the extension
    filename: function (request, file, callback) {
      callback(null, Date.now() + file.originalname);
    },
});
  
//upload parameters for multer
  const upload = multer({
    storage: storage,
    limits: {
      fieldSize: 1024 * 1024 * 3,
    },
});





router.get('/new',(request,response)=>{
    response.render('new');
});
// view route
router.get('/:_id',async(request,response)=>{
    let blog = await Blog.findOne({ _id: request.params._id });
    if(blog){
        response.render('show',{blog: blog});
    }else{
        response.redirect('/');
    }
});

//route that handles new post
router.post('/', upload.single('image'), async (request, response) => {
  console.log(request.file);
  // console.log(request.body);
  let blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    category: request.body.category,
    featuredImage: request.body.featuredImage,
    thumbnailImage: request.body.thumbnailImage    ,
    desc: request.body.desc,
    slugtitle: request.body.slugtitle,


    img: request.file.filename,
  });

  try {
    blog = await blog.save();

    response.redirect(`blogs/${blog._id}`);
  } catch (error) {
    console.log(error);
  }
});


//route that handle edit
router.get('/edit/:_id', async (request, response) => {
    let blog = await Blog.findById(request.params.id);
    response.render('edit', { blog: blog });
});

//route to handle updates
router.put('/:id', async (request, response) => {
    request.blog = await Blog.findById(request.params.id);
    let blog = request.blog;
    blog.title = request.body.title;
    blog.author = request.body.author;
    blog.description = request.body.description;
  
    try {
      blog = await blog.save();
      //redirect to the view route
      response.redirect(`/blogs/${blog._id}`);
    } catch (error) {
      console.log(error);
      response.redirect(`/seblogs/edit/${blog.id}`, { blog: blog });
    }
});

///route to handle delete
router.post('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.redirect('/');
}); 




module.exports= router;