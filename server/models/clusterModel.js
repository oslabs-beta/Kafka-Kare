const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clusterSchema = new Schema({
  // Required
  name: {
    type: String,
    required: true,
  },
  hostnameAndPort: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true
  },
  // Not required
  dateAdded: {
    type: Date,
    default: Date.now
  },
  favorite: {
    type: Boolean,
    default: false
  }
});

const Cluster = mongoose.model("Cluster", clusterSchema);

module.exports = Cluster;
