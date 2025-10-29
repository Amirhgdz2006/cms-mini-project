const mongoose = require('mongoose');
const ContentType = require('../models/contentTypeModel');
const { dynamicModels } = require('../utils/loadDynamicModels');

function createDynamicSchema(fields) {
  const schemaDefinition = {};
  for (const field of fields) {
    let fieldType;
    switch (field.type) {
      case 'string': fieldType = String; break;
      case 'number': fieldType = Number; break;
      case 'boolean': fieldType = Boolean; break;
      case 'date': fieldType = Date; break;
      case 'text': fieldType = String; break;
      default: fieldType = String;
    }
    schemaDefinition[field.name] = {
      type: fieldType,
      required: field.required || false,
      unique: field.unique || false
    };
  }
  schemaDefinition.createdAt = { type: Date, default: Date.now };
  return new mongoose.Schema(schemaDefinition);
}

// Create ContentType
exports.createContentType = async function(req, res) {
  try {
    const { name, fields } = req.body;

    if (dynamicModels[name] || mongoose.connection.models[name]) {
      return res.status(400).json({ message: 'Content type already exists' });
    }

    const contentType = await ContentType.create({ name, fields });

    const schema = createDynamicSchema(fields);
    dynamicModels[name] = mongoose.model(name, schema);

    res.status(201).json({ message: `${name} model created successfully`, contentType });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update ContentType
exports.updateContentType = async function(req, res) {
  try {
    const { id } = req.params;
    const { name, fields } = req.body;

    const existing = await ContentType.findById(id);
    if (!existing) return res.status(404).json({ message: 'Content type not found' });

    const oldName = existing.name;

    if (name && mongoose.connection.models[name] && name !== oldName) {
      return res.status(400).json({ message: 'Another content type with this name already exists' });
    }

    if (mongoose.connection.models[oldName]) delete mongoose.connection.models[oldName];
    if (dynamicModels[oldName]) delete dynamicModels[oldName];

    existing.name = name || existing.name;
    existing.fields = fields || existing.fields;
    await existing.save();

    const schema = createDynamicSchema(existing.fields);
    dynamicModels[existing.name] = mongoose.model(existing.name, schema);

    res.json({ message: `${existing.name} updated successfully`, updated: existing });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete ContentType
exports.deleteContentType = async function(req, res) {
  try {
    const { id } = req.params;
    const contentType = await ContentType.findByIdAndDelete(id);
    if (!contentType) return res.status(404).json({ message: 'Content type not found' });

    if (mongoose.connection.models[contentType.name]) delete mongoose.connection.models[contentType.name];
    if (dynamicModels[contentType.name]) delete dynamicModels[contentType.name];

    res.json({ message: `${contentType.name} deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read All ContentTypes
exports.getAllContentTypes = async function(req, res) {
  try {
    const contentTypes = await ContentType.find();
    res.json(contentTypes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
