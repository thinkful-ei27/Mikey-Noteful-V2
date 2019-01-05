'use strict';
const express = require('express');
// Create an router instance (aka "mini-app")
const router = express.Router();
const knex = require('../knex');

router.get('/', (req, res, next) => {
  knex.select('id', 'name')
    .from('folders')
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  knex  
    .select ('folders.id', 'name' )
    .from ('folders')
    .where('folders.id', `${id}`)
    .then(([results]) => {
      if(results){
        res.json(results);}
      else next()
        .catch(err => {
          next(err);
        });
    });
});

// Put update an folder, not used in this example
router.put('/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateableFields = ['name'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  /***** Never trust users - validate input *****/
  if (!updateObj.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }


  knex  
    .select ('folders.id', 'name')
    .from ('folders')
    .where('folders.id', `${id}`)
    .update(updateObj, ['folders.id', 'name'])
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
  const { name } = req.body;

  const newItem = { name };
  /***** Never trust users - validate input *****/
  if (!newItem.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  knex('folders')
    .insert(newItem, ['folders.id', 'name'])
    .then(([results]) => {
      if(results){res.location(`http://${req.headers.host}/folders/${results.id}`)
        .status(201).json(results);}
    })
    .catch(err => {
      next(err);
    });
});

  

// Delete an item
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  knex('folders')
    .where('folders.id', `${id}`)
    .del()
    .catch(err => {
      next(err);
    });
  res.status(204).end();
});


module.exports = router;