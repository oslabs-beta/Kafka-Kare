const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get('/:clusterId', async (req, res) => {
  const { clusterId } = req.params;
  const prometheusQueryUrl = '';

  try {
    const response = await axios.get(prometheusQueryUrl);
    const data = response.data;
    return res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching metrics from Prometheus: ', err);
    return res.status(500).send('Failed to fetch metrics');
  }
})