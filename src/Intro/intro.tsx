import React, { useState } from 'react';
import  IntroView from "./introView";
import {useParams, useLocation } from "react-router-dom";
import IntroMobileView from './introMobileView';
import MediaQuery from 'react-responsive';


const Intro:React.FC = () => {

    const [firstSearch, setFirstSearch] = useState('');
    
   
     const location = useLocation();
     const normal = location.state?.normal;
     const admin = location.state?.admin

     const level = normal !== undefined ? normal : admin;


    const getSearch = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        // setFirstSearch(e.currentTarget.value);

    }


    return (
        <div className='container'>
            <div className='col'>
            <MediaQuery minWidth={1224}>
            <IntroView getSearch={getSearch} firstSearch={firstSearch} setFirstSearch={setFirstSearch} level={level} />
            </MediaQuery>
            <MediaQuery maxWidth={1224}>
            <IntroMobileView getSearch={getSearch} firstSearch={firstSearch} setFirstSearch={setFirstSearch} level={level} />
            </MediaQuery>
            </div>
        </div>
        
    )

}


export default Intro;