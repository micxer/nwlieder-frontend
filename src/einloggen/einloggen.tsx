import React, {useState} from 'react';
import EinloggenView from './einloggenView';
import { Link, To, useNavigate,  } from "react-router-dom";



const Einloggen: React.FC = () => {

    const navigate = useNavigate();


    const [nutzer, setNutzer] = useState({

        nutzer: '',
        password: ''
    })

    const [level, setLevel] = useState('')

 
    const param = level;
    const einmelden = (e: React.ChangeEvent<HTMLInputElement>) => {

        const {name, value} = e.target;
        setNutzer((antes) => ({
            ...antes, 
            [name]: value
        }))
    }

    const setLocalStorageItem = (key: string, value: string) => {

        localStorage.setItem(key, value);
    }
  


    const verify = async (e: React.FormEvent<HTMLFormElement>) => {
       
  
        const normal = "normal";
        const admin = "admin";
        setLocalStorageItem(nutzer.nutzer, nutzer.password);
        if(nutzer.nutzer === 'pokemon' && nutzer.password === 'pokemon') {


          await navigate("/start", { state: { normal }  });
           
        }

        else if (nutzer.nutzer === 'admin' && nutzer.password === 'admin') {

            await navigate("/start", {state: { admin }});
        }
    }

    return <EinloggenView einmelden={einmelden} verify={verify}/>
}




export default Einloggen