import './App.module.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HelloWorld from './pages/HelloWorld';
import HelloWorld1 from './pages/HelloWorld1';
import HelloWorld2 from './pages/HelloWorld2';
import HelloWorld3 from './pages/HelloWorld3';
import HelloWorld4 from './pages/HelloWorld4';
import HelloWorld5 from './pages/HelloWorld5';
import HelloWorld6 from './pages/HelloWorld6';
import AboutWithNumber from './pages/AboutWithNumber';
import About from './pages/About';
import Project from './pages/Project.jsx';
import ProjectWithNumber from './pages/ProjectWithNumber';
import {useState} from 'react';
import Header from './pages/Header.jsx';
import './App.module.css'
import { jokeLoader } from './pages/Joke.jsx';
import Joke from './pages/Joke.jsx';
import Form from './pages/Form.jsx';
import FormSubmitted from './pages/FormSubmitted.jsx';
import Query from './pages/Query.jsx';
import QueryPage from './pages/QueryPage.jsx';

function App() {
  const [isActive, setIsActive] = useState(true);

  return (    
     <BrowserRouter>
     <Routes>
      <Route path='/queryPage' element={<QueryPage/>} />
      <Route path='/query' element={<Query/>} />
     <Route path='/form' element={<Form/>}   />
     <Route path='/submitted' element={<FormSubmitted/>} />

      <Route path='/joke' element={<Joke/>} loader={jokeLoader}  />
      <Route path='/header' element={<Header isActive={isActive} onSetIsActive={setIsActive}/>} />
      <Route path='/helloworld' element={<HelloWorld/>}>
        <Route path='helloworld1' element={<HelloWorld1/>}></Route>
        <Route path='helloworld2' element={<HelloWorld2/>}></Route>
        <Route path='helloworld3' element={<HelloWorld3/>}></Route>
        <Route path='helloworld4' element={<HelloWorld4/>}></Route>
        <Route path='helloworld5' element={<HelloWorld5/>}></Route>
        <Route path='helloworld6' element={<HelloWorld6/>}></Route>
      </Route>
      <Route path='/about' element={<About/>}>
        <Route path=':id' element={<AboutWithNumber/>}>
          <Route path='project' element={<Project/>}>
            <Route path=':projectID' element={<ProjectWithNumber/>} />
          </Route>
        </Route>
      </Route>
     </Routes>
     </BrowserRouter>
    
  )
}

export default App
