import { clustersStore } from "../store/clusters";
import axios from "axios";

// definition of using toast
const addToast = (title, description, status, duration, toast) => {
  toast({position: 'top', title, description, status, duration, isClosable: true, containerStyle: {marginTop: '70px'}});
}

// fetch user clusters when page loaded
export const handleFetchClusters = async (toast, push) => {
  try {
    // update states about user's all clusters
    const responseAll = await axios('http://localhost:3001/clusters/userClusters', {withCredentials: true});
    clustersStore.setState({renderClustersPage: true});
    console.log('Get User Clusters Response:', responseAll.data);
    clustersStore.setState({clusterMap: new Map(responseAll.data.map((obj) => [obj._id, obj]))});
    clustersStore.setState({clusterDisplayMap: new Map(responseAll.data.map((obj) => [obj._id, obj]))});

    // update states about user's favorite clusters
    const responseFavorite = await axios('http://localhost:3001/clusters/favorites', {withCredentials: true});
    clustersStore.setState({renderClustersPage: true});
    console.log('Get User\'s Favorite Clusters Response:', responseFavorite.data);
    clustersStore.setState({clusterFavoriteMap: new Map(responseFavorite.data.map((obj) => [obj._id, obj]))});
    clustersStore.setState({clusterFavoriteDisplayMap: new Map(responseFavorite.data.map((obj) => [obj._id, obj]))});

    // update states about user's not favorite clusters
    const responseNotFavorite = await axios('http://localhost:3001/clusters/notFavorites', {withCredentials: true});
    clustersStore.setState({renderClustersPage: true});
    console.log('Get User\'s Not Favorite Clusters Response:', responseNotFavorite.data);
    clustersStore.setState({clusterNotFavoriteMap: new Map(responseNotFavorite.data.map((obj) => [obj._id, obj]))});
    clustersStore.setState({clusterNotFavoriteDisplayMap: new Map(responseNotFavorite.data.map((obj) => [obj._id, obj]))});
    
    // update states about user's slack webhook url
    const responseSlackWebhookURL = await axios('http://localhost:3001/slack', {withCredentials: true});
    clustersStore.setState({renderClustersPage: true});
    console.log('Get User\'s Slack Webhook URL Response:', responseSlackWebhookURL.data);
    clustersStore.setState({slackWebhookURL: responseSlackWebhookURL.data});
  } catch (err) {
    console.log(err);
    clustersStore.setState({renderClustersPage: false});
    push('/home');
    addToast('Authentication Required', 'Please login or sign-up first.', 'error', 3000, toast);
  }
};

// actions when addClusterModal close
export const handleNewClusterClose = () => {
  clustersStore.setState({clusterName: ''});
  clustersStore.setState({clusterPort: ''});
  clustersStore.setState({isClusterNameEmpty: false});
  clustersStore.setState({isClusterPortEmpty: false});
  clustersStore.setState({isNewClusterOpen: false});
}

/*
 * Add Cluster Event
 */
