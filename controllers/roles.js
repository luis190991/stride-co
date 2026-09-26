// list
function list(req, res) {
  res.json({ message: 'GET roles', data: [] });
}

// find
function find(req, res) {
  res.json({ message: 'GET role by id', data: { id: req.params.id } });
}

// create
function create(req, res) {
  res.status(201).json({ message: 'Role created', data: req.body });
}

// update
function update(req, res) {
  res.json({ message: 'Role updated', data: { id: req.params.id, ...req.body } });
}

// destroy
function destroy(req, res) {
  res.json({ message: 'Role deleted', data: { id: req.params.id } });
}

module.exports = { list, find, create, update, destroy };
