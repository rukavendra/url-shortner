const express = require('express')
const urlRoute = require('./routes/url')
const { connectToDB } = require('./connection')
const URL = require('./models/url')


const app = express()
const port = 8001


connectToDB('mongodb://127.0.0.1:27017/url-shortner').then(()=>console.log("Connection Establish"))


app.use(express.json())
app.use('url',urlRoute)
app.get('/:id',async (req,res)=>{
    const shortId = req.params.id
    const entry = await URL.findOneAndUpdate({
        shortId
    },{
        $push:{
            visitHistory: {
                timestamp:Date.now()
            }
        }
    })
    res.redirect(entry.redirectURL)
})
app.listen(port, ()=> console.log("Server Started at PORT:",port))