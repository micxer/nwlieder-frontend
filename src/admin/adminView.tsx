import React, {MouseEvent} from "react";
import './admin.css'
import {Hola} from '../interfaces';
import { MdComment } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";

interface Info {

    hola: (e: MouseEvent<HTMLLIElement>) => Promise<void>
    data: Hola[],
    suchen: (e: React.FormEvent<HTMLFormElement>) => void,
    setsucht: React.Dispatch<React.SetStateAction<string>>,
    sucht: string,
    startFilter: (e: MouseEvent<HTMLButtonElement>) => void,
    filterLied: string,
    openModalAdmin: (e: React.MouseEvent<HTMLButtonElement>) => void,
    openModalEdit: (e: React.MouseEvent<HTMLButtonElement>) => void

   
}


const AdminView:React.FC<Info> = ({hola, data, suchen, setsucht, sucht, startFilter, filterLied, openModalAdmin, openModalEdit}) => {


    return (

        <div className="principal">
            <div className="teil">
            <div>
                <form onSubmit={suchen}>
                <input
                type="text"
                value={sucht}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setsucht(e.target.value)}
                className="form-control mb-3 mt-3"/>
                </form>
            </div>
            <div className="row justify-content-center">
            <button className="btn  col-auto ms-2" value={''} onClick={(e) => startFilter(e)} 
            style={{backgroundColor: filterLied === '' ? "#ed1e24" : "#ffffff", color: filterLied === '' ? "white" : "#ed1e24" }} > Alle</button>
                <button className="btn  col-auto ms-2" value={'Vorkatechumenat'} onClick={(e) => startFilter(e)} 
                style={{backgroundColor: filterLied === 'Vorkatechumenat' ? "#ed1e24" : "#ffffff", color: filterLied === 'Vorkatechumenat' ? "white" : "#ed1e24" }} >
                    Vorkatechumenat</button>
                <button className="btn  col-auto ms-2" value={'liturgisch'} onClick={(e) => startFilter(e)} 
                style={{backgroundColor: filterLied === 'liturgisch' ? "#ed1e24" : "#ffffff", color: filterLied === 'liturgisch' ? "white" : "#ed1e24" }}>Liturgisch</button>
              
                <button className="btn col-auto ms-2" value={'Katechumenat'} onClick={(e) => startFilter(e)}
                style={{backgroundColor: filterLied === 'Katechumenat' ? "#ed1e24" : "#ffffff", color: filterLied === 'Katechumenat' ? "white" : "#ed1e24" }}>Katechumenat</button>
              
               
       
           
            </div>
            <div>
                <div>
            <div className="hola2">
      {
        data.map((props, index, array) =>  (
            <div className="" key={index} >
            <ul className="list-group">
            <li onClick={hola}  value={index} 
            style={{backgroundColor: props.etappe === "liturgisch" ? "#fefff2" : props.etappe === "Katechumenat" ? "#f8f7ff" : "white"}} 
            className=" align-items-center list-group-item mt-2 shadow-sm ">
          
                <div className="text col row d-flex justify-content-between">
                    <div className="col-auto"> 
                    <div className="col row d-flex justify-content-start">
                        {/* <div className="col-auto">
                            <button style={{all: "unset"}}><FaPlayCircle size={25}/></button>
                            </div> */}
                            
                        <div className="col-auto"><p>{props.name}</p>
                        </div>
                        </div>
                        </div>
                
               <div className="col-auto">
                <div className="col row justify-content-end">
                    <div className="col-auto">
                    <button onClick={openModalEdit} style={{all: "unset"}}><MdOutlineEdit size={25} color="rgb(160, 160, 160)"/></button>
                    </div>
                    <div className="col-auto">
                    <button onClick={openModalAdmin} style={{all: "unset"}}><MdComment size={25} color="rgb(160, 160, 160)"/></button>
                    </div>
                 </div>
                </div> 
                </div>
         
            </li>
            </ul>
            </div>
        ))
      }
      </div>
      </div>
      </div>

    
</div>
           
        </div>
    )
}

export default AdminView;