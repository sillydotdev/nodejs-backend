const express = require("express");
const {
  handleGenerateNewShortURL,
  handleRedirectToURL,
  handleGetAnalytics,
  // handleAllURLs,
} = require("../controllers/url.controller");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.get("/:shortId", handleRedirectToURL);
router.get("/analytics/:shortId", handleGetAnalytics);
// router.get("/test", handleAllURLs);

module.exports = router;
