const express = require("express");
const router = express.Router();

router.get("/notes/add", (req, res) => {

    res.render("notes/new-note");

});

router.post("/notes/new-note", (req, res) => {

    const { title, description } = req.body;
    const errors = [];

    if(!title){
        errors.push({text: "Please write a Title"});
    }

    if(!description){
        errors.push({text: "Please write a Description"});
    }

    if(errors.length > 0){
        res.render("notes/new-note", {
            errors,
            title,
            description
        });
    }else{

        res.json({msg: "Ok"});

    }

    

});

router.get("/notes", (req, res) => {

    res.send("Notas desde la bd");

});

module.exports = router;