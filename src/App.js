const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast =require("./units/forecast")

const app = express();

//define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templetes/views");
const particalPath = path.join(__dirname, "../templetes/partical");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(particalPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather",
    name: "umair",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "this is about page",
    name: "umair",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    message: "This is my Help message for testing",
    title: "help",
    name: "umair",
  });
});

app.get("/weather", (req, res) => {
  if(!req.query.address){
    return res.send({
     error:"You must provide an address!"
    })
  }

  forecast(req.query.address, (error, data) => {
   
    if(error){
      return res.send({error})
    }
      res.send({forecast:data[0],location:`${data[1]?.name}, ${data[1]?.region}, ${data[1]?.country}`,address:req.query.address})
    
  });
 
});

app.get("/help/*",(req,res)=>{
  res.render("404",{
    title:"404",
    name:"umair",
    message:"Help artical not found."
  })

app.get("*",(req,res)=>{
  res.render("404",{
    title:"404",
    name:"umair",
  message:"Page not Found"
  })
})

})
app.listen(3000, () => {
  console.log("server is up on port 3000");
});