export const handleNewCluster = async (toast) => {
  const clusterName = clustersStore.getState().clusterName;
  const clusterPort = clustersStore.getState().clusterPort;
  const clusterMap = clustersStore.getState().clusterMap;
  const clusterDisplayMap = clustersStore.getState().clusterDisplayMap;
  const clusterNotFavoriteMap = clustersStore.getState().clusterNotFavoriteMap;
  const clusterNotFavoriteDisplayMap = clustersStore.getState().clusterNotFavoriteDisplayMap;

  // check name and port input format
  if (clusterName === '') clustersStore.setState({isClusterNameEmpty: true});
  if (clusterPort === '') clustersStore.setState({isClusterPortEmpty: true});
  if (clusterName !== '' && clusterPort !== '') {

    // actions when addClusterModal close
    handleNewClusterClose();
    try {
      const response = await axios.post('http://localhost:3001/clusters/addCluster', {name: clusterName, hostnameAndPort: clusterPort}, {withCredentials: true});
      console.log('New Cluster Response:', response.data);
      addToast('Cluster Created', 'We\'ve created your cluster for you.', 'success', 3000, toast);

      // update states about user clusters
      clustersStore.setState({clusterMap: new Map(clusterMap.set(response.data._id, response.data))});
      clustersStore.setState({clusterDisplayMap: new Map(clusterDisplayMap.set(response.data._id, response.data))});
      clustersStore.setState({clusterNotFavoriteMap: new Map(clusterNotFavoriteMap.set(response.data._id, response.data))});
      clustersStore.setState({clusterNotFavoriteDisplayMap: new Map(clusterNotFavoriteDisplayMap.set(response.data._id, response.data))});
    } catch (err) {
      console.log(err);
      addToast('Error Occurred', 'Something went wrong when adding new cluster.', 'error', 3000, toast);
    }
  }
};

// actions when editClusterModal open
export const handleEditClusterOpen = (clusterObj) => {
  clustersStore.setState({isEditClusterOpen: true});
  clustersStore.setState({clusterName: clusterObj.name});
  clustersStore.setState({oldClusterName: clusterObj.name});
  clustersStore.setState({clusterPort: clusterObj.hostnameAndPort});
  clustersStore.setState({editClusterID: clusterObj._id});
}

// actions when editClusterModal close
export const handleEditClusterClose = () => {
  clustersStore.setState({clusterName: ''});
  clustersStore.setState({clusterPort: ''});
  clustersStore.setState({isClusterNameEmpty: false});
  clustersStore.setState({isClusterPortEmpty: false});
  clustersStore.setState({isEditClusterOpen: false});
}

/*
 * Edit Cluster Event
 */
export const handleEditCluster = async (toast, editClusterID) => {
  const clusterName = clustersStore.getState().clusterName;
  const clusterPort = clustersStore.getState().clusterPort;
  const clusterMap = clustersStore.getState().clusterMap;
  const clusterDisplayMap = clustersStore.getState().clusterDisplayMap;
  const clusterFavoriteMap = clustersStore.getState().clusterFavoriteMap;
  const clusterFavoriteDisplayMap = clustersStore.getState().clusterFavoriteDisplayMap;
  const clusterNotFavoriteMap = clustersStore.getState().clusterNotFavoriteMap;
  const clusterNotFavoriteDisplayMap = clustersStore.getState().clusterNotFavoriteDisplayMap;

  // check name and port input format
  if (clusterName === '') clustersStore.setState({isClusterNameEmpty: true});
  if (clusterPort === '') clustersStore.setState({isClusterPortEmpty: true});
  if (clusterName !== '' && clusterPort !== '') {

    // actions when editClusterModal close
    handleEditClusterClose();

    try {
      const response = await axios.patch(`http://localhost:3001/clusters/${editClusterID}`, {name: clusterName, hostnameAndPort: clusterPort}, {withCredentials: true});
      console.log('Edit Cluster Response:', response.data);
      addToast('Cluster Edited', 'We\'ve edited your cluster for you.', 'success', 3000, toast);

      // update states about user clusters
      clustersStore.setState({clusterMap: new Map(clusterMap.set(editClusterID, {...clusterMap.get(editClusterID), name: clusterName, hostnameAndPort: clusterPort}))});
      clustersStore.setState({clusterDisplayMap: new Map(clusterDisplayMap.set(editClusterID, {...clusterDisplayMap.get(editClusterID), name: clusterName, hostnameAndPort: clusterPort}))});
      if (clusterFavoriteMap.has(editClusterID)) clustersStore.setState({clusterFavoriteMap: new Map(clusterFavoriteMap.set(editClusterID, {...clusterFavoriteMap.get(editClusterID), name: clusterName, hostnameAndPort: clusterPort}))});
      if (clusterFavoriteDisplayMap.has(editClusterID)) clustersStore.setState({clusterFavoriteDisplayMap: new Map(clusterFavoriteDisplayMap.set(editClusterID, {...clusterFavoriteDisplayMap.get(editClusterID), name: clusterName, hostnameAndPort: clusterPort}))});
      if (clusterNotFavoriteMap.has(editClusterID)) clustersStore.setState({clusterNotFavoriteMap: new Map(clusterNotFavoriteMap.set(editClusterID, {...clusterNotFavoriteMap.get(editClusterID), name: clusterName, hostnameAndPort: clusterPort}))});
      if (clusterNotFavoriteDisplayMap.has(editClusterID)) clustersStore.setState({clusterNotFavoriteDisplayMap: new Map(clusterNotFavoriteDisplayMap.set(editClusterID, {...clusterNotFavoriteDisplayMap.get(editClusterID), name: clusterName, hostnameAndPort: clusterPort}))});
    } catch (err) {
      console.log(err);
      addToast('Error Occurred', 'Something went wrong when editing cluster.', 'error', 3000, toast);
    }
  }
}

