const express = require("express");
const router = express.Router();

const Note = require("../models/Note");

router.get("/notes/add", (req, res) => {

    res.render("notes/new-note");

});

router.post("/notes/new-note", async (req, res) => {

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

        const NewNote = new Note({title, description});
        await NewNote.save();
        req.flash("success_msg", "ADD Note successfully.");
        
        res.redirect("/notes");

    }

    

});

router.get("/notes", async (req, res) => {

    const notes = await Note.find().sort({date: "desc"});    

    res.render("notes/all-notes", {
        notes
    });

});

router.get("/notes/edit/:id", async (req, res) => {

    const note = await Note.findById(req.params.id);

    res.render("notes/edit-note", {note});

});

router.put("/notes/edit-note/:id", async (req, res) => {

    const { title, description } = req.body;

    const note = await Note.findByIdAndUpdate(req.params.id, { title, description });

    console.log(note);

    req.flash("success_msg", "Update Note successfully.");

    res.redirect("/notes");

});

router.delete("/notes/delete/:id", async (req, res) => {

    await Note.findByIdAndDelete(req.params.id);

    req.flash("success_msg", "Delete Note successfully.");

    res.redirect("/notes");

});

module.exports = router;