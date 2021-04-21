const express = require('express');
const author = require('../models/author');
const router = express.Router();
const Author = require('../models/author');

//Authors route 

//All Authors route 
router.get(('/'), async(req,res) => {
    let searchOptions = {};
    const name = req.query.name;
    if(name != null && name !== ''){
        searchOptions.name = new RegExp(name,'i');
    }

    //get all the authors from database
    try{
        const authors = await Author.find(searchOptions);
        res.render('authors/index', {authors: authors, searchOptions : req.query});
    }
    catch(erorr){
        res.redirect('/');
    }
});

//new Author route 
router.get(('/new'),(req,res) => {
    res.render('authors/new', {author: new Author()});
});

//Create Author Route 
router.post(('/'), async(req,res) => {
    const name = req.body.name;
    const author = new Author({
        name:name
    });
    try{
        const newAuthor = await author.save();
        // res.redirect(`/authors/${newAutor.id}`); //Redirect to the specific user 
        res.redirect('/authors');
    }
    catch(error){
        res.render('authors/new', {author: author, error: 'Error Creating Author'})
    }
});

module.exports = router;