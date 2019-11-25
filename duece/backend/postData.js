const mongoose = require('mongoose');
const post_schema = mongoose.Schema;

const Post = new post_schema(
{
	id: Number,
	name: String,
	post: String
},{timestamps:true}
)
module.exports = mongoose.model("Post",Post);