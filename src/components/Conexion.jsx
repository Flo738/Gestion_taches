import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"; //on importe la méthode d'authentification de firebase pour creer un compte et se connecter 
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";

function Conexion() {
  const [enregistreremail, setEnregistrerEmail] = useState(""); //on enregistre un mail
  const [enregistrermdp, setEnregistrerMdp] = useState("");
  const [connecteremail, setConnecterEmail] = useState("");
  const [connectermdp, setConnecterMdp] = useState("");
  const navigate = useNavigate(); //useNavigate va peermettre aux utilisateurs de se rendre directment à la page des Ajout de l'App une fois connecté

  const enregistrer = async (e) => {
    e.preventDefault(); // on utilise prevent default pour éviter le comportement par default qui creer un bug en rechargeant la page
    try {
      const utilisateur = await createUserWithEmailAndPassword(  //utilisation méthode de création de compte de firbase 
        auth,
        enregistreremail,
        enregistrermdp
      );
      setConnecterMdp("");
      navigate("./Ajout");
    } catch (error) {
      console.error(error.message);
    }
  };

  const connecter = async (e) => {
    e.preventDefault();
    try {
      const utilisateur = await signInWithEmailAndPassword(
        auth,
        connecteremail,
        connectermdp
      );
      setConnecterMdp;
      navigate("./Ajout");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <Nav />
      <h2 className="d-flex align-items-center justify-content-center title mt-3">
        {" "}
        Bienvenue sur votre Appli de gestion de taches{" "}
      </h2>
      <div className="d-flex flex-wrap flex-column">
      <div className="d-flex  flex-wrap justify-content-center align-items-start mt-5">
        <div className="d-flex flex-column  background-connexion align-items-center me-2 vh-auto  w-25">
          <h3 className="d-flex justify-content-center flex-column align-items-center mt-5 title">
            {" "}
            Création de compte{" "}
          </h3>
          <form
            className="d-flex  equal-height  flex-column align-items-center w-100"
            onSubmit={enregistrer}
          >
            <label className="text-start w-50"> Email</label>
            <input
              className="p-2 w-50 bg-light d-flex flex-column justify-content-center align-items-center rounded"
              onChange={(e) => setEnregistrerEmail(e.target.value)}
              type="email"
              placeholder="email"
            />
            <label className="text-start w-50"> Mot de passe </label>
            <input
              className="p-2 w-50 bg-light d-flex flex-column justify-content-center align-items-center rounded"
              onChange={(e) => setEnregistrerMdp(e.target.value)}
              type="password"
              placeholder="mot de passe"
            />
            <button
              className="p-2 w-50 mt-5 rounded bouton-hover"
              type="submit"
            >
              {" "}
              Creer un utilisateur
            </button>
          </form>
        </div>
        <div className="d-flex flex-column background-connexion align-items-center me-2 vh-auto  w-25">
          <h3 className="d-flex flex-row justify-content-center flex-column align-items-center title mt-5 w-100">
            {" "}
            Se connecter{" "}
          </h3>
          <form
            className="d-flex  equal-height  flex-column align-items-center w-100"
            onSubmit={connecter}
          >
            <label className="text-start w-50"> Email</label>
            <input
              className="p-2 w-50 bg-light d-flex flex-column justify-content-center align-items-center rounded"
              onChange={(e) => setConnecterEmail(e.target.value)}
              type="email"
              placeholder="email"
            />
            <label className="text-start w-50"> Mot de passe </label>
            <input
              className="p-2 w-50 bg-light d-flex flex-column justify-content-center align-items-center rounded"
              onChange={(e) => setConnecterMdp(e.target.value)}
              type="password"
              placeholder="mot de passe"
            />
            <button
              className="p-2 w-50 mt-5 rounded bouton-hover"
              type="submit"
            >
              {" "}
              Se connecter 
            </button>
          </form>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default Conexion;
