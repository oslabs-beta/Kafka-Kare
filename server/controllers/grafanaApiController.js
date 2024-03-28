const axios = require("axios");
const User = require("../models/userModel.js");
const Cluster = require("../models/clusterModel.js");
const serviceAccountToken = process.env.GRAFANA_SERVICE_ACCOUNT_TOKEN;

const grafanaApiController = {};

/* ------------------ ADD PROMETHEUS DATA SOURCE TO GRAFANA ----------------- */
grafanaApiController.addDatasource = async (req, res, next) => {
  console.log("In grafanaApiController.addDatasource"); // testing
  console.log("req.body contains: ", req.body);
  const { name, url } = req.body; // Destructure from req.body
  const { userId } = res.locals; // Destructure from prior middleware

  // Create object to use as API call payload
  const datasourceConfig = {
    name: `Prometheus-${name}${userId}`,
    type: "prometheus",
    url: `${url}`,
    access: "proxy",
  };
  console.log("datasourceConfig: ", datasourceConfig);

  // Use for API call
  const requestHeaders = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${serviceAccountToken}`,
    },
  };

  // Send request to Grafana API to add a datasource
  try {
    const response = await axios.post(
      "http://grafana:3000/api/datasources",
      datasourceConfig,
      requestHeaders
    );

    // Persist datasource name
    res.locals.datasourceName = datasourceConfig.name;
    res.locals.url = datasourceConfig.url;
    res.locals.name = name;
    console.log("Datasource connected successfully");
    return next();
  } catch (err) {
    return next({
      log: `grafanaApiController.addDatasource: ERROR ${err}`,
      status: 500,
      message: { err: "Error occurred in grafanaApiController.addDatasource." },
    });
  }
};

/* ----------------- CREATE DASHBOARD CONNECTED TO DATA SOURCE ----------------- */
grafanaApiController.createDashboard = async (req, res, next) => {
  console.log("In grafanaApiController.createDashboard"); // testing
  const { userId, username, datasourceName, url } = res.locals; // Destructure from prior middleware

  console.log(`Creating dashboard for <${username}>`);
  console.log(`Datasource for dashboard: <${datasourceName}>`);

  // // Template for new dashboard
  const newDashboardData = {
    dashboard: {
      id: null,
      refresh: "5s", // Refresh every 5 seconds
      title: `${username}-${url}-Dashboard`,
      time: {
        from: "now-5m",
        to: "now",
      },  
//================================================================================================
"panels": [
  {
    "collapsed": true,
    "gridPos": {
      "h": 1,
      "w": 24,
      "x": 0,
      "y": 0
    },
    "id": 25,
    "panels": [
      {
        "datasource": `${datasourceName}`,
        "description": "Total number of times consumer groups have had to rebalance partitions. This can indicate instability in the cluster or consumer groups.",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisBorderShow": false,
              "axisCenteredZero": false,
              "axisColorMode": "text",
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "insertNulls": false,
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            }
          },
          "overrides": []
        },
        "gridPos": {
          "h": 8,
          "w": 12,
          "x": 0,
          "y": 1
        },
        "id": 2,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom",
            "showLegend": true
          },
          "tooltip": {
            "mode": "single",
            "sort": "none"
          }
        },
        "targets": [
          {
            "editorMode": "code",
            "expr": "kafka_coordinator_group_groupmetadatamanager_numgroupscompletingrebalance",
            "instant": false,
            "legendFormat": "__auto",
            "range": true,
            "refId": "A"
          }
        ],
        "title": "Total Groups Rebalancing",
        "type": "timeseries"
      },
      {
        "datasource": `${datasourceName}`,
        "description": "Total number of partitions across all topics. More partitions can increase throughput but also add complexity.",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisBorderShow": false,
              "axisCenteredZero": false,
              "axisColorMode": "text",
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "insertNulls": false,
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            }
          },
          "overrides": []
        },
        "gridPos": {
          "h": 8,
          "w": 12,
          "x": 12,
          "y": 1
        },
        "id": 16,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom",
            "showLegend": true
          },
          "tooltip": {
            "mode": "single",
            "sort": "none"
          }
        },
        "targets": [
          {
            "editorMode": "code",
            "expr": " sum(kafka_server_replicamanager_partitioncount{job=\"kafka\"})",
            "instant": false,
            "legendFormat": "__auto",
            "range": true,
            "refId": "A"
          }
        ],
        "title": "Total Number of Partitions",
        "type": "timeseries"
      },
      {
        "datasource": `${datasourceName}`,
        "description": "Average size of log segments for each topic. This can impact performance and storage usage.",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisBorderShow": false,
              "axisCenteredZero": false,
              "axisColorMode": "text",
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "insertNulls": false,
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            }
          },
          "overrides": []
        },
        "gridPos": {
          "h": 8,
          "w": 12,
          "x": 0,
          "y": 9
        },
        "id": 17,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom",
            "showLegend": true
          },
          "tooltip": {
            "mode": "single",
            "sort": "none"
          }
        },
        "targets": [
          {
            "editorMode": "code",
            "expr": "sum(kafka_log_log_size{job=\"kafka\"}) by (topic)",
            "instant": false,
            "legendFormat": "__auto",
            "range": true,
            "refId": "A"
          }
        ],
        "title": "Log Segment Size By Topic",
        "type": "timeseries"
      },
      {
        "datasource": `${datasourceName}`,
        "description": "Total number of errors encountered while fetching metadata. This could indicate issues with the Zookeeper quorum or network connectivity.",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisBorderShow": false,
              "axisCenteredZero": false,
              "axisColorMode": "text",
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "insertNulls": false,
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            }
          },
          "overrides": []
        },
        "gridPos": {
          "h": 8,
          "w": 12,
          "x": 12,
          "y": 9
        },
        "id": 1,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom",
            "showLegend": true
          },
          "tooltip": {
            "mode": "single",
            "sort": "none"
          }
        },
        "targets": [
          {
            "editorMode": "code",
            "expr": "kafka_controller_kafkacontroller_metadataerrorcount\n\n",
            "instant": false,
            "legendFormat": "__auto",
            "range": true,
            "refId": "A"
          }
        ],
        "title": "Metadata Error Count",
        "type": "timeseries"
      },
      {
        "datasource": `${datasourceName}`,
        "description": "Total number of bytes received by the broker, including messages and control messages.",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisBorderShow": false,
              "axisCenteredZero": false,
              "axisColorMode": "text",
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "insertNulls": false,
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            }
          },
          "overrides": []
        },
        "gridPos": {
          "h": 8,
          "w": 12,
          "x": 0,
          "y": 17
        },
        "id": 6,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom",
            "showLegend": true
          },
          "tooltip": {
            "mode": "single",
            "sort": "none"
          }
        },
        "targets": [
          {
            "editorMode": "code",
            "expr": "kafka_server_brokertopicmetrics_replicationbytesin_total",
            "instant": false,
            "legendFormat": "__auto",
            "range": true,
            "refId": "A"
          }
        ],
        "title": "Total Bytes In",
        "type": "timeseries"
      },
      {
        "datasource": `${datasourceName}`,
        "description": "Total number of bytes sent by the broker, including messages and responses to consumers.",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisBorderShow": false,
              "axisCenteredZero": false,
              "axisColorMode": "text",
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "insertNulls": false,
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            }
          },
          "overrides": []
        },
        "gridPos": {
          "h": 8,
          "w": 12,
          "x": 12,
          "y": 17
        },
        "id": 5,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom",
            "showLegend": true
          },
          "tooltip": {
            "mode": "single",
            "sort": "none"
          }
        },
        "targets": [
          {
            "editorMode": "code",
            "expr": "kafka_server_brokertopicmetrics_bytesout_total",
            "instant": false,
            "legendFormat": "__auto",
            "range": true,
            "refId": "A"
          }
        ],
        "title": "Total Bytes Out",
        "type": "timeseries"
      },
      {
        "datasource": `${datasourceName}`,
        "description": "Average time taken for messages to be processed by each topic. High latency could indicate overloaded brokers or slow consumers.",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisBorderShow": false,
              "axisCenteredZero": false,
              "axisColorMode": "text",
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "insertNulls": false,
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            }
          },
          "overrides": []
        },
        "gridPos": {
          "h": 8,
          "w": 12,
          "x": 0,
          "y": 25
        },
        "id": 14,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom",
            "showLegend": true
          },
          "tooltip": {
            "mode": "single",
            "sort": "none"
          }
        },
        "targets": [
          {
            "editorMode": "code",
            "expr": "histogram_quantile(0.95, sum(rate(kafka_server_brokertopicmetrics_bytesout_total{job=\"kafka\"}[5m])) by (topic))",
            "instant": false,
            "legendFormat": "__auto",
            "range": true,
            "refId": "A"
          }
        ],
        "title": "Message Latency By Topic",
        "type": "timeseries"
      },
      {
        "datasource": `${datasourceName}`,
        "description": "Total number of messages consumed from each topic. This can help you understand data flow through your Kafka cluster.",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisBorderShow": false,
              "axisCenteredZero": false,
              "axisColorMode": "text",
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "insertNulls": false,
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            }
          },
          "overrides": []
        },
        "gridPos": {
          "h": 8,
          "w": 12,
          "x": 12,
          "y": 25
        },
        "id": 13,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom",
            "showLegend": true
          },
          "tooltip": {
            "mode": "single",
            "sort": "none"
          }
        },
        "targets": [
          {
            "editorMode": "code",
            "expr": "sum(kafka_server_consumerfetchmanager_metrics_records_consumed_total{job=\"kafka\"})",
            "instant": false,
            "legendFormat": "__auto",
            "range": true,
            "refId": "A"
          }
        ],
        "title": "Total Messages Consumed Per Topic",
        "type": "timeseries"
      },
      {
        "datasource": `${datasourceName}`,
        "description": "Total number of messages produced to each topic. This can help you understand data ingestion rates.",
        "fieldConfig": {
          "defaults": {
            "color": {
              "mode": "palette-classic"
            },
            "custom": {
              "axisBorderShow": false,
              "axisCenteredZero": false,
              "axisColorMode": "text",
              "axisLabel": "",
              "axisPlacement": "auto",
              "barAlignment": 0,
              "drawStyle": "line",
              "fillOpacity": 0,
              "gradientMode": "none",
              "hideFrom": {
                "legend": false,
                "tooltip": false,
                "viz": false
              },
              "insertNulls": false,
              "lineInterpolation": "linear",
              "lineWidth": 1,
              "pointSize": 5,
              "scaleDistribution": {
                "type": "linear"
              },
              "showPoints": "auto",
              "spanNulls": false,
              "stacking": {
                "group": "A",
                "mode": "none"
              },
              "thresholdsStyle": {
                "mode": "off"
              }
            },
            "mappings": [],
            "thresholds": {
              "mode": "absolute",
              "steps": [
                {
                  "color": "green",
                  "value": null
                },
                {
                  "color": "red",
                  "value": 80
                }
              ]
            }
          },
          "overrides": []
        },
        "gridPos": {
          "h": 8,
          "w": 12,
          "x": 0,
          "y": 33
        },
        "id": 12,
        "options": {
          "legend": {
            "calcs": [],
            "displayMode": "list",
            "placement": "bottom",
            "showLegend": true
          },
          "tooltip": {
            "mode": "single",
            "sort": "none"
          }
        },
        "targets": [
          {
            "editorMode": "code",
            "expr": "sum(kafka_server_brokertopicmetrics_messagesin_total{job=\"kafka\"})",
            "instant": false,
            "legendFormat": "__auto",
            "range": true,
            "refId": "A"
          }
        ],
        "title": "Total Messages Produced Per Topic",
        "type": "timeseries"
      }
    ],
    "title": "Miscellaneous",
    "type": "row"
  },
  {
    "collapsed": false,
    "gridPos": {
      "h": 1,
      "w": 24,
      "x": 0,
      "y": 1
    },
    "id": 19,
    "panels": [],
    "title": "Overall Cluster Health",
    "type": "row"
  },
  {
    "datasource": `${datasourceName}`,
    "description": "This metric indicates the number of active Kafka controller nodes in the cluster. The Kafka controller is responsible for managing cluster metadata and coordinating actions such as leader election and partition reassignment",
    "fieldConfig": {
      "defaults": {
        "color": {
          "mode": "thresholds"
        },
        "mappings": [],
        "thresholds": {
          "mode": "absolute",
          "steps": [
            {
              "color": "green",
              "value": null
            },
            {
              "color": "red",
              "value": 80
            }
          ]
        }
      },
      "overrides": []
    },
    "gridPos": {
      "h": 8,
      "w": 12,
      "x": 0,
      "y": 2
    },
    "id": 9,
    "options": {
      "colorMode": "value",
      "graphMode": "area",
      "justifyMode": "auto",
      "orientation": "auto",
      "reduceOptions": {
        "calcs": [
          "lastNotNull"
        ],
        "fields": "",
        "values": false
      },
      "showPercentChange": false,
      "textMode": "auto",
      "wideLayout": true
    },
    "pluginVersion": "10.4.0",
    "targets": [
      {
        "editorMode": "code",
        "expr": "kafka_controller_kafkacontroller_activecontrollercount",
        "instant": false,
        "legendFormat": "__auto",
        "range": true,
        "refId": "A"
      }
    ],
    "title": "Active Controller Count",
    "type": "stat"
  },
  {
    "datasource": `${datasourceName}`,
    "description": "This metric measures the memory usage of the Java Virtual Machine (JVM) running Kafka brokers. It provides insights into how much memory is allocated to different memory pools within the JVM, such as heap memory and non-heap memory. Monitoring JVM memory usage is essential for preventing out-of-memory errors and maintaining the stability of Kafka brokers.",
    "fieldConfig": {
      "defaults": {
        "color": {
          "mode": "palette-classic"
        },
        "custom": {
          "axisBorderShow": false,
          "axisCenteredZero": false,
          "axisColorMode": "text",
          "axisLabel": "",
          "axisPlacement": "auto",
          "barAlignment": 0,
          "drawStyle": "line",
          "fillOpacity": 0,
          "gradientMode": "none",
          "hideFrom": {
            "legend": false,
            "tooltip": false,
            "viz": false
          },
          "insertNulls": false,
          "lineInterpolation": "linear",
          "lineWidth": 1,
          "pointSize": 5,
          "scaleDistribution": {
            "type": "linear"
          },
          "showPoints": "auto",
          "spanNulls": false,
          "stacking": {
            "group": "A",
            "mode": "none"
          },
          "thresholdsStyle": {
            "mode": "area"
          }
        },
        "mappings": [],
        "thresholds": {
          "mode": "percentage",
          "steps": [
            {
              "color": "green",
              "value": null
            },
            {
              "color": "orange",
              "value": 40
            },
            {
              "color": "red",
              "value": 70
            }
          ]
        }
      },
      "overrides": []
    },
    "gridPos": {
      "h": 8,
      "w": 12,
      "x": 12,
      "y": 2
    },
    "id": 8,
    "options": {
      "legend": {
        "calcs": [],
        "displayMode": "list",
        "placement": "bottom",
        "showLegend": true
      },
      "tooltip": {
        "mode": "single",
        "sort": "none"
      }
    },
    "targets": [
      {
        "editorMode": "code",
        "expr": "jvm_memory_pool_bytes_used",
        "instant": false,
        "legendFormat": "__auto",
        "range": true,
        "refId": "A"
      },
      {
        "datasource": `${datasourceName}`,
        "editorMode": "code",
        "expr": "jvm_memory_pool_bytes_max",
        "hide": false,
        "instant": false,
        "legendFormat": "__auto",
        "range": true,
        "refId": "B"
      }
    ],
    "title": "JVM Memory Pool Bytes ",
    "type": "timeseries"
  },
  {
    "datasource": `${datasourceName}`,
    "description": "This metric measures the total CPU processing time consumed by Kafka brokers over a specified period, typically in seconds. Monitoring CPU usage provides insights into the computational workload of Kafka brokers and helps identify potential performance bottlenecks or resource constraints.",
    "fieldConfig": {
      "defaults": {
        "color": {
          "mode": "palette-classic"
        },
        "custom": {
          "axisBorderShow": false,
          "axisCenteredZero": false,
          "axisColorMode": "text",
          "axisLabel": "",
          "axisPlacement": "auto",
          "barAlignment": 0,
          "drawStyle": "line",
          "fillOpacity": 0,
          "gradientMode": "none",
          "hideFrom": {
            "legend": false,
            "tooltip": false,
            "viz": false
          },
          "insertNulls": false,
          "lineInterpolation": "linear",
          "lineWidth": 1,
          "pointSize": 5,
          "scaleDistribution": {
            "type": "linear"
          },
          "showPoints": "auto",
          "spanNulls": false,
          "stacking": {
            "group": "A",
            "mode": "none"
          },
          "thresholdsStyle": {
            "mode": "off"
          }
        },
        "mappings": [],
        "thresholds": {
          "mode": "absolute",
          "steps": [
            {
              "color": "green",
              "value": null
            },
            {
              "color": "red",
              "value": 80
            }
          ]
        }
      },
      "overrides": []
    },
    "gridPos": {
      "h": 8,
      "w": 12,
      "x": 0,
      "y": 10
    },
    "id": 7,
    "options": {
      "legend": {
        "calcs": [],
        "displayMode": "list",
        "placement": "bottom",
        "showLegend": true
      },
      "tooltip": {
        "mode": "single",
        "sort": "none"
      }
    },
    "targets": [
      {
        "editorMode": "code",
        "expr": "process_cpu_seconds_total",
        "instant": false,
        "legendFormat": "__auto",
        "range": true,
        "refId": "A"
      }
    ],
    "title": "Total CPU Process in Seconds",
    "type": "timeseries"
  },
  {
    "datasource": `${datasourceName}`,
    "description": "This metric tracks the total number of failed fetch requests from consumers to brokers within the Kafka cluster. Failed fetch requests may indicate issues with network connectivity, broker overload, or consumer misconfiguration.",
    "fieldConfig": {
      "defaults": {
        "color": {
          "mode": "palette-classic"
        },
        "custom": {
          "axisBorderShow": false,
          "axisCenteredZero": false,
          "axisColorMode": "text",
          "axisLabel": "",
          "axisPlacement": "auto",
          "barAlignment": 0,
          "drawStyle": "line",
          "fillOpacity": 0,
          "gradientMode": "none",
          "hideFrom": {
            "legend": false,
            "tooltip": false,
            "viz": false
          },
          "insertNulls": false,
          "lineInterpolation": "linear",
          "lineWidth": 1,
          "pointSize": 5,
          "scaleDistribution": {
            "type": "linear"
          },
          "showPoints": "auto",
          "spanNulls": false,
          "stacking": {
            "group": "A",
            "mode": "none"
          },
          "thresholdsStyle": {
            "mode": "off"
          }
        },
        "mappings": [],
        "thresholds": {
          "mode": "absolute",
          "steps": [
            {
              "color": "green",
              "value": null
            },
            {
              "color": "red",
              "value": 80
            }
          ]
        }
      },
      "overrides": []
    },
    "gridPos": {
      "h": 8,
      "w": 12,
      "x": 12,
      "y": 10
    },
    "id": 4,
    "options": {
      "legend": {
        "calcs": [],
        "displayMode": "list",
        "placement": "bottom",
        "showLegend": true
      },
      "tooltip": {
        "mode": "single",
        "sort": "none"
      }
    },
    "targets": [
      {
        "editorMode": "code",
        "expr": "kafka_server_brokertopicmetrics_failedfetchrequests_total",
        "instant": false,
        "legendFormat": "__auto",
        "range": true,
        "refId": "A"
      }
    ],
    "title": "Total Failed Fetch Requests",
    "type": "timeseries"
  },
  {
    "datasource": `${datasourceName}`,
    "description": "This metric indicates the percentage of disk space utilized by Kafka brokers. Monitoring broker disk usage is crucial for ensuring that there is sufficient storage capacity to handle incoming data. High disk usage may lead to performance degradation and potential data loss if not addressed promptly.",
    "fieldConfig": {
      "defaults": {
        "color": {
          "mode": "palette-classic"
        },
        "custom": {
          "axisBorderShow": false,
          "axisCenteredZero": false,
          "axisColorMode": "text",
          "axisLabel": "",
          "axisPlacement": "auto",
          "barAlignment": 0,
          "drawStyle": "line",
          "fillOpacity": 0,
          "gradientMode": "none",
          "hideFrom": {
            "legend": false,
            "tooltip": false,
            "viz": false
          },
          "insertNulls": false,
          "lineInterpolation": "linear",
          "lineWidth": 1,
          "pointSize": 5,
          "scaleDistribution": {
            "type": "linear"
          },
          "showPoints": "auto",
          "spanNulls": false,
          "stacking": {
            "group": "A",
            "mode": "none"
          },
          "thresholdsStyle": {
            "mode": "off"
          }
        },
        "mappings": [],
        "thresholds": {
          "mode": "absolute",
          "steps": [
            {
              "color": "green",
              "value": null
            },
            {
              "color": "red",
              "value": 80
            }
          ]
        }
      },
      "overrides": []
    },
    "gridPos": {
      "h": 8,
      "w": 12,
      "x": 0,
      "y": 18
    },
    "id": 15,
    "options": {
      "legend": {
        "calcs": [],
        "displayMode": "list",
        "placement": "bottom",
        "showLegend": true
      },
      "tooltip": {
        "mode": "single",
        "sort": "none"
      }
    },
    "targets": [
      {
        "editorMode": "code",
        "expr": "sum(node_filesystem_size_bytes{job=\"node-exporter\",mountpoint=\"/kafka\"}) - sum(node_filesystem_free_bytes{job=\"node-exporter\",mountpoint=\"/kafka\"})",
        "instant": false,
        "legendFormat": "__auto",
        "range": true,
        "refId": "A"
      }
    ],
    "title": "Broker Disk Usage",
    "type": "timeseries"
  },
  {
    "datasource": `${datasourceName}`,
    "description": "This metric indicates the number of partitions in the Kafka cluster that are under-replicated, meaning they do not have the required number of replicas as specified by the replication factor.",
    "fieldConfig": {
      "defaults": {
        "color": {
          "mode": "thresholds"
        },
        "mappings": [],
        "thresholds": {
          "mode": "absolute",
          "steps": [
            {
              "color": "green",
              "value": null
            },
            {
              "color": "red",
              "value": 80
            }
          ]
        }
      },
      "overrides": []
    },
    "gridPos": {
      "h": 8,
      "w": 12,
      "x": 12,
      "y": 18
    },
    "id": 11,
    "options": {
      "colorMode": "value",
      "graphMode": "area",
      "justifyMode": "auto",
      "orientation": "auto",
      "reduceOptions": {
        "calcs": [
          "lastNotNull"
        ],
        "fields": "",
        "values": false
      },
      "showPercentChange": false,
      "textMode": "auto",
      "wideLayout": true
    },
    "pluginVersion": "10.4.0",
    "targets": [
      {
        "editorMode": "code",
        "expr": "kafka_cluster_partition_underreplicated",
        "instant": false,
        "legendFormat": "__auto",
        "range": true,
        "refId": "A"
      }
    ],
    "title": "Under-Replicated Partitions Count",
    "type": "stat"
  },
  {
    "datasource": `${datasourceName}`,
    "description": "This metric represents the number of partitions in the Kafka cluster that are currently offline or unavailable. Offline partitions may occur due to various reasons, such as broker failures or network issues.",
    "fieldConfig": {
      "defaults": {
        "color": {
          "mode": "palette-classic"
        },
        "custom": {
          "axisBorderShow": false,
          "axisCenteredZero": false,
          "axisColorMode": "text",
          "axisLabel": "",
          "axisPlacement": "auto",
          "barAlignment": 0,
          "drawStyle": "line",
          "fillOpacity": 0,
          "gradientMode": "none",
          "hideFrom": {
            "legend": false,
            "tooltip": false,
            "viz": false
          },
          "insertNulls": false,
          "lineInterpolation": "linear",
          "lineWidth": 1,
          "pointSize": 5,
          "scaleDistribution": {
            "type": "linear"
          },
          "showPoints": "auto",
          "spanNulls": false,
          "stacking": {
            "group": "A",
            "mode": "none"
          },
          "thresholdsStyle": {
            "mode": "off"
          }
        },
        "mappings": [],
        "thresholds": {
          "mode": "absolute",
          "steps": [
            {
              "color": "green",
              "value": null
            },
            {
              "color": "red",
              "value": 80
            }
          ]
        }
      },
      "overrides": []
    },
    "gridPos": {
      "h": 8,
      "w": 12,
      "x": 0,
      "y": 26
    },
    "id": 10,
    "options": {
      "legend": {
        "calcs": [],
        "displayMode": "list",
        "placement": "bottom",
        "showLegend": true
      },
      "tooltip": {
        "mode": "single",
        "sort": "none"
      }
    },
    "targets": [
      {
        "editorMode": "code",
        "expr": "kafka_controller_kafkacontroller_offlinepartitionscount",
        "instant": false,
        "legendFormat": "__auto",
        "range": true,
        "refId": "A"
      }
    ],
    "title": "Offline Partitions Count",
    "type": "timeseries"
  },
  {
    "collapsed": false,
    "gridPos": {
      "h": 1,
      "w": 24,
      "x": 0,
      "y": 34
    },
    "id": 20,
    "panels": [],
    "title": "Consumer Lag",
    "type": "row"
  },
  {
    "datasource": `${datasourceName}`,
    "description": "Similar to the maximum lag metric, this metric provides the lag for each partition within a consumer group.",
    "fieldConfig": {
      "defaults": {
        "color": {
          "mode": "palette-classic"
        },
        "custom": {
          "axisBorderShow": false,
          "axisCenteredZero": false,
          "axisColorMode": "text",
          "axisLabel": "",
          "axisPlacement": "auto",
          "barAlignment": 0,
          "drawStyle": "line",
          "fillOpacity": 0,
          "gradientMode": "none",
          "hideFrom": {
            "legend": false,
            "tooltip": false,
            "viz": false
          },
          "insertNulls": false,
          "lineInterpolation": "linear",
          "lineWidth": 1,
          "pointSize": 5,
          "scaleDistribution": {
            "type": "linear"
          },
          "showPoints": "auto",
          "spanNulls": false,
          "stacking": {
            "group": "A",
            "mode": "none"
          },
          "thresholdsStyle": {
            "mode": "off"
          }
        },
        "mappings": [],
        "thresholds": {
          "mode": "absolute",
          "steps": [
            {
              "color": "green",
              "value": null
            },
            {
              "color": "red",
              "value": 80
            }
          ]
        }
      },
      "overrides": []
    },
    "gridPos": {
      "h": 8,
      "w": 12,
      "x": 0,
      "y": 35
    },
    "id": 21,
    "options": {
      "legend": {
        "calcs": [],
        "displayMode": "list",
        "placement": "bottom",
        "showLegend": true
      },
      "tooltip": {
        "mode": "single",
        "sort": "none"
      }
    },
    "targets": [
      {
        "editorMode": "code",
        "expr": "kafka_consumer_group_lag",
        "instant": false,
        "legendFormat": "__auto",
        "range": true,
        "refId": "A"
      }
    ],
    "title": "Consumer Group Partition Lag",
    "type": "timeseries"
  },
  {
    "datasource": `${datasourceName}`,
    "fieldConfig": {
      "defaults": {
        "color": {
          "mode": "palette-classic"
        },
        "custom": {
          "axisBorderShow": false,
          "axisCenteredZero": false,
          "axisColorMode": "text",
          "axisLabel": "",
          "axisPlacement": "auto",
          "barAlignment": 0,
          "drawStyle": "line",
          "fillOpacity": 0,
          "gradientMode": "none",
          "hideFrom": {
            "legend": false,
            "tooltip": false,
            "viz": false
          },
          "insertNulls": false,
          "lineInterpolation": "linear",
          "lineWidth": 1,
          "pointSize": 5,
          "scaleDistribution": {
            "type": "linear"
          },
          "showPoints": "auto",
          "spanNulls": false,
          "stacking": {
            "group": "A",
            "mode": "none"
          },
          "thresholdsStyle": {
            "mode": "off"
          }
        },
        "mappings": [],
        "thresholds": {
          "mode": "absolute",
          "steps": [
            {
              "color": "green",
              "value": null
            },
            {
              "color": "red",
              "value": 80
            }
          ]
        }
      },
      "overrides": []
    },
    "gridPos": {
      "h": 8,
      "w": 12,
      "x": 12,
      "y": 35
    },
    "id": 3,
    "options": {
      "legend": {
        "calcs": [],
        "displayMode": "list",
        "placement": "bottom",
        "showLegend": true
      },
      "tooltip": {
        "mode": "single",
        "sort": "none"
      }
    },
    "targets": [
      {
        "editorMode": "code",
        "expr": "kafka_server_fetcherlagmetrics_consumerlag",
        "instant": false,
        "legendFormat": "__auto",
        "range": true,
        "refId": "A"
      }
    ],
    "title": "Consumer Lag",
    "type": "timeseries"
  },
  {
    "datasource": `${datasourceName}`,
    "description": "This metric provides the maximum lag across all partitions for each consumer group.",
    "fieldConfig": {
      "defaults": {
        "color": {
          "mode": "palette-classic"
        },
        "custom": {
          "axisBorderShow": false,
          "axisCenteredZero": false,
          "axisColorMode": "text",
          "axisLabel": "",
          "axisPlacement": "auto",
          "barAlignment": 0,
          "drawStyle": "line",
          "fillOpacity": 0,
          "gradientMode": "none",
          "hideFrom": {
            "legend": false,
            "tooltip": false,
            "viz": false
          },
          "insertNulls": false,
          "lineInterpolation": "linear",
          "lineWidth": 1,
          "pointSize": 5,
          "scaleDistribution": {
            "type": "linear"
          },
          "showPoints": "auto",
          "spanNulls": false,
          "stacking": {
            "group": "A",
            "mode": "none"
          },
          "thresholdsStyle": {
            "mode": "off"
          }
        },
        "mappings": [],
        "thresholds": {
          "mode": "absolute",
          "steps": [
            {
              "color": "green",
              "value": null
            },
            {
              "color": "red",
              "value": 80
            }
          ]
        }
      },
      "overrides": []
    },
    "gridPos": {
      "h": 8,
      "w": 12,
      "x": 0,
      "y": 43
    },
    "id": 18,
    "options": {
      "legend": {
        "calcs": [],
        "displayMode": "list",
        "placement": "bottom",
        "showLegend": true
      },
      "tooltip": {
        "mode": "single",
        "sort": "none"
      }
    },
    "targets": [
      {
        "editorMode": "code",
        "expr": "kafka_consumer_group_max_lag",
        "instant": false,
        "legendFormat": "__auto",
        "range": true,
        "refId": "A"
      }
    ],
    "title": "Consumer Group Maximum Lag",
    "type": "timeseries"
  },
  {
    "datasource": `${datasourceName}`,
    "description": "This metric provides the current offset (position) of the consumer within each partition.",
    "fieldConfig": {
      "defaults": {
        "color": {
          "mode": "palette-classic"
        },
        "custom": {
          "axisBorderShow": false,
          "axisCenteredZero": false,
          "axisColorMode": "text",
          "axisLabel": "",
          "axisPlacement": "auto",
          "barAlignment": 0,
          "drawStyle": "line",
          "fillOpacity": 0,
          "gradientMode": "none",
          "hideFrom": {
            "legend": false,
            "tooltip": false,
            "viz": false
          },
          "insertNulls": false,
          "lineInterpolation": "linear",
          "lineWidth": 1,
          "pointSize": 5,
          "scaleDistribution": {
            "type": "linear"
          },
          "showPoints": "auto",
          "spanNulls": false,
          "stacking": {
            "group": "A",
            "mode": "none"
          },
          "thresholdsStyle": {
            "mode": "off"
          }
        },
        "mappings": [],
        "thresholds": {
          "mode": "absolute",
          "steps": [
            {
              "color": "green",
              "value": null
            },
            {
              "color": "red",
              "value": 80
            }
          ]
        }
      },
      "overrides": []
    },
    "gridPos": {
      "h": 8,
      "w": 12,
      "x": 12,
      "y": 43
    },
    "id": 22,
    "options": {
      "legend": {
        "calcs": [],
        "displayMode": "list",
        "placement": "bottom",
        "showLegend": true
      },
      "tooltip": {
        "mode": "single",
        "sort": "none"
      }
    },
    "targets": [
      {
        "editorMode": "code",
        "expr": "kafka_consumer_group_current_offset",
        "instant": false,
        "legendFormat": "__auto",
        "range": true,
        "refId": "A"
      }
    ],
    "title": "Consumer Group Current Offset",
    "type": "timeseries"
  },
  {
    "datasource": `${datasourceName}`,
    "description": "This metric calculates the lag in seconds for each partition within a consumer group.",
    "fieldConfig": {
      "defaults": {
        "color": {
          "mode": "palette-classic"
        },
        "custom": {
          "axisBorderShow": false,
          "axisCenteredZero": false,
          "axisColorMode": "text",
          "axisLabel": "",
          "axisPlacement": "auto",
          "barAlignment": 0,
          "drawStyle": "line",
          "fillOpacity": 0,
          "gradientMode": "none",
          "hideFrom": {
            "legend": false,
            "tooltip": false,
            "viz": false
          },
          "insertNulls": false,
          "lineInterpolation": "linear",
          "lineWidth": 1,
          "pointSize": 5,
          "scaleDistribution": {
            "type": "linear"
          },
          "showPoints": "auto",
          "spanNulls": false,
          "stacking": {
            "group": "A",
            "mode": "none"
          },
          "thresholdsStyle": {
            "mode": "off"
          }
        },
        "mappings": [],
        "thresholds": {
          "mode": "absolute",
          "steps": [
            {
              "color": "green",
              "value": null
            },
            {
              "color": "red",
              "value": 80
            }
          ]
        }
      },
      "overrides": []
    },
    "gridPos": {
      "h": 8,
      "w": 12,
      "x": 0,
      "y": 51
    },
    "id": 23,
    "options": {
      "legend": {
        "calcs": [],
        "displayMode": "list",
        "placement": "bottom",
        "showLegend": true
      },
      "tooltip": {
        "mode": "single",
        "sort": "none"
      }
    },
    "targets": [
      {
        "editorMode": "code",
        "expr": "kafka_consumer_group_lag_seconds",
        "instant": false,
        "legendFormat": "__auto",
        "range": true,
        "refId": "A"
      }
    ],
    "title": "Consumer Group Lag in Seconds",
    "type": "timeseries"
  },
  {
    "datasource": `${datasourceName}`,
    "description": "This metric provides information about the partition assignment strategy used by each consumer group, helping you understand how partitions are distributed among consumers.",
    "fieldConfig": {
      "defaults": {
        "color": {
          "mode": "palette-classic"
        },
        "custom": {
          "hideFrom": {
            "legend": false,
            "tooltip": false,
            "viz": false
          }
        },
        "mappings": []
      },
      "overrides": []
    },
    "gridPos": {
      "h": 8,
      "w": 12,
      "x": 12,
      "y": 51
    },
    "id": 24,
    "options": {
      "legend": {
        "displayMode": "list",
        "placement": "bottom",
        "showLegend": true
      },
      "pieType": "pie",
      "reduceOptions": {
        "calcs": [
          "lastNotNull"
        ],
        "fields": "",
        "values": false
      },
      "tooltip": {
        "mode": "single",
        "sort": "none"
      }
    },
    "targets": [
      {
        "editorMode": "code",
        "expr": "kafka_consumer_group_partition_assignment_strategy",
        "instant": false,
        "legendFormat": "__auto",
        "range": true,
        "refId": "A"
      }
    ],
    "title": "Consumer Group Partition Assignment Strategy",
    "type": "piechart"
  }
],

//================================================================================================
    },
    folderId: 0,
    overwrite: false,

    }
  
  // // End of Template for new dashboard


  // Use for API call
  const requestHeaders = {
    headers: { Authorization: `Bearer ${serviceAccountToken}` },
  };

  // Send request to Grafana API to create a dashboard
  try {
    const response = await axios.post(
      "http://grafana:3000/api/dashboards/db",
      newDashboardData,
      requestHeaders
    );

    console.log(`Dashboard using data from <${url}> created successfully`);
    
    // Persist uid
    console.log('response.data.uid: ', response.data.uid)
    res.locals.uid = response.data.uid;

    return next();
  } catch (err) {
    return next({
      log: `grafanaApiController.createDashboard: ERROR ${err}`,
      status: 500,
      message: {
        err: "Error occurred in grafanaApiController.createDashboard.",
      },
    });
  }
};


/* ---------------------------- DISPLAY DASHBOARD --------------------------- */
grafanaApiController.displayDashboard = async (req, res, next) => {
  console.log("In grafanaApiController.displayDashboard"); // testing
  const { uid, name } = res.locals;
  console.log('uid: ', uid);
  console.log('cluster name: ', name);
  // const fakeUid = 'adgxqf88b1p1cb';
  const requestHeaders = {
    headers: { Authorization: `Bearer ${serviceAccountToken}` },
  };

  // Send request to Grafana API to dislpay a dashboard
  try {
    const response = await axios.get(`http://grafana:3000/api/dashboards/uid/${uid}`, requestHeaders);
    // const response = await axios.get(`http://grafana:3000/api/dashboards/uid/${fakeUid}`, requestHeaders);

    const dashboardConfig = response.data.dashboard;
    console.log('dashboardConfig: ', dashboardConfig);
    console.log('API call to Grafana successful');

    res.locals.dashboardConfig = dashboardConfig;

    // Working on iFrame
    const iFrame = `http://localhost:3002/d/${dashboardConfig.uid}/${dashboardConfig.id}?orgId=1&theme=light`;

    console.log('iFrame: ', iFrame);
    res.locals.iFrame = iFrame;

    //saing iframe onto newCluster
    const update = { grafanaUrl: iFrame };
    const newCluster = await Cluster.findOneAndUpdate({name}, update);
    console.log('Saved Grafana iFrame to cluster in database');
    console.log('newCluster: ', newCluster);
    //http://grafana:3000/d-solo/fdgy6ul23iadca/20?orgId=1&theme=light

    // <iframe src="http://<grafana-host>:<grafana-port>/d-solo/<dashboard-uid>/<panel-id>?orgId=<org-id>&theme=<theme>" width="450" height="200" frameborder="0"></iframe>
//http://<grafana-host>:<grafana-port>/d-solo/<dashboard-uid>/<panel-id>?orgId=<org-id>&theme=<theme>

    return next();
  } catch (err) {
    return next({
      log: `grafanaApiController.displayDashboard: ERROR ${err}`,
      status: 500,
      message: {
        err: "Error occurred in grafanaApiController.displayDashboard.",
      },
    });
  }
};




/* ------------------------- SAVE DASHBOARD TO USER ------------------------- */
// grafanaApiController.saveUid = async (req, res, next) => {
//   console.log("In grafanaApiController.saveUid"); // testing
//   const { userId, uid } = res.locals;

//   console.log(`Saving graph <${uid}> to user <${userId}>`);

//   // Save to database
//   try {


//   return next();
// } catch (err) {
//     return next({
//       log: `grafanaApiController.saveUid: ERROR ${err}`,
//       status: 500,
//       message: {
//         err: "Error occurred in grafanaApiController.saveUid.",
//       },
//     });
//   }
// };


// Export
module.exports = grafanaApiController;
