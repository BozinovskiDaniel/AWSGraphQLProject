import './App.css';
import DisplayPosts from './components/DisplayPosts';
import CreatePost from './components/CreatePost';

// Amplify
import {withAuthenticator} from 'aws-amplify-react';

function App() {
  return (
    <div className="App">
      <h1>Post Application</h1> 
      <CreatePost />
      <DisplayPosts /> 
    </div>
  );
}

export default withAuthenticator(App, {includesGreeting : true});
