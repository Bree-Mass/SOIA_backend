const router = require("express").Router();
const patreonApiRoutes = require("./patreonApi");
const googleApiRoutes = require("./googleApi");
const userRoutes = require("./users");
const commentRoutes = require("./comments");

const { NotFoundError } = require("../utils/errors");

router.use("/", patreonApiRoutes);
router.use("/", googleApiRoutes);
router.use("/", userRoutes);
router.use("/", commentRoutes);
router.use((req, res, next) => {
  next(new NotFoundError("Resource was not found"));
});

module.exports = router;
