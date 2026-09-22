
// create
function create(req, res, next) {
  res.status(201).json({message:'User created', data: {}});
}

// list
function list(req, res, next) {
  res.json({message:'list users', data: []});
}

// find
function find(req, res, next) {
  res.json({message:'user by id', data: {}});
}

// update
function update(req, res, next) {
  res.send('update user by id');
}

// destroy
function destroy(req, res, next) {
  res.send('delete user by id');
}


module.exports = {create, list, find, update, destroy}