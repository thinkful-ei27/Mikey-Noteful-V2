'use strict';

const knex = require('../knex');

// let searchTerm = 'gaga';
// knex
//   .select('notes.id', 'title', 'content')
//   .from('notes')
//   .modify(queryBuilder => {
//     if (searchTerm) {
//       queryBuilder.where('title', 'like', `%${searchTerm}%`);
//     }
//   })
//   .orderBy('notes.id')
//   .then(results => {
//     console.log(JSON.stringify(results, null, 2));
//   })
//   .catch(err => {
//     console.error(err);
//   });

let searchId = 2;

let updateObj = {
  title : 'feeding guinea pigs',
  content : 'they love kale'
};

let newObj = {
  title : 'hating birds',
  content : 'damn they are loud and annoying'
};

// knex  
//   .select ('notes.id', 'title', 'content')
//   .from ('notes')
//   .where('notes.id', `${searchId}`)
//   .then(([results]) => res.json(results))
//   .catch(err => {
//     console.error(err);
//   });

// knex
//   .select ('notes.id', 'title', 'content')
//   .from('notes')
//   .where('notes.id', `${searchId}`)
//   .update(updateObj, ['notes.id', 'title', 'content' ])
//   .then(([results]) => res.json(results))
//   .catch(err => {
//     console.error(err);
//   });

// knex('notes')
//   .insert(newObj, ['notes.id', 'title', 'content'])
//   .then(([results]) => res.json(results))
//   .catch(err => {
//     console.error(err);
//   });

// knex('notes')
//   .where('notes.id', `${id}`)
//   .del()
//   .catch(err => {
//     next(err);
//   });
