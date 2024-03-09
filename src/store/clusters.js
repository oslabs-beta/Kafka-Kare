import { create } from 'zustand';

export const clustersStore = create((set) => ({

  // User's Clusters
  clusterArray: [],

  // Clusters for Dispay
  clusterDisplayArray: [],
  
  // Name Input Value
  clusterName: '',

  // Port Input Value
  clusterPort: '',

  // Search Input Value
  clusterSearchValue: '',

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