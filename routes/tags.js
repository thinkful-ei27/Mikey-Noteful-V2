'use strict';
const express = require('express');
// Create an router instance (aka "mini-app")
const router = express.Router();
const knex = require('../knex');


router.get('/' , (req, res, next) => {
  knex.select('id', 'name' )
    .from('tags')
    .then( results => res.json(results))
    .catch(err => next(err));
});


router.get('/:id', (req, res, next)=> {
  const id =req.params.id;

  knex  
    .select ('tags.id', 'name' )
    .from ('tags')
    .where('tags.id', `${id}`)
    .then(([results]) => {
      if(results){
        res.json(results);}
      else next()
        .catch(err => {
          next(err);
        });
    });
});

/* ========== POST/CREATE ITEM ========== */
router.post('/', (req, res, next) => {
  const { name } = req.body;

  /***** Never trust users. Validate input *****/
  if (!name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  const newItem = { name };

  knex.insert(newItem)
    .into('tags')
    .returning(['id', 'name'])
    .then((results) => {
      // Uses Array index solution to get first item in results array
      const result = results[0];
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => next(err));
});

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
    .select ('tags.id', 'name')
    .from ('tags')
    .where('tags.id', `${id}`)
    .update(updateObj, ['tags.id', 'name'])
    .then(([results]) => {
      if(results) {res.json(results);
      } else {
        next(); }
    })
    .catch(err => {
      next(err);
    });

});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  knex('tags')
    .where('tags.id', `${id}`)
    .del()
    .catch(err => {
      next(err);
    });
  res.status(204).end();
});

module.exports = router;