import { create } from 'zustand';

export const clustersStore = create((set) => ({

  // User's Clusters
  clusterMap: new Map(),

  // Clusters for Display
  clusterDisplayMap: new Map(),

  // User's Favorite Clusters
  clusterFavoriteMap: new Map(),

  // User's Favorite Clusters
  clusterFavoriteDisplayMap: new Map(),

  // User's Not Favorite Clusters
  clusterNotFavoriteMap: new Map(),
  
  // User's Favorite Clusters
  clusterNotFavoriteDisplayMap: new Map(),
  
  // Name Input Value
  clusterName: '',

  // Port Input Value
  clusterPort: '',

  // Search Input Value
  clusterSearchValue: '',

  // Slack Webhook URL Input Value
  slackWebhookURL: '',

  // is Name Input Empty
  isClusterNameEmpty: false,

  // is Port Input Empty
  isClusterPortEmpty: false,

  // is Add Cluster Modal Open
  isNewClusterOpen: false,

  // is Edit Cluster Modal Open
  isEditClusterOpen: false,

  // is Delete Cluster Modal Open
  isDeleteClusterOpen: false,

  // is Menu Drawer Open
  isDrawerOpen: false,

  // ID of Edited Cluster
  editClusterID: '',
  
  // ID of Deleted Cluster
  deleteClusterID: '',

  // Name before Edit
  oldClusterName: '',
}));