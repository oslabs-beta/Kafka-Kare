import { userStore } from "../store/user"; // Import state store for user
import axios from "axios"; // Import axios for making HTTP requests

// Funcion to check input format
const inputFormatCheck = () => {
  const username = userStore.getState().username;
  const password = userStore.getState().password;
  let inputFormatValid = true;
  if (!username) {
    userStore.setState({usernameInvalid: true});
    userStore.setState({usernameErrorMessage: 'Username is required'});
    inputFormatValid = false;
  } else if (username.length < 6 || username.length > 20) {
    userStore.setState({usernameInvalid: true});
    userStore.setState({usernameErrorMessage: 'Username must be 6 - 20 characters in length'});
    inputFormatValid = false;
  }
  if (!password) {
    userStore.setState({passwordInvalid: true});
    userStore.setState({passwordErrorMessage: 'Password is required'});
    inputFormatValid = false;
  } else if (password.length < 6 || password.length > 20) {
    userStore.setState({passwordInvalid: true});
    userStore.setState({passwordErrorMessage: 'Password must be 6 - 20 characters in length'});
    inputFormatValid = false;
  }
  return inputFormatValid;
}

// Function to handle sign-up form submission
export const handleSignUp = async (event, toast, router) => {
  event.preventDefault(); // Prevent the default form submission behavior
  const username = userStore.getState().username;
  const password = userStore.getState().password;
  // Validate input fields
  userStore.setState({username: username.trim()});
  userStore.setState({password: password.trim()});
  if (!inputFormatCheck()) return;
  userStore.setState({usernameInvalid: false});
  userStore.setState({passwordInvalid: false});
  try {
    // Send a POST request to the backend endpoint '/auth/signup' 
    const response = await axios.post(
      'http://localhost:3001/auth/signup',
      {username, password},
      {withCredentials: true}
    ); // Convert data to JSON format and send it in the request body
    console.log('response: ', response.data);

    // If the response is successful (status code 2xx), navigate to the clusters page
    if (response.data.message) {
      console.log('signup successful!');
      router.replace('/clusters');
      toast({
        position: 'top',
        title: 'Account Created',
        description: "We've created your account for you.",
        status: 'success',
        duration: 3000,
        isClosable: true,
        containerStyle: {marginTop: '70px'}
      });
    } else toast({
      position: 'top',
      title: 'Error Occurred',
      description: "Something went wrong when signing up.",
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  } catch (error) {
    // Handle any errors that occur during the fetch request
    console.error('error: ', error);
    if (error.response.data.err === 'username already exists in database') {
      toast({
        position: 'top',
        title: 'Error Occurred',
        description: "Please choose a different username.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      userStore.setState({username: ''});
      userStore.setState({password: ''});
    } else toast({
      position: 'top',
      title: 'Error Occurred',
      description: "Something went wrong when signing up.",
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  }
};

// Function to handle login form submission
export const handleLogin = async (e, toast, router) => {
  e.preventDefault();
  const username = userStore.getState().username;
  const password = userStore.getState().password;
  console.log('username: ', username);
  console.log('password: ', password);
  // Validate input fields
  if (!inputFormatCheck()) return;
  userStore.setState({usernameInvalid: false});
  userStore.setState({passwordInvalid: false});
  try {
    // Send a POST request to the backend endpoint '/auth/login' 
    const response = await axios.post(
      'http://localhost:3001/auth/login', 
      { username, password },
      {withCredentials: true}
    ); // Convert data to JSON format and send it in the request body
    console.log('response: ', response.data);

    // If the response is successful (status code 2xx), navigate to the clusters page
    if (response.status === 200) {
      console.log('successful login');
      router.replace('/clusters');
      toast({
        position: 'top',
        title: 'User Logged In',
        description: "You've successfully logged in.",
        status: 'success',
        duration: 3000,
        isClosable: true,
        containerStyle: {marginTop: '70px'}
      });
    } else toast({
      position: 'top',
      title: 'Error Occurred',
      description: "Something went wrong when logging in.",
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  } catch (error) {
    // Handle any errors that occur during the fetch request
    console.log('Error:', error);
    if (error.response.data.err === 'Invalid credentials.') {
      toast({
        position: 'top',
        title: 'Login Failed',
        description: (<p>Username or Password incorrect.<br />You can sign up or try again later.</p>),
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      userStore.setState({username: ''});
      userStore.setState({password: ''});
    }
    else toast({
      position: 'top',
      title: 'Error Occurred',
      description: "Something went wrong when logging in.",
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  }
};

/*
 * After User Logged In With OAuth Event
 */
export const handleLoggedInOAuth = async (session, router, toast) => {
  try {
    const logInGoogleResponse = await axios.post('http://localhost:3001/oauth/google', {email: session.user.email, oAuthProvider: 'Google'}, {withCredentials: true});
    console.log(logInGoogleResponse.data);
    router.push('/clusters');
    toast({
      position: 'top',
      title: 'User Logged In',
      description: "You've successfully logged in.",
      status: 'success',
      duration: 3000,
      isClosable: true,
      containerStyle: {marginTop: '70px'}
    });
  } catch (err) {
    console.log(err);
    toast({
      position: 'top',
      title: 'Error Occurred',
      description: "Something went wrong when logging in.",
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  }
};