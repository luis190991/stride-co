// list
function list(req, res) {
  res.json({ message: 'GET products', data: [] });
}

// find
function find(req, res) {
  res.json({ message: 'GET product by id', data: { id: req.params.id } });
}

// create
function create(req, res) {
  res.status(201).json({ message: 'Product created', data: req.body });
}

// update
function update(req, res) {
  res.json({ message: 'Product updated', data: { id: req.params.id, ...req.body } });
}

// destroy
function destroy(req, res) {
  res.json({ message: 'Product deleted', data: { id: req.params.id } });
}

module.exports = { list, find, create, update, destroy };
