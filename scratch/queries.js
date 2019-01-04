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



// const notes = [
//   { 'id': 1000, 'title': '5 life lessons...', 'tagId': 1, 'tagName': 'foo' },
//   { 'id': 1005, 'title': '100 ways a cat...', 'tagId': 2, 'tagName': 'bar' },
//   { 'id': 1005, 'title': '100 ways a cat...', 'tagId': 1, 'tagName': 'foo' },
//   { 'id': 1007, 'title': '17 things dogs...', 'tagId': 3, 'tagName': 'baz' }
// ];

/* ========== HYDRATE ========== */

// const hydrated = {};

// notes.forEach((note) => {
//   if (!(note.id in hydrated)) {
//     hydrated[note.id] = {
//       id: note.id,
//       title: note.title,
//       tags: []
//     };
//   }
// });

// notes.forEach((note) => {
//   hydrated[note.id].tags.push({
//     id: note.tagId,
//     name: note.tagName
//   });
// });
// const results = [];

// console.log(JSON.stringify(hydrated, null, 2));

// Object.keys(hydrated).forEach((id) => {
//   results.push(hydrated[id]);
// });


// console.log(JSON.stringify(results, null, 2));