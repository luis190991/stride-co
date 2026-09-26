// list
function list(req, res) {
  res.json({ message: 'GET permissions', data: [] });
}

// find
function find(req, res) {
  res.json({ message: 'GET permission by id', data: { id: req.params.id } });
}

// create
function create(req, res) {
  res.status(201).json({ message: 'Permission created', data: req.body });
}

// update
function update(req, res) {
  res.json({ message: 'Permission updated', data: { id: req.params.id, ...req.body } });
}

// destroy
function destroy(req, res) {
  res.json({ message: 'Permission deleted', data: { id: req.params.id } });
}

module.exports = { list, find, create, update, destroy };
