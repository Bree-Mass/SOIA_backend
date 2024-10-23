const router = require("express").Router();
const { getPosts } = require("../controllers/patreonApi");

router.get("/api/patreon", getPosts);

module.exports = router;
