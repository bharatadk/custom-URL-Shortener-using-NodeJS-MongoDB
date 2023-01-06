import mongoose from "mongoose"
import {generateString} from "./controller.js"


const UrlSchema = new mongoose.Schema({
	longUrl:{
		type:String,
		required:true,
	},
	shortUrl:{
		type:String,
		required:true,
	},
	clicks:{
		type:Number,
		default:0,
		required:true
	}
})

const shortUrlModel = mongoose.model("Url",UrlSchema)

export {shortUrlModel}