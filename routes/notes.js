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
  const { folderId } = req.query;

  knex.select('notes.id', 'title', 'content', 'folders.id as folderId', 'folders.name as folderName')
    .from('notes')
    .leftJoin('folders', 'notes.folder_id', 'folders.id')
    .modify(function (queryBuilder) {
      if (searchTerm) {
        queryBuilder.where('title', 'like', `%${searchTerm}%`);
      }
    })
    .modify(function (queryBuilder) {
      if (folderId) {
        queryBuilder.where('folder_id', folderId);
      }
    })
    .orderBy('notes.id')
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));

});

// Get a single item
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  knex  
    .select ('notes.id', 'title', 'content', 'folders.id as folderId', 'folders.name as folderName')
    .from ('notes')
    .leftJoin('folders', 'notes.folder_id', 'folders.id')
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
  const updateableFields = ['title', 'content' , 'folderId'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
    if(field ==='folderId'){
      field = 'folder_id';
    }
  });

  updateObj['folder_id '] = updateObj['folderId'];
  delete updateObj['folderId'];

  /***** Never trust users - validate input *****/
  if (!updateObj.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }
  console.log('updateobj' ,updateObj);

  let noteId; 

  knex('notes')
    .where('notes.id', `${id}`)
    .update(updateObj)
    .returning('id')
    .then(([id]) =>{
      noteId = id;
      return knex.select('notes.id', 'title', 'content', 'folder_id as folderId', 'folders.name as folderName')
        .from('notes')
        .leftJoin('folders', 'notes.folder_id', 'folders.id')
        .where('notes.id', noteId);
    })
    .then(([result]) => {
      if(result) {res.json(result);
      } else {
        next(); }
    })
    .catch(err => {
      next(err);
    });

});

// Post (insert) an item
router.post('/', (req, res, next) => {
  const { title, content, folderId } = req.body;

  const newItem = { 
    title: title,
    content: content,
    folder_id: folderId
  };
  /***** Never trust users - validate input *****/
  if (!newItem.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }
  let noteId; 

  knex
    .insert(newItem)
    .into('notes')
    .returning('id')
    .then(([id]) => {
      noteId = id;
      return knex.select('notes.id', 'title', 'content', 'folder_id as folderId', 'folders.name as folderName')
        .from('notes')
        .leftJoin('folders', 'notes.folder_id', 'folders.id')
        .where('notes.id', noteId);
    })
    .then(([result]) => {
      if(result){res.location(`http://${req.headers.host}/notes/${result}`)
        .status(201).json(result);}
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
