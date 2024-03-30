const express = require("express");
const {
  handleGenerateNewShortURL,
  handleRedirectToURL,
  handleGetAnalytics,
} = require("../controllers/url.controller");

const router = express.Router();

router.post("/", handleGenerateNewShortURL);
router.get("/:shortId", handleRedirectToURL);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
