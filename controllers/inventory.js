// list
function list(req, res) {
  res.json({ message: 'GET inventory', data: [] });
}

// find
function find(req, res) {
  res.json({ message: 'GET inventory by id', data: { id: req.params.id } });
}

// create
function create(req, res) {
  res.status(201).json({ message: 'Inventory created', data: req.body });
}

// update
function update(req, res) {
  res.json({ message: 'Inventory updated', data: { id: req.params.id, ...req.body } });
}

// destroy
function destroy(req, res) {
  res.json({ message: 'Inventory deleted', data: { id: req.params.id } });
}

module.exports = { list, find, create, update, destroy };