// actions when deleteClusterModal open
export const handleDeleteClusterOpen = (clusterObj) => {
  clustersStore.setState({isDeleteClusterOpen: true});
  clustersStore.setState({oldClusterName: clusterObj.name});
  clustersStore.setState({deleteClusterID: clusterObj._id});
}

/*
 * Delete Cluster Event
 */
export const handleDeleteCluster = async (toast, deleteClusterID) => {
  const clusterMap = clustersStore.getState().clusterMap;
  const clusterDisplayMap = clustersStore.getState().clusterDisplayMap;
  const clusterFavoriteMap = clustersStore.getState().clusterFavoriteMap;
  const clusterFavoriteDisplayMap = clustersStore.getState().clusterFavoriteDisplayMap;
  const clusterNotFavoriteMap = clustersStore.getState().clusterNotFavoriteMap;
  const clusterNotFavoriteDisplayMap = clustersStore.getState().clusterNotFavoriteDisplayMap;

  clustersStore.setState({isDeleteClusterOpen: false});
  try {
    const response = await axios.delete(`http://localhost:3001/clusters/${deleteClusterID}`, {withCredentials: true});
    console.log('Delete Cluster Response:', response.data);
    addToast('Cluster Deleted', 'We\'ve deleted your cluster for you.', 'success', 3000, toast);

    // update states about user clusters
    clusterMap.delete(deleteClusterID);
    clustersStore.setState({clusterMap: new Map(clusterMap)});
    clusterDisplayMap.delete(deleteClusterID);
    clustersStore.setState({clusterDisplayMap: new Map(clusterDisplayMap)});
    if (clusterFavoriteMap.has(deleteClusterID)) {
      clusterFavoriteMap.delete(deleteClusterID);
      clustersStore.setState({clusterFavoriteMap: new Map(clusterFavoriteMap)});
      clusterFavoriteDisplayMap.delete(deleteClusterID);
      clustersStore.setState({clusterFavoriteDisplayMap: new Map(clusterFavoriteDisplayMap)});
    } else {
      clusterNotFavoriteMap.delete(deleteClusterID);
      clustersStore.setState({clusterNotFavoriteMap: new Map(clusterNotFavoriteMap)});
      clusterNotFavoriteDisplayMap.delete(deleteClusterID);
      clustersStore.setState({clusterNotFavoriteDisplayMap: new Map(clusterNotFavoriteDisplayMap)});
    }
  } catch (err) {
    console.log(err);
    addToast('Error Occurred', 'Something went wrong when deleting cluster.', 'error', 3000, toast);
  }
}

// actios when name input changes
export const handleClusterNameChange = (event) => {
  clustersStore.setState({isClusterNameEmpty: false});
  clustersStore.setState({clusterName: event.target.value});
};

