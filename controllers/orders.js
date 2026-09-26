// list
function list(req, res) {
  res.json({ message: 'GET orders', data: [] });
}

// find
function find(req, res) {
  res.json({ message: 'GET order by id', data: { id: req.params.id } });
}

// create
function create(req, res) {
  res.status(201).json({ message: 'Order created', data: req.body });
}

// update
function update(req, res) {
  res.json({ message: 'Order updated', data: { id: req.params.id, ...req.body } });
}

// destroy
function destroy(req, res) {
  res.json({ message: 'Order deleted', data: { id: req.params.id } });
}

module.exports = { list, find, create, update, destroy };
