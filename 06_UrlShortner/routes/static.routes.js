const express = require("express")
const router = express.Router();
const URL = require("../models/url.model")

router.get("/", async (req, res) => {
    const allUrls = await URL.find({})
    console.log(allUrls)
    return res.render("home", {
        urls: allUrls
    })
})

module.exports = router;