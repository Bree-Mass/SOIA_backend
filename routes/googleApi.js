const router = require("express").Router();
const { getPages } = require("../controllers/googleApi");

router.get("/api/google", getPages);

module.exports = router;
