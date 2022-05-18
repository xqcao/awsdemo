import React from 'react';
import './App.css';
import {Link,Routes,Route} from 'react-router-dom'
import Content from './components/Content';
import About from './components/About';
import Welcome from './components/Welcome';
import PyLambda from './components/PyLambda';
import DockerDemo from './components/DockerDemo';
import UbuntuPy from './components/UbuntuPy';

const routes:any[] =[
  {name:'WelcomePage',url:'/', component:Welcome},
  {name:'AboutPage',url:'/about', component:About},
  {name:'ContentPage',url:'/content', component:Content},
  {name:'UbuntuPyPage',url:'/ubuntu', component:UbuntuPy},
  {name:'DockerPage',url:'/docker', component:DockerDemo},
  {name:'PyLambdaPage',url:'/pylambda', component:PyLambda}
]
function App() {
  return (
    <div className="App">
      <h2>python script running on aws lambda</h2>
     <ol>
      { routes.map((el,idx)=><li key={el.name+"-"+idx}><Link to={el.url}>{el.name}</Link></li>)}
     </ol>
      <hr/>
      <Routes>
      { routes.map((el,idx)=><Route  key={el.name+"_"+idx} path={el.url} element={<el.component />} />)}
     </Routes>
    </div>
  );
}

export default App;
