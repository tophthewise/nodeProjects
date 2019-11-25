//this sets up the server for our application 
//backend/server.js
//mongodb management
const mongoose = require('mongoose');
//get and post requests management
const express = require('express');
//middleware for express
var cors = require('cors');
//more middleware
const bodyParser = require("body-parser");
//logs issues on the backend
const logger = require('morgan');
const Data = require('./data');
//blog post
const PostData = require('./postData');
//port where app will be served 
const API_PORT = 3001;
const app = express();
app.use(cors());
const router= express.Router();
//This is our mongoDb Database
const dbRoute = 'mongodb+srv://testUser1:12345@cluster0-iez8h.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(dbRoute,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false});

let db = mongoose.connection;

db.once('open',()=> console.log("Connected to the database"));
db.on('error',console.error.bind(console, "MongoDb Connection Error"));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(logger('dev'));

//This is the R in CRUD. The Read Method
router.get('/getData',(req,res) => {
	Data.find((err,data) => {
		if(err) return res.json({success:false, error:err});
		return res.json({success:true,data:data});
	});
	
});

//this is the Update method. The U in CRUD
router.post('/updateData',(req,res) => {
	const {id,update} = req.body;
	Data.findByIdAndUpdate(id,update,(err) => {
		if(err) return res.json({success:false,error:err});
		return res.json({success:true});
	});
});

//The delete method. The D in CRUD.
router.delete('/deleteData',(req,res) =>{
	const {id} = req.body;
	Data.findByIdAndDelete(id,(err) =>{
		if(err) return res.send(err);
		return res.json({success:true});
	});
});
//This is the Create Method. The C in CRUD
router.post('/putData',(req,res) => {
	let data = new Data();
	const {id,message} = req.body;
	if((!id  && id !==0) || !message){
		return res.json({
			success:false,
			error:'Invalid Inputs',
		});
	}
	data.message = message;
	data.id = id;
	data.save((err) =>{
		if(err) return res.json({success:false, error:err});
		return res.json({success:true});
	});
});

router.post('/newPost',(req,res) =>{
	let postdata = new PostData();
	const{id,name,post} = req.body;
	if((!id && id !==0) || !name ||!post){
		return res.json({
			success:false,
			error: 'Invalid Inputs'
		});
	}
		postdata.id = id;
		postdata.name = name;
		postdata.post = post;
		postdata.save((err)=>{
			if(err) return res.json({success:false,error:err});
			return res.json({success:true,})
		});
});
router.get('/getPost',(req,res)=>{
	PostData.find((err,data) =>{
		if(err) return res.json({success:false,error:err});
		return res.json({success:true, data:data});
	});
});
//this is our append api router to use API's for HTTP requests
app.use('/api',router);
//launce our backend into a port
app.listen(API_PORT,() => console.log('LISTENING ON PORT ${API_PORT}'))
