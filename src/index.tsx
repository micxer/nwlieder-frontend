import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './Home/Home';
import Admin from './admin/admin';
import Intro from './Intro/intro';
import Lied from './Lied/lied';
import Einloggen from './einloggen/einloggen';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);




root.render(
  <React.StrictMode>
      
    <Router>
    <div className='mt-5'>

      <Routes>
        <Route path='/intro' element={<Intro  
        // length={function (lenght: any): void {throw new Error('Function not implemented'); }}
        />}/>
         <Route path='/lied/:id' element={<Lied 
        // length={function (lenght: any): void {throw new Error('Function not implemented'); }}
        />}/>
        <Route path='/home'  element={<Home lenght={function (lenght: any): void {
            throw new Error('Function not implemented.');
          } }/>}/>
        <Route path='/admin' element={<Admin lenght={function (lenght: any): void {
            throw new Error('Function not implemented.');
          } }/>} />
          <Route path='/' element={<Einloggen /> } />
      </Routes>
      </div>
      </Router>
   
  </React.StrictMode> 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
