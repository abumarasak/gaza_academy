const asuncHandler = require("express-async-handler");
const {Blog,BlogCategory} = require("../blog/model");
const User = require("../user/model");


// @desc create category
// @route post /api/blog/category
// @access private
const createCategory = asuncHandler(async (req, res) => {
    const {name} = req.body;
    // check if name is exist
    if(!name){
        res.status(401);
        throw new Error("الرجاء ادخال جميع الحقول");
    }
    // check if name is empty
    if(name === ""){
        res.status(401);
        throw new Error("الرجاء ادخال جميع الحقول");
    }
    // check if user is admin
    if(!req.user.isAdmin){
        res.status(401);
        throw new Error("الرجاء التأكد من أنك تكون مدير");
    }
    // check if category already exist
    const category = await BlogCategory.findOne({name});
    if(category){
        res.status(401);
        throw new Error("الفئة موجودة مسبقا");
    }
    // create category
    const newCategory = await BlogCategory.create({name});
    res.status(200).json({
        message: "تم انشاء الفئة بنجاح",
        category: newCategory
    });
})
// @desc get all categories
// @route get /api/blog/category
// @access public
const getAllCategories = asuncHandler(async (req, res) => {
    const categories = await BlogCategory.find();
    // send response
    res.status(200).json({
        categories
    });
})

// @desc create blog
// @route post /api/blog
// @access private
const createBlog = asuncHandler(async (req, res) => {
    const {title, content, image, categorys, isActive} = req.body;
    // check if all fields are exist
    if(!title || !content || !image ||  !categorys){
        res.status(401);
        throw new Error("الرجاء ادخال جميع الحقول");
    }
    // check if all fields are empty
    if(title === "" || content === "" || image === "" || categorys === []){
        res.status(401);
        throw new Error("الرجاء ادخال جميع الحقول");
    }

    // check if user is admin
    if(!req.user.isAdmin){
        res.status(401);
        throw new Error("الرجاء التأكد من أنك تكون مدير");
    }
    // check if categorys exist

    for(let i = 0; i < categorys.length; i++){
        const category = await BlogCategory.findOne({name: categorys[i]});
        if(!category){
            res.status(401);
            throw new Error(`هذه الفئة ${categorys[i]} غير موجودة`);
        }
    }
    // check if title is exist
    const blog = await Blog.findOne({title});
    if(blog){
        res.status(401);
        throw new Error("الموضوع موجود مسبقا");
    }

    // create blog
    const url  = title.replace(/ /g,"_");
    const newBlog = await Blog.create({title, content, image, author: req.user.name, categorys, url, isActive});
    if(!newBlog){
        res.status(401);
        throw new Error("حدث خطأ أثناء الإنشاء");
    }
    // send response
    res.status(200).json({
        message: "تم انشاء المدونة بنجاح",
        blog: newBlog
    });
})

// @desc get all blogs
// @route get /api/blog
// @access public
const getAllBlogs = asuncHandler(async (req, res) => {
    const {categorie, search,author, userId} = req.query;
    if(categorie){
        const blogs = await Blog.find({categorys: {$in: [categorie]}});
        // check if blog is Active
           const activeBlogs = blogs.filter(blog => blog.isActive);

           res.status(200).json({
               blogs: activeBlogs
           });
    }else if(search){
        const query = {$or: [{title: {$regex: search, $options: "i"}}, {content: {$regex: search, $options: "i"}}, {author: {$regex: search, $options: "i"}}]};
       
        
        const blogs = await Blog.find(query);
        // check if blog is Active
        const activeBlogs = blogs.filter(blog => blog.isActive);
        res.status(200).json({
            blogs: activeBlogs
        });
    }else if(author){
        const blogs = await Blog.find({author: {$regex: author, $options: "i"}});
             // check if blog is Active
             const activeBlogs = blogs.filter(blog => blog.isActive);

             res.status(200).json({
                 blogs: activeBlogs
             });
    }else if(categorie && search){
        const blogs = await Blog.find({categorys: {$in: [categorie]}, $or: [{title: {$regex: search, $options: "i"}}, {content: {$regex: search, $options: "i"}}]});
             // check if blog is Active
             const activeBlogs = blogs.filter(blog => blog.isActive);

             res.status(200).json({
                 blogs: activeBlogs
             });
    }else if(categorie && author){
        const blogs = await Blog.find({categorys: {$in: [categorie]}, author: {$regex: author, $options: "i"}});
            // check if blog is Active
            const activeBlogs = blogs.filter(blog => blog.isActive);

            res.status(200).json({
                blogs: activeBlogs
            });
    }
    else {
        const blogs = await Blog.find();
           // check if blog is Active
           const activeBlogs = blogs.filter(blog => blog.isActive);

           res.status(200).json({
               blogs: activeBlogs
           });
    }
   
})
// @desc get All blogs by admin
// @route get /api/blog/admin
// @access private
const getAllBlogsByAdmin = asuncHandler(async (req, res) => {
    // check if user is admin
    if(!req.user.isAdmin){
        res.status(401);
        throw new Error("الرجاء التأكد من أنك تكون مدير");
    }
    const blogs = await Blog.find();
    res.status(200).json({
        blogs
    });
}
)

// @desc get blog by id
// @route get /api/blog/:id
// @access public
const getBlogById = asuncHandler(async (req, res) => {
    const {id} = req.params;
    const blog = await Blog.findById(id);
    if(!blog){
        res.status(401);
        throw new Error("المدونة غير موجودة");
    }
    res.status(200).json({
        blog
    });
}
)
// @desc update blog
// @route put /api/blog/:id
// @access private
const updateBlog = asuncHandler(async (req, res) => {
    // get id
    const {id} = req.params;
    // get new data
    const {title, content, image, categorys} = req.body;
    // check if user is admin
    if(!req.user.isAdmin){
        res.status(401);
        throw new Error("الرجاء التأكد من أنك تكون مدير");
    }
    // check if want to change categorys
    if(categorys){
        for(let i = 0; i < categorys.length; i++){
            const category = await BlogCategory.findOne({name: categorys[i]});
            if(!category){
                res.status(401);
                throw new Error(`هذه الفئة ${categorys[i]} غير موجودة`);
            }
        }

    }
})

module.exports = {
    createCategory,
    getAllCategories,
    createBlog,
    getAllBlogs,
    getBlogById
}