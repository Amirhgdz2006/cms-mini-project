const { dynamicModels } = require('../utils/loadDynamicModels');


function getModel(type) {
  const model = dynamicModels[type];
  if (!model) throw new Error(`Model '${type}' not found. Make sure the ContentType exists and is loaded.`);
  return model;
}

// Create 
exports.createRecord = async function(req, res) {
  try {
    const { type } = req.params;
    const model = getModel(type);

    const data = { ...req.body };
    if (req.user && req.user._id) data.createdBy = req.user._id;

    const record = await model.create(data);
    res.status(201).json({ message: `${type} created successfully`, record });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read All 
exports.getAllRecords = async function(req, res) {
  try {
    const { type } = req.params;
    const model = getModel(type);

    const records = await model.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read One 
exports.getRecordById = async function(req, res) {
  try {
    const { type, id } = req.params;
    const model = getModel(type);

    const record = await model.findById(id);
    if (!record) return res.status(404).json({ message: 'Record not found' });

    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update 
exports.updateRecord = async function(req, res) {
  try {
    const { type, id } = req.params;
    const model = getModel(type);

    const updated = await model.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Record not found' });

    res.json({ message: `${type} updated successfully`, updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete 
exports.deleteRecord = async function(req, res) {
  try {
    const { type, id } = req.params;
    const model = getModel(type);

    const deleted = await model.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Record not found' });

    res.json({ message: `${type} deleted successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
