import Nav from "./Nav";
import image from "../assets/images/check.png";
import Footer from "./Footer";


const Tasks = ({ todo, Tacheterminer, supprimerTache }) => {  //je récupère todo ,Tacheterminer, supprimerTache passées en props depuis App.jsx car ce sont les 3 fonctionnalités que j'aurai besoin sur cette page 
  return (
    <div>
      <Nav />
      <h2 className="d-flex justify-content-center mt-5"> Vos taches à finir ! </h2>
      <div className="d-flex ">

        <ul className=" decoration d-flex justify-content-center align-items-center flex-wrap ">
          {todo.map((todo, index) => ( // on utilise .map pour iterer sur le tableau todo, index est un élement unique pour chaque tache 
            <div>
              <li
                key={index}
                className={` p-3  p-10 mt-2 col-md-4 mb-3 ${
                  todo.completed ? "tache-terminer" : ""
                }`}
              >
                <div
                  class="card d-flex justify-content-center "
                  style={{ width: "18rem" }}
                >
                  <div class="card-header"> Tache numéro : {todo.number}</div>
                  <img
                    className="card-img-top"
                    src={image}
                    style={{ width: "50%" }}
                    alt="Card image cap"
                  />
                  <div
                    className="card-body d-flex flex-column justify-content-between"
                    style={{ height: "200px" }}
                  >
                    <div className="  font-weight-bold text">
                      {" "}
                      Titre : {todo.todo}
                    </div>
                    <div className="  font-weight-bold text ">
                      {" "}
                      Description : {todo.description}
                    </div>
                    <div className=" font-weight-bold date-color">
                      {" "}
                      Tache à réaliser pour le {todo.date.toLocaleDateString()}
                    </div>
                  </div>
                  <div className="p-2">
                  <button
                    onClick={() => Tacheterminer(index)} //J'appel ma fonction TerminerTache, cette fonction est appelé avec l'index de la tache pour marquer que c'est terminé  
                    className="card-link btn  p-2 bg-primary text-white me-2 rounded bouton-hover"
                  >
                    Terminer
                  </button>
                  <button //J'appel ma fonction supprimerTache, todo.id est utilisé pour supprimer la tache selectionné 
                    onClick={() => supprimerTache(todo.id)}
                    className=" p-2 bouton btn text-white bg-danger rounded bouton-hover "
                  >
                    Supprimer
                  </button>
                  </div>
                </div>
              </li>
            </div>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Tasks;
