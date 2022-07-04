const mongoose= require('mongoose');
const slug = require('mongoose-slug-generator');
const domPurifier = require('dompurify');
const { JSDOM } = require('jsdom');
const htmlPurify = domPurifier(new JSDOM().window);
const {stripHtml} = require('string-strip-html');


const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    slugtitle:{
        type:String,
        required: true,
    },
    author:{
        type:String,
        required:true,
    },
    description:{
        type:String
    },
    category:{
        type:String
    },
    featuredImage:{
        type:String
    },
    thumbnailImage:{
        type:String
    },
    desc:{
        type:String
    },
    timeCreated: {
        type: Date,
        default: () => Date.now(),
    },
    snippet: {
      type: String,
    },
    img:{
        type:String,
        default:"placeholder.jpg"
    },
    
});

  
    


module.exports= mongoose.model('post',blogSchema);