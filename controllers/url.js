const URL = require('../models/url')
// const {nanoid} = require('nanoid')
const shortid = require('shortid')

async function handleCreateShortUrl(req,res){
    const body = req.body
    // console.log(req.body)
    if(!body.url) return res.status(400).json({error: 'invalid url'})
    const shortID = shortid()
    const result= await URL.create({
        shortId:  shortID,
        redirectURL: body.url,
        visitHistory: [],
    })
    console.log(result)
    return res.status(201).json({id: shortID})
}


module.exports = {handleCreateShortUrl}