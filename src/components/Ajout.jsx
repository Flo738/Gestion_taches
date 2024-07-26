import React from "react";
import Nav from "./Nav";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import image from '../assets/images/check.png'
import { Link } from "react-router-dom";
import Calendar from 'react-calendar';
import Footer from "./Footer";


const Ajout = ({
  todo,
  input,
  setInput,
  editIndex,
  misajour,
  Ajouterunetache,
  Editerunetache,
  startDate,
  setStartDate,
  description, 
  setDescription
})  => {
 

  function Calendrier({ value, onChange}) {

    const [datechoisi, setDateChoisi] = useState(value);

    const nouvelledate = (date) => {
      setDateChoisi(date);
      onChange(date);
    
    }

    return (
      <div>
        <Calendar onChange={nouvelledate} value={ datechoisi } />
      </div>
    );

  }
  
  
  const navigate = useNavigate();

  async function deconnecter (){
  await signOut(auth)
  navigate('/')
}; 


  return (
    <div>
      <Nav />
      <div className="d-flex flex-wrap justify-content-between align-items-center p-2">
      <img src={image} alt="10px" width="100px d-flex justify-content-center" />
      <h1 className="mb-0 title-app"> Vos taches n'attendent plus que vous ! </h1>
      <div className="d-flex flex-column">
      <button className="d-inline p-2  background-nav  rounded bouton-hover "> <Link to='/Tasks' className="text-decoration-none text-white"> Ma Liste </Link> </button>
      <button className="d-inline p-2 bg-danger text-white rounded bouton-hover mt-2" onClick={deconnecter}> Se déconnecter</button>
      </div>
      </div>
      <h2 className="d-flex justify-content-center mt-5"> Qu'avez-vous prévu de faire aujourd'hui ? </h2>
      <div className=" d-flex flex-wrap justify-content-center align-itmems-center mt-5 ">
        <div className=" d-flex flex-column  justify-content-center align-items-center mx-3 background-ajt mt-1">
          <h3 className="p-2"> Ajouter une nouvelle tache </h3>
          <div className="d-flex flex-column flex-fill p-4">
            <input
              type="text"
              placeholder="Ajouter un titre"
              className="p-2 w-100 rounded"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description "
              className="p-2 w-100 rounded mt-1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          <DatePicker className="mt-1 rounded" selected={startDate} onChange={(date) => setStartDate(date)}  Calendrier={Calendrier}/>
      <button
              onClick={editIndex === -1 ? Ajouterunetache : misajour }
              className="w-100 p-2 mt-2 rounded bouton-hover"
            >
              Ajouter
            </button>
            {editIndex === -1 ? " Nouvelle tache ?  😁" : "Modification ?   🤔"}
          </div>
        </div>
        <div className=" d-flex justify-content-center  flex-column w-50% h-50 d-inline-block">
          <div className="text-center mb-4 border-bottom border-2  ">
            <h3 className="p-2"> Liste des taches</h3>
          </div>
          <ul className="list-group list-group-flush">
            {todo.map((todo, index) => (
              <li
                key={index}
                className={`d-flex justify-content-center align-items-center p-3  background-li p-10 mt-2 ${todo.completed ? 'tache-terminer' : ''}`}
                >
                <div className="d-flex flex-column">
                <div className="p-2 mt-2 font-weight-bold text"> Titre : {todo.todo}</div>
                <div className="p-2 mt-2 font-weight-bold text "> Description : {todo.description}</div>
                </div>
                <button
                  onClick={() => Editerunetache(index)}
                  className="d-inline p-2 bouton text-white me-2 rounded bouton-hover"
                >
                  Modifier
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Ajout;