// actios when port input changes
export const handleClusterPortChange = (event) => {
  clustersStore.setState({isClusterPortEmpty: false});
  clustersStore.setState({clusterPort: event.target.value});
};

// actios when search input changes
export const handleClusterSearchValueChange = (curClusterSearchValue) => {
  const clusterMap = clustersStore.getState().clusterMap;
  const clusterFavoriteMap = clustersStore.getState().clusterFavoriteMap;
  const clusterNotFavoriteMap = clustersStore.getState().clusterNotFavoriteMap;

  // update states about user search value and display cluster
  clustersStore.setState({clusterDisplayMap: new Map(
    [...clusterMap].filter(([id, clusterObj]) =>
      clusterObj.name.toLowerCase().search(curClusterSearchValue.toLowerCase()) !== -1
      || clusterObj.hostnameAndPort.toLowerCase().search(curClusterSearchValue.toLowerCase()) !== -1
  ))});

  // update states about user search value and favorite display cluster
  clustersStore.setState({clusterFavoriteDisplayMap: new Map(
    [...clusterFavoriteMap].filter(([id, clusterObj]) =>
      clusterObj.name.toLowerCase().search(curClusterSearchValue.toLowerCase()) !== -1
      || clusterObj.hostnameAndPort.toLowerCase().search(curClusterSearchValue.toLowerCase()) !== -1
  ))});

  // update states about user search value and not favorite display cluster
  clustersStore.setState({clusterNotFavoriteDisplayMap: new Map(
    [...clusterNotFavoriteMap].filter(([id, clusterObj]) =>
      clusterObj.name.toLowerCase().search(curClusterSearchValue.toLowerCase()) !== -1
      || clusterObj.hostnameAndPort.toLowerCase().search(curClusterSearchValue.toLowerCase()) !== -1
  ))});
}

/*
 * Toggle Cluster Favorite
 */
export const handleFavoriteChange = async (toast, favoriteClusterID) => {
  const clusterMap = clustersStore.getState().clusterMap;
  const clusterDisplayMap = clustersStore.getState().clusterDisplayMap;
  const clusterFavoriteMap = clustersStore.getState().clusterFavoriteMap;
  const clusterFavoriteDisplayMap = clustersStore.getState().clusterFavoriteDisplayMap;
  const clusterNotFavoriteMap = clustersStore.getState().clusterNotFavoriteMap;
  const clusterNotFavoriteDisplayMap = clustersStore.getState().clusterNotFavoriteDisplayMap;

  try {
    const response = await axios.patch(`http://localhost:3001/clusters/favorites/${favoriteClusterID}`, {}, {withCredentials: true});
    console.log('Set Favorite Cluster Response:', response.data);

    // update states about user clusters
    clustersStore.setState({clusterDisplayMap: new Map(clusterDisplayMap.set(favoriteClusterID, {...clusterDisplayMap.get(favoriteClusterID), favorite: !clusterDisplayMap.get(favoriteClusterID).favorite}))});
    clustersStore.setState({clusterMap: new Map(clusterMap.set(favoriteClusterID, {...clusterMap.get(favoriteClusterID), favorite: !clusterMap.get(favoriteClusterID).favorite}))});
    if (clusterFavoriteMap.has(favoriteClusterID)) {
      const changedClusterObj = clusterFavoriteMap.get(favoriteClusterID);
      clusterFavoriteMap.delete(favoriteClusterID);
      clustersStore.setState({clusterFavoriteMap: new Map(clusterFavoriteMap)});
      clusterFavoriteDisplayMap.delete(favoriteClusterID);
      clustersStore.setState({clusterFavoriteDisplayMap: new Map(clusterFavoriteDisplayMap)});
      clustersStore.setState({clusterNotFavoriteMap: new Map(clusterNotFavoriteMap.set(favoriteClusterID, {...changedClusterObj, favorite: !changedClusterObj.favorite}))});
      clustersStore.setState({clusterNotFavoriteDisplayMap: new Map(clusterNotFavoriteDisplayMap.set(favoriteClusterID, {...changedClusterObj, favorite: !changedClusterObj.favorite}))});
    } else {
      const changedClusterObj = clusterNotFavoriteMap.get(favoriteClusterID);
      clusterNotFavoriteMap.delete(favoriteClusterID);
      clustersStore.setState({clusterNotFavoriteMap: new Map(clusterNotFavoriteMap)});
      clusterNotFavoriteDisplayMap.delete(favoriteClusterID);
      clustersStore.setState({clusterNotFavoriteDisplayMap: new Map(clusterNotFavoriteDisplayMap)});
      clustersStore.setState({clusterFavoriteMap: new Map(clusterFavoriteMap.set(favoriteClusterID, {...changedClusterObj, favorite: !changedClusterObj.favorite}))});
      clustersStore.setState({clusterFavoriteDisplayMap: new Map(clusterFavoriteDisplayMap.set(favoriteClusterID, {...changedClusterObj, favorite: !changedClusterObj.favorite}))});
    }  
  } catch (err) {
    console.log(err);
    addToast('Error Occurred', 'Something went wrong when favoriting cluster.', 'error', 3000, toast);
  }
}

/*
 * User Logout
 */
export const handleLogout = async (toast, push) => {
  try {
    const response = await axios.get(`http://localhost:3001/auth/logout`, {withCredentials: true});
    console.log('Logout Response:', response.data);
    clustersStore.setState({isLogoutModalOpen: false});
    push('/home');
    addToast('Logout', 'User logged out successfully.', 'success', 3000, toast);
  } catch (err) {
    console.log(err);
    addToast('Error Occurred', 'Something went wrong when logging out.', 'error', 3000, toast);
  }
}

/*
 * Update Slack Webhook URL Event
 */
export const handleSlackWebhookURLSubmit = async (toast) => {
  const slackWebhookURL = clustersStore.getState().slackWebhookURL;
  if (slackWebhookURL.slice(0, 34) === 'https://hooks.slack.com/services/T'
    && slackWebhookURL.indexOf('/B') - slackWebhookURL.indexOf('/T') >= 10
    && slackWebhookURL.lastIndexOf('/') - slackWebhookURL.indexOf('/B') >= 9
    && slackWebhookURL.length >= 77
  ) {
    try {
      const response = await axios.patch(`http://localhost:3001/slack/update`, {slackUrl: slackWebhookURL}, {withCredentials: true});
      console.log('Update Slack Webhook URL Response:', response.data);
      clustersStore.setState({isDrawerOpen: false});
      addToast('Slack Webhook URL Updated', 'We\'ve updated your Slack Webhook URL for you.', 'success', 3000, toast);
    } catch (err) {
      console.log(err);
      addToast('Error Occurred', 'Something went wrong when updating Slack Webhook URL.', 'error', 3000, toast);
    }
  }
  else toast({position: 'top', title: 'URL Format Incorrect', description: 'Format of Slack Webhook URL is Incorrect.', status: 'error', duration: 3000, isClosable: true, containerStyle: {marginTop: '70px'}});
};

/*
 * Delete Slack Webhook URL Event
 */
export const handleSlackWebhookURLDelete = async (toast) => {
  try {
    clustersStore.setState({slackWebhookURL: ''});
    const response = await axios.get(`http://localhost:3001/slack/delete`, {withCredentials: true});
    console.log('Delete Slack Webhook URL Response:', response.data);
    clustersStore.setState({isDrawerOpen: false});
    addToast('Slack Webhook URL Deleted', 'We\'ve deleted your Slack Webhook URL for you.', 'success', 3000, toast);
  } catch (err) {
    console.log(err);
    addToast('Error Occurred', 'Something went wrong when deleting Slack Webhook URL.', 'error', 3000, toast);
  }
}