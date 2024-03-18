import { create } from 'zustand';

export const clustersStore = create((set) => ({

  // User's Clusters
  clusterMap: new Map(),

  // Clusters for Display
  clusterDisplayMap: new Map(),

  // User's Favorite Clusters
  clusterFavoriteMap: new Map(),

  // Favorite Clusters for Display
  clusterFavoriteDisplayMap: new Map(),

  // User's Not Favorite Clusters
  clusterNotFavoriteMap: new Map(),
  
  // Not Favorite Clusters for Display
  clusterNotFavoriteDisplayMap: new Map(),

  // Timeout Function to Debounce Search
  clusterDebounceSearchTimeout: null,
  
  // Name Input Value
  clusterName: '',

  // Port Input Value
  clusterPort: '',

  // Cluster Search Input Value
  clusterSearchValue: '',

  // Old Password Input Value
  oldPassword: '',

  // New Password Input Value
  newPassword: '',

  // Slack Webhook URL Input Value
  slackWebhookURL: '',

  // render clusters page or not
  renderClustersPage: false,

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

  // is Logout Modal Open
  isLogoutModalOpen: false,
  
  // is Old Password Input Empty
  isOldPasswordEmpty: false,

  // is New Password Input Empty
  isNewPasswordEmpty: false,

  // is Change Password Modal Open
  isChangePasswordModalOpen: false,

  // is Change Password Modal Open
  isDeleteAccountModalOpen: false,

  // ID of Edited Cluster
  editClusterID: '',
  
  // ID of Deleted Cluster
  deleteClusterID: '',

  // Name before Edit
  oldClusterName: '',
}));