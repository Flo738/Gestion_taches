import { useState, useEffect } from "react";
import image from "../assets/images/man.png";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { Link } from "react-router-dom";

const Nav = () => {
  const [utilisateur, setUtilisateur] = useState({});

  useEffect(() => {
    const utilisateurs = onAuthStateChanged(auth, (currentUser) => {
      setUtilisateur(currentUser);
    });
    return () => utilisateurs();
  }, []);

  return (
    <div>
      <nav className="navbar background-nav w-100 p-3 ">
        <div className="container-fluid d-flex justify-content-between align-items-center ">
          <div className="d-flex align-items-center">
            {utilisateur && (
              <Link
                to="/Ajout"
                className="navbar-band text-decoration-none text-white font-weight-bold "
              >
                {" "}
                Gestion-App
              </Link>
            )}
            {utilisateur && (
              <Link
                to="/Tasks"
                className="text-decoration-none text-white ms-3"
              >
                {" "}
                Listes des Taches
              </Link>
            )}
          </div>
          <div className="d-flex ">
            {utilisateur ? (
              <p className=" font-weight-bold mt-3 me-2 text-white">{utilisateur.email}</p>
            ) : (
              <p className="mt-3 me-2 font-weight-bold text-white"> Non connecté</p>
            )}
            <img src={image} alt="profile" width="50px" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
