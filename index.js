import express from "express"
import mongoose from "mongoose"
import {
    generateString
} from "./controller.js"
import {
    shortUrlModel
} from "./model.js"


const app = express()
app.set("view engine", "ejs")
app.use(express.urlencoded({
    extended: false
}))
mongoose.set("strictQuery", false)
mongoose.connect("mongodb://127.0.0.1:27017/URLS", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

let fetchData;
let duplicate;
duplicate= "";

const fetchAPI = async () => {
    const allShortUrls = await shortUrlModel.find()
    return allShortUrls

}

app.get("/", async (req, res) => {
    fetchData = await fetchAPI()
    res.render("home", {
        fetchData,
        duplicate
    })
})

app.post("/submit", async (req, res) => {
    const isDuplicate = await generateString(req.body.longURL, req.body.customShortURL)
	if(isDuplicate=="yes"){
		duplicate = " !!! Your shortURL is already used. Please select another."
	}else{
		duplicate=""
	}
    
	res.redirect("/")
})

app.get("/:shortUrls", async (req, res) => {
    const shortUrlParam = await shortUrlModel.findOne({
        shortUrl: req.params.shortUrls
    })
    if (shortUrlParam == null) return res.sendStatus(404)
    shortUrlParam.clicks++
    shortUrlParam.save()
    res.redirect(shortUrlParam.longUrl)
})

//mongoose connection checker Initial

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"))
db.once("open", function() {
    console.log("Connected successfully");
});
app.listen(5000, (req, res) => {
    console.log('listening to port 5000')
})