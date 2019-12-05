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
const postData = require('./postData');
//port where app will be served 
const API_PORT = 3001;
const app = express();
app.use(cors());
//this is our router object which basically acts like a big controller
const router= express.Router();
const postRouter = express.Router();
//This is our mongoDb Database API
const dbRoute = 'mongodb+srv://testUser1:12345@cluster0-iez8h.mongodb.net/test?retryWrites=true&w=majority';
//ping the api to grab the db connection
mongoose.connect(dbRoute,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false});
//set that variable 
let db = mongoose.connection;
// one time show us on the console that we connected to the DB
db.once('open',()=> console.log("Connected to the database"));
//if something went wrong... tell us what the error was with the connection
db.on('error',console.error.bind(console, "MongoDb Connection Error"));
// body parser does somethng with api's
app.use(bodyParser.urlencoded({extended:false}));
//converts our response body into json
app.use(bodyParser.json());
// the logger gives us a color on the terminal to define if the request was good, bad, or something went wrong
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
	/*this will tell us if the ID's match.. 
	dont use a tripple equals for it will check types and the types dont match
	... well not now anyways 
	*/
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



//create new post 
postRouter.post('/newPost',(req,res) =>{
	let postdata = new PostData();
	const{id,name,post} = req.body;
	/*this will tell us if the ID's match and the 
	dont use a tripple equals for it will check types and the types dont match
	... well  not now anyways*/
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
//read the posts 
postRouter.get('/getPost',(req,res)=>{
	postData.find((err,data) =>{
		if(err) return res.json({success:false,error:err});
		return res.json({success:true, data:data});
	});
});
//update posts 
postRouter.post('/putPost',(req,res)=>{
	const {id,name,post} = req.body
	postData.findByIdAndUpdate(id,update,(err)=>{
		if(err) return res.json({success:false, error:err});
		return res.json({success:true,})
	});
});
//delete the posts
postRouter.delete('/deletePost',(req,res)=>{
	const{id}= req.body
	postData.findByIdAndDelete(id,(err)=>{
		if(err) return res.json({success: false, error: err});
		return res.json({success:true,})

	});
});
postRouter.post('/updatePost'(req,res)=>{
	const{id,update} = req.body 
	postData.findByIdAndUpdate(id,update,(err)=>{
		if(err) return res.json({success:false, error:err})
			return res.json({success:true})
	});
});

//this is our append api router to use API's for HTTP requests
app.use('/api',router);
app.use('/posts',postRouter);
//launce our backend into a port
app.listen(API_PORT,() => console.log('LISTENING ON PORT ${API_PORT}'))
