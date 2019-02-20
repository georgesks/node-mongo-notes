const express = require("express");
const router = express.Router();

router.get("/notes", (req, res) => {

    res.send("Notas desde la bd");

});

module.exports = router;