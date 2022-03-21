require('dotenv').config();

// const https = require('https')
const createError = require('http-errors');

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const fs = require('fs');


// initialize body-parser with json
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


const queue = [];

const users = {

  ally: {
    password: 'dynoqueen',
  },
  shawn: {
    password: 'idontpayforsofie',
  },
  seb: {
    password: 'blicky',
  },
  julian: {
    password: 'cami',
  },
  scott:{ 
    password: 'arianna',
  },
  pete: {
    password: 'beater',
  },
  farrah: {
    password: 'rug',
  },
  james: {
    password: 'dyno',
  },
  julie:{ 
    password: 'superwoman',
  },
  tim: {
    password: 'ravens',
  },
  amie: {
    password: 'tiktok',
  },
  anna: {
    password: 'thevoice',
  },
  aubrey: {
    password: 'panda',
  },
  natalie: {
    password: 'shesips',
  },
  tyler: {
    password: 'eldenring',
  },
  zach: {
    password: 'entei',
  },
  noah: {
    password: 'heyman',
  },
  sophia: {
    password: 'twitch',
  },
  lauren: {
    password: 'climb',
  },
  jeff: {
    password: 'nickelback',
  },
  rachel: {
    password: 'cactus',
  },
  nick: {
    password: 'largepenis',
  },
  gayle: {
    password: 'verycool',
  },
  nickgee: {
    password: 'autism',
  }

}


var multer  = require('multer')


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })

app.use('/uploads', express.static('uploads'));

app.enable('trust proxy')
app.use((req, res, next) => {
    req.secure ? next() : res.redirect('https://' + req.headers.host + req.url)
})


app.get("/login", (req, res) => {
  res.render("login");
});


app.post('/login', (req,res) => {
  console.log(req.body);
  
  if(users[req.body.username] && users[req.body.username.toLowerCase()].password === req.body.password.toLowerCase()){
    console.log("correct")
    res.json({status:'correct'})
  }
  else{
    console.log("wrong")
    res.json({status:'incrorrect'})
  }
});

app.get("/", (req, res) => {
  res.render("receipt",{status:'initial'});
});


app.post(
  "/upload_text", (req, res) => {
    try{

      queue.push({
        type:'text',
        name: req.body.username,
        content:`${req.body.text}`,
      })

      console.log(queue)

      res.json({status:'success'});
    }catch(err){
      console.log(err);
      res.json({status:'failed'});
    }
      
});

app.post(
  "/get_jobs", (req, res) => {

    res.json(queue);
    while(queue.length > 0) {
      queue.pop();
    }
      
});



app.post(
  "/upload",
  upload.single("file"), (req, res) => {
    try{
      const tempPath = req.file.path;
      const targetPath = path.join(__dirname, `./uploads/${req.file.originalname}`);
      let extention = req.file.originalname.split('.').pop();

      if(extention === 'MOV' || extention === 'mp4' || extention === 'mov'){
        fs.unlink(`./uploads/${req.file.originalname}`,function(err){
          if(err){
            return console.log(err);
          }
            console.log('file deleted successfully');
            res.render('receipt',{status:'failed'});
            return
        });  
      }

      queue.push({
        type:'image',
        name: req.body.username,
        content:`https://shielded-crag-36267.herokuapp.com/image/${req.file.originalname}`
      })
      console.log('got moo pic')
      res.render('receipt',{status:'success'});
    }catch(err){
      console.log(err);
      res.render('receipt',{status:'failed'});
    }
      
});

app.get( "/delete/:name", (req, res) => {
    fs.stat(`./uploads/${req.params.name}`, function (err, stats) {
      if (err) {
        res.send('does not exist');
        return console.error(err);
      }
   
      fs.unlink(`./uploads/${req.params.name}`,function(err){
        if(err){
          res.send('failed');
          return console.log(err);
        }
          console.log('file deleted successfully');
          res.send("success");
          return
      });  
   });
});

app.get("/image/:name", (req, res) => {
  try{
    res.sendFile(path.join(__dirname, `./uploads/${req.params.name}`));
  }catch(err){
    res.sendCode(500)
  }
});


app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = err;
  res.status(err.status || 500);
  res.render('error', {msg: ''});
  console.log(err);
});



app.listen(port, () => {console.log('Server is running on port: ' + port);});
