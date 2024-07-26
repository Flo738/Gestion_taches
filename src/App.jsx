import { useEffect, useState } from "react";
import Ajout from "./components/Ajout.jsx";
import { db } from "./components/firebase.js";
import {
  setDoc,
  addDoc,
  collection,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot,
  updateDoc,
  getDoc,
} from "firebase/firestore"; //on importe les méthodes depuis firebase pour pouvoir intéragire avec la base de donné 
import "react-datepicker/dist/react-datepicker.css";
import Tasks from "./components/Tasks.jsx";
import { auth } from "./components/firebase.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./style/style.scss";

import Conexion from "./components/Conexion.jsx";

const App = () => {
  const [todo, setTodo] = useState([]);
  const [user, setUser] = useState(null);
  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    const Userconnexion = auth.currentUser;
    setUser(Userconnexion);

    const userchange = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => userchange();
  }, []);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "todo"), where("userId", "==", user.uid));
      const dbtodo = onSnapshot(q, (snapshot) => {
        setTodo(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().todo,
            description: doc.data().description,
            completed: doc.data().completed || false,
            date: doc.data().date.toDate(),
            number: doc.data().number,
          }))
          
        );
      });
      return () => dbtodo();
    }
  }, [user]);

  //fonction Ajouter une tache
  async function Ajouterunetache() {
    try {
      console.log("Input:", input); //utilisation de console.log pour débugger
      console.log("Start Date:", startDate);
      console.log("Description:", description);

      if (input.trim() !== "") {
        //Mise en place du compteur
        const counter = doc(db, "counters", "number"); //Dans la base de donnée, le document number dans la collection counters 

        const counterTask = await getDoc(doc(db, "counters", "number"));
        let thenumber = 1;

        if (counterTask.exists()) {
          thenumber = counterTask.data().value;
        }
        
        await addDoc(collection(db, "todo"), {
          todo: input,
          description: description,
          date: startDate,
          number: thenumber,
          userId: user.uid,
        });
        await setDoc(counter, { value: thenumber + 1 });
      }
      setInput("");
      setDescription("");
      setStartDate(new Date());
    } catch (error) {
      console.error(error.message);
    }
  }

  //fonction qui permet d'afficher une tache comme cmpléter 
  async function Tacheterminer(index) {  //index va permettre d'identifier la tache 
    const yes = doc(db, "todo", todo[index].id); // relier à la base de donnée, au document de la collection dans Firestore. L'id est utilisé pour modifier seulement la tache précise 
    await updateDoc(yes, {
      completed: true,
    });
    setTodo((endTodos) =>
      endTodos.map((tache, position) =>
        position === index ? { ...tache, completed: true } : tache
      )
    );
  }

  function Editerunetache(index) {
    setInput(todo[index].todo);
    setEditIndex(index);
    setDescription(todo[index].description);
    setStartDate(new Date(todo[index].date));
  }


  function misajour() {
    if (input.trim() !== "") {
      const updateTodo = doc(db, "todo", todo[editIndex].id);
      updateDoc(updateTodo, {
        todo: input,
        description: description,
        date: startDate,
      });
      alert("Modifié avec succès");
      setStartDate(new Date());
      setEditIndex(-1);
      setInput("");
      setDescription("");
    }
  }

  function supprimerTache(id) {
    deleteDoc(doc(db, "todo", id));
  }


  //configuration des routes pour que l'utilisateur arrive à la page connexion au début 
  
  return (
    <div className="background vh-100 overflow-auto">

      <Router> 
        <Routes>
          <Route path="/" element={<Conexion />} />
          <Route
            path="/Ajout"
            element={
              <Ajout
                todo={todo}
                Ajouterunetache={Ajouterunetache}
                Tacheterminer={Tacheterminer}
                Editerunetache={Editerunetache}
                misajour={misajour}
                supprimerTache={supprimerTache}
                editIndex={editIndex}
                input={input}
                setInput={setInput}
                startDate={startDate}
                setStartDate={setStartDate}
                description={description}
                setDescription={setDescription}
              />
            }
            //On passe tous en props car ce seront les fonctionnalités qui seront utilisées pour la page Ajout de l'app
          />
          <Route
            path="/Tasks"
            element={
              <Tasks
                todo={todo}
                Tacheterminer={Tacheterminer}
                supprimerTache={supprimerTache}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
