import React, { useEffect, useState, MouseEvent } from "react";
import AdminView from './adminView';
import Player from "../Player/Player";
import "./admin.css"
import { Hola } from "../interfaces";
import Kommentare from "../Kommentare/kommentare";
import Editieren from "../Editieren/editieren";


const  Admin:React.FC<Hola> = () => {


  
    const [data, setData] = useState<Hola[]>([]);
    const [specificLied, setSpecificLied] = useState("")
    const [wechselLied, setWechselLied] = useState(false);
    const [aktuelLied, setAktuelLied] = useState<number>(0);
    const [sucht, setSucht] = useState("");
    const [busqueda, setBusqueda] = useState<Hola[]>(data);
    const [filterLied, setFilterLied] = useState<string>("")
    const [openModal, setOpenModal] = useState(false);
    const [level, setLevel] = useState("");
    const [openModalEdit, setOpenModalEdit] = useState(false)



const fetchData = async () => {
 try {
    const url = process.env.REACT_APP_API_URL + "/lied"
    const response = await fetch(url);
    const data = await response.json();
    
   return setData(data); }

   catch (error) {

    console.error(error);
   }


}


const suchen = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  

 }

 const gefilterteElemente = data.filter((data) => data.name?.toLowerCase().includes(sucht.toLowerCase()))

 const startFilter = (e: MouseEvent<HTMLButtonElement>) => {
 
  e.preventDefault()
setFilterLied(e.currentTarget.value);



}

const filter = filterLied === "" ? gefilterteElemente : gefilterteElemente.filter((data) => data?.etappe === filterLied);





const bringSpecificLied = async (e: MouseEvent<HTMLLIElement>) => {

  try {

   e.preventDefault();
   setWechselLied(true)
 setSpecificLied(e.currentTarget.value.toString());
 setBusqueda(filter);



  }

  catch (error) {
    console.log(`problem bringSpecificLied ${error}`)
  }

}

const openModalEditFunction = (e: React.MouseEvent<HTMLButtonElement>) => {

  setOpenModalEdit(!openModalEdit);
}

const openModalAdmin = (e: React.MouseEvent<HTMLButtonElement>) => {

    e.preventDefault();
    setOpenModal(!openModal);
    setLevel("admin")
}


useEffect(() => {

  fetchData();
    
}, [])

return (<div className="col row all">

     <div className="col-8"> <AdminView data={filter} hola={bringSpecificLied} suchen={suchen} filterLied={filterLied} 
     setsucht={setSucht} sucht={sucht} startFilter={startFilter} openModalAdmin={openModalAdmin} openModalEdit={openModalEditFunction} /> </div>
     <div className="col-4 info"><Player id={specificLied} wechselLied={wechselLied} data={busqueda}
     aktuelLied={aktuelLied} setAktuelLied={setAktuelLied} /></div> 



<Editieren
openModal={openModalEdit} 
setOpenModal={setOpenModalEdit}
aktuelLied={aktuelLied} 
data={busqueda}
id={specificLied}
setAktuelLied={setAktuelLied}

/>
   </div> 
   
      )
}

export default Admin;