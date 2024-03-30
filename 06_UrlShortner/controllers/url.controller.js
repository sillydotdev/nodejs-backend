// const { nanoid } = require("nanoid");
const URL = require("../models/url.model");

// generate a short id for url
async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required..." });
  const { nanoid } = await import("nanoid");
  const shortID = nanoid(8);

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
  res.render("home", {
    id: shortID
  })
  // res.json({ id: shortID });
}

// Redirect to the url using shortId
async function handleRedirectToURL(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId: shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
  );
  if (!entry || !entry.redirectURL) {
    return res.status(404).send("URL not found");
  }
  return res.redirect(entry.redirectURL);
}

// Get analytics using shortId
async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClick: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleRedirectToURL,
  handleGetAnalytics,
};
