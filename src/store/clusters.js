import { create } from 'zustand';

export const clustersStore = create((set) => ({
  clusterArray: [],
  clusterDisplayArray: [],
  
  clusterName: '',
  clusterPort: '',
  isClusterNameEmpty: false,
  isClusterPortEmpty: false,

  isNewClusterOpen: false,
  isEditClusterOpen: false,
  editClusterID: '',
  oldClusterName: '',
  
  isDeleteClusterOpen: false,
  deletedClusterObj: {},

  clusterSearchValue: '',
  isDrawerOpen: false,
}));