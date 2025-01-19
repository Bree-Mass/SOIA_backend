const router = require("express").Router();
const { getPosts } = require("../controllers/patreonApi");

router.get("/patreon/api/patreon", getPosts);

module.exports = router;
