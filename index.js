import bodyParser from 'body-parser';
import express from 'express';
const app = express();
const port = 3000;

//Data center
let posts=[];

//Constructor for post
function Post(title,content){
    this.title = title;
    this.content = content;
    this.rawDate = new Date();
    this.date = this.rawDate.toLocaleString();
}

function addPost(title,content){
    let post = new Post(title,content);
    posts.push(post);
}

function deletePost(index){
    posts.splice(index,1);
}

function editPost(index,title,content){
    posts[index] = new Post(title,content);
}

//Middlewares
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}));

//Home
app.get("/",(req,res)=>{
    res.render("home.ejs",{posts:posts});
});

//View
app.get("/view/:id",(req,res)=>{
    let index = req.params.id;
    let post = posts[index];
    res.render("view.ejs",{postId:index,title:post.title,content:post.content});
});


//Delete
app.post("/delete",(req,res)=>{
    let index = req.body["postId"];
    deletePost(index);
    res.redirect("/");
});


//Edit Page
app.get("/edit/:id",(req,res)=>{
    let index = req.params.id;
    let post = posts[index];
    res.render("create.ejs",{postId:index,title:post.title,content:post.content});
});

//Update
app.post("/update",(req,res)=>{
    let index = req.body["index"];
    let title = req.body["title"];
    let content = req.body["content"];
    editPost(index,title,content);
    res.redirect("/");
});

//Create Page
app.get("/create",(req,res)=>{
    res.render("create.ejs");
});

//Save
app.post("/save",(req,res)=>{
    let title = req.body["title"];
    let content = req.body["content"];
    
    addPost(title,content);
    res.redirect("/");
});



app.listen(port,()=>{
    addPost("I am new here but not for long","Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit maiores minus vitae autem accusantium nam voluptatem in magnam voluptatum ab optio accusamus eum quos incidunt ullam, ad natus perspiciatis reiciendis.")
    addPost("I wish , I tried gameDev once","Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit maiores minus vitae autem accusantium nam voluptatem in magnam voluptatum ab optio accusamus eum quos incidunt ullam, ad natus perspiciatis reiciendis.")
    console.log(`Breaking news: Our app is all ears at Port ${port}!`)
})