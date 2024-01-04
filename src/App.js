import Home from './components/Home';
import './App.css';
import bgImage from "./images/backgroundImage.jpg"

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
