import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './Component/Home/Home.jsx';
import LandingPage from  './Component/LandingPage/LandingPage.jsx'
import Detalles from './Component/Detalles/Detalles.jsx';
import CrearActividad from './Component/CrearActividad/CrearActividad.jsx';
function App() {
  return (
    <BrowserRouter >
    <div className="App">      
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route  path='/home/Actividades' component={CrearActividad}/>
        <Route  path='/home/:code'  component={Detalles} />        
        <Route path='/home' component={Home}/>
      </Switch>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
