const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const blogSchema = new Schema(
  {
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    author : {
        type : String,
        required : true
    },
categorys : {
    type : Array,
    required : true
}, 
url : {
    type : String,
    required : true

},
isActive : {
    type : Boolean,
    default : true
}

  },
  {
    timestamps: true,
  }
);
const blogCategorySchema = new Schema(
  {
    name: {
        type: String,
        required: true
    }
  },
  {
    timestamps: true,
  }
);
module.exports = {
  Blog: mongoose.model("Blog", blogSchema),
  BlogCategory: mongoose.model("BlogCategory", blogCategorySchema)
};
