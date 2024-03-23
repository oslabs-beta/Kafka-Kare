import React, { useEffect } from 'react';
import { Box, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { clustersStore } from '../store/clusters';
import Navbar from '../components/clusters/navbar';
import MainContainer from '../components/clusters/mainContainer';
import { handleFetchClustersAndSlackWebhookURL } from '../utils/clustersHandler';
import ColorModeButton from '../components/colorModeButton'
/*
Cluster Page Structure:
  |-- clusters.jsx
      |-- navbar
          |-- searchInput
          |-- addClusterModal
          |-- accountMenu
              |-- changePasswordModal
              |-- deleteAccountModal
              |-- logoutModal
          |-- menuDrawer
      |-- mainContainer
          |-- clusterCard
          |-- deleteClusterModal
          |-- editClusterModal
*/
export default function Home() {

  // declare variable to use toast and push
  const { push } = useRouter();
  const toast = useToast();

  // declare state variables
  const renderClustersPage = clustersStore(state => state.renderClustersPage);

  // fetch clusters and slack webhook url before rendering page
  useEffect(() => {
    handleFetchClustersAndSlackWebhookURL(toast, push);
    // setTimeout(() => {alert('finish')}, 250);
  }, []);

  // actions when addClusterModal close
  const handleNewClusterClose = () => {
    clustersStore.setState({clusterName: ''});
    clustersStore.setState({clusterPort: ''});
    clustersStore.setState({isClusterNameEmpty: false});
    clustersStore.setState({isClusterPortEmpty: false});
    clustersStore.setState({isNewClusterOpen: false});
    clustersStore.setState({clusterName: ''});
    clustersStore.setState({clusterPort: ''});
    clustersStore.setState({isClusterNameEmpty: false});
    clustersStore.setState({isClusterPortEmpty: false});
    clustersStore.setState({isNewClusterOpen: false});
  }
  
  /*
   * Add Cluster Event
   */
  const handleNewCluster = async () => {

    // check input format
    if (clusterName === '') clustersStore.setState({isClusterNameEmpty: true});
    if (clusterPort === '') clustersStore.setState({isClusterPortEmpty: true});

    // check input format
    if (clusterName === '') clustersStore.setState({isClusterNameEmpty: true});
    if (clusterPort === '') clustersStore.setState({isClusterPortEmpty: true});
    if (clusterName !== '' && clusterPort !== '') {

      // actions when addClusterModal close
      handleNewClusterClose();
      try {
        const response = await axios.post('http://localhost:3001/clusters/addCluster', {name: clusterName, hostnameAndPort: clusterPort}, {withCredentials: true});
        console.log('New Cluster Response:', response.data);

        addToast('Cluster Created', 'We\'ve created your cluster for you.', 'success', 3000);

        // update states about user clusters
        clustersStore.setState({clusterMap: new Map(clusterMap.set(response.data._id, response.data))});
        clustersStore.setState({clusterDisplayMap: new Map(clusterDisplayMap.set(response.data._id, response.data))});
        clustersStore.setState({clusterNotFavoriteMap: new Map(clusterNotFavoriteMap.set(response.data._id, response.data))});
        clustersStore.setState({clusterNotFavoriteDisplayMap: new Map(clusterNotFavoriteDisplayMap.set(response.data._id, response.data))});
      } catch (err) {console.log(err)}
    }
  };

  // actions when editClusterModal close
  const handleEditClusterClose = () => {
    clustersStore.setState({clusterName: ''});
    clustersStore.setState({clusterPort: ''});
    clustersStore.setState({isClusterNameEmpty: false});
    clustersStore.setState({isClusterPortEmpty: false});
    clustersStore.setState({isEditClusterOpen: false});
  }

  /*
   * Edit Cluster Event
   */
  const handleEditCluster = async (editClusterID) => {

    // check input format
    if (clusterName === '') clustersStore.setState({isClusterNameEmpty: true});
    if (clusterPort === '') clustersStore.setState({isClusterPortEmpty: true});

    // check input format
    if (clusterName === '') clustersStore.setState({isClusterNameEmpty: true});
    if (clusterPort === '') clustersStore.setState({isClusterPortEmpty: true});
    if (clusterName !== '' && clusterPort !== '') {

      // actions when editClusterModal close
      handleEditClusterClose();

      addToast('Cluster Edited', 'We\'ve edited your cluster for you.', 'success', 3000);

      // update states about user clusters
      clustersStore.setState({clusterMap: new Map(clusterMap.set(editClusterID, {...clusterMap.get(editClusterID), name: clusterName, hostnameAndPort: clusterPort}))});
      clustersStore.setState({clusterDisplayMap: new Map(clusterDisplayMap.set(editClusterID, {...clusterDisplayMap.get(editClusterID), name: clusterName, hostnameAndPort: clusterPort}))});
      if (clusterFavoriteMap.has(editClusterID)) clustersStore.setState({clusterFavoriteMap: new Map(clusterFavoriteMap.set(editClusterID, {...clusterFavoriteMap.get(editClusterID), name: clusterName, hostnameAndPort: clusterPort}))});
      if (clusterFavoriteDisplayMap.has(editClusterID)) clustersStore.setState({clusterFavoriteDisplayMap: new Map(clusterFavoriteDisplayMap.set(editClusterID, {...clusterFavoriteDisplayMap.get(editClusterID), name: clusterName, hostnameAndPort: clusterPort}))});
      if (clusterNotFavoriteMap.has(editClusterID)) clustersStore.setState({clusterNotFavoriteMap: new Map(clusterNotFavoriteMap.set(editClusterID, {...clusterNotFavoriteMap.get(editClusterID), name: clusterName, hostnameAndPort: clusterPort}))});
      if (clusterNotFavoriteDisplayMap.has(editClusterID)) clustersStore.setState({clusterNotFavoriteDisplayMap: new Map(clusterNotFavoriteDisplayMap.set(editClusterID, {...clusterNotFavoriteDisplayMap.get(editClusterID), name: clusterName, hostnameAndPort: clusterPort}))});
      try {
        const response = await axios.patch(`http://localhost:3001/clusters/${editClusterID}`, {name: clusterName, hostnameAndPort: clusterPort}, {withCredentials: true});
        console.log('Edit Cluster Response:', response.data);
      } catch (err) {console.log(err)}
    }
  }

  /*
   * Delete Cluster Event
   */
  const handleDeleteCluster = async (deleteClusterID) => {

    // update states about user clusters
    clusterDisplayMap.delete(deleteClusterID);
    clustersStore.setState({clusterDisplayMap: new Map(clusterDisplayMap)});
    clusterMap.delete(deleteClusterID);
    clustersStore.setState({clusterMap: new Map(clusterMap)});
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
    clustersStore.setState({isDeleteClusterOpen: false});
    try {
      const response = await axios.delete(`http://localhost:3001/clusters/${deleteClusterID}`, {withCredentials: true});
      console.log('Delete Cluster Response:', response.data);

      addToast('Cluster Deleted', 'We\'ve deleted your cluster for you.', 'success', 3000);
    } catch (err) {console.log(err)}
  }

  /*
   * Toggle Cluster Favorite
   */
  const handleFavoriteChange = async (favoriteClusterID) => {

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
    try {
      const response = await axios.patch(`http://localhost:3001/clusters/favorites/${favoriteClusterID}`, {}, {withCredentials: true});
      console.log('Set Favorite Cluster Response:', response.data);
    } catch (err) {console.log(err)}
  }

  // actios when name input changes
  const handleClusterNameChange = (event) => {
    clustersStore.setState({isClusterNameEmpty: false});
    clustersStore.setState({clusterName: event.target.value});
  };
  
  // actios when port input changes
  const handleClusterPortChange = (event) => {
    clustersStore.setState({isClusterPortEmpty: false});
    clustersStore.setState({clusterPort: event.target.value});
  };
  
  // actios when search input changes
  const handleClusterSearchValueChange = (curClusterSearchValue) => {
    clustersStore.setState({clusterSearchValue: curClusterSearchValue});

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
   * Update Slack Webhook URL Event
   */
  const handleSlackWebhookURLSubmit = async () => {
    try {
      alert('Slack Webhook URL:', slackWebhookURL);
      // const response = await axios.patch(`http://localhost:3001/...`, {slackWebhookURL: slackWebhookURL}, {withCredentials: true});
      // console.log('Change Slack Webhook URL Response:', response.data);
      clustersStore.setState({isDrawerOpen: false});
      addToast('Slack Webhook URL Updated', 'We\'ve updated your Slack Webhook URL for you.', 'success', 3000);
    } catch (err) {console.log(err)}
  }

  /*
   * User Logout
   */
  const handleLogout = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/auth/logout`, {withCredentials: true});
      console.log('Logout Response:', response.data);
      clustersStore.setState({isLogoutModalOpen: false});
      push('/home');
      addToast('Logout', 'User logged out successfully.', 'success', 3000);
    } catch (err) {console.log(err)}
  }

  // definition of using toast
  // const toast = useToast();
  const addToast = (title, description, status, duration) => {
    toast({position: 'top', title, description, status, duration, isClosable: true, containerStyle: {marginTop: '70px'}});
  }
  // const drawerBtnRef = React.useRef();

  if (renderClustersPage) {
    return (
      <Box width='full' height='100vh'>

        {/* Navbar */}
        <Navbar />
        
        {/* Main Container */}
        <MainContainer position='relative'>
        
        </MainContainer>
        <ColorModeButton position='absolute' bottom='16px' left='16px' ></ColorModeButton>
      </Box>
    );
  }
}