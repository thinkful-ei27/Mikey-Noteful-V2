'use strict';

const express = require('express');

// Create an router instance (aka "mini-app")
const router = express.Router();
const knex = require('../knex');

// TEMP: Simple In-Memory Database
// const data = require('../db/notes');
// const simDB = require('../db/simDB');
// const notes = simDB.initialize(data);

// Get All (and search by query)
router.get('/', (req, res, next) => {
  const { searchTerm } = req.query;

  // notes.filter(searchTerm)
  //   .then(list => {
  //     res.json(list);
  //   })
  //   .catch(err => {
  //     next(err);
  //   });
  knex
    .select('notes.id', 'title', 'content')
    .from('notes')
    .modify(queryBuilder => {
      if (searchTerm) {
        queryBuilder.where('title', 'like', `%${searchTerm}%`);
      }
    })
    .orderBy('notes.id')
    .then(results => {
      res.json(results);
    })
    .catch(err => {
      next(err);
    });

});

// Get a single item
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  knex  
    .select ('notes.id', 'title', 'content')
    .from ('notes')
    .where('notes.id', `${id}`)
    .then(([results]) => {
      if(results){
        res.json(results);}
      else next()
        .catch(err => {
          next(err);
        });
    });
});

// Put update an item
router.put('/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateableFields = ['title', 'content'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  /***** Never trust users - validate input *****/
  if (!updateObj.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }


  knex  
    .select ('notes.id', 'title', 'content')
    .from ('notes')
    .where('notes.id', `${id}`)
    .update(updateObj, ['notes.id', 'title', 'content' ])
    .then(([results]) => {
      if(results) {res.json(results);
      } else {
        next(); }
    })
    .catch(err => {
      next(err);
    });

});

// Post (insert) an item
router.post('/', (req, res, next) => {
  const { title, content } = req.body;

  const newItem = { title, content };
  /***** Never trust users - validate input *****/
  if (!newItem.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  knex('notes')
    .insert(newItem, ['notes.id', 'title', 'content'])
    .then(([results]) => {
      if(results){res.location(`http://${req.headers.host}/notes/${results.id}`)
        .status(201).json(results);}
    })
    .catch(err => {
      next(err);
    });
});

  

// Delete an item
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  knex('notes')
    .where('notes.id', `${id}`)
    .del()
    .catch(err => {
      next(err);
    });
  res.status(204).end();
});

module.exports = router;
