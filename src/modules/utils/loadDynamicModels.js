const mongoose = require('mongoose');
const ContentType = require('../models/contentTypeModel');

const dynamicModels = {};

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

async function loadDynamicModels() {
  try {
    const contentTypes = await ContentType.find();
    for (const type of contentTypes) {
      const schema = createDynamicSchema(type.fields);
      const model = mongoose.model(type.name, schema);
      dynamicModels[type.name] = model;
      console.log(`Loaded dynamic model: ${type.name}`);
    }
  } catch (err) {
    console.error('Failed to load dynamic models:', err.message);
  }
}

module.exports = { dynamicModels, loadDynamicModels };
