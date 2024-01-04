import Home from './components/Home';

import bgImage from "./images/backgroundImage.jpg"
import './App.css';

function App() {
  const myStyle = { 
    backgroundImage: `url(${bgImage})`
}

  return (
    <div style={myStyle} className='bg-cover bg-no-repeat  h-screen w-full'>
      <Home/>
    </div>
  );
}

export default App;
