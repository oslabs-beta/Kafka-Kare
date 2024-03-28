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
  ownerId: {
    type: String,
    required: true
  },
  // Not required
  dateAdded: {
    type: Date,
    default: Date.now
  },
  dateLastVisited: {
    type: Date,
    default: Date.now
  },
  favorite: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: 'online'
  },
  numberOfBrokers: {
    type: Number,
    default: 1
  },
  grafanaUrl: {
    type: String,
    default: ''
  },
});

const Cluster = mongoose.model("Cluster", clusterSchema);

module.exports = Cluster;
