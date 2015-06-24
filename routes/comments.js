var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  console.log("user!");
});

router.get('/:username/nopes/:id/comments', function(req, res) {
  console.log("We got it");
});

router.post('/:username/nopes/:id/comments', function(req, res) {
  console.log("We posted it");
});

router.put('/:username/nopes/:post_id/comments/:id', function(req, res) {
  console.log("We put it");
});

router.delete('/:username/nopes/:post_id/comments/:id', function(req, res) {
  console.log("We deleted it");
});




module.exports = router;
