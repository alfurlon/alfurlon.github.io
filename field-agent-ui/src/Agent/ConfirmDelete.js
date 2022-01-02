import { useEffect, useState, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { deleteById, fetchById } from "../services/agentApi";
import AuthContext from "../AuthContext";


function ConfirmDelete() {

    const [agent, setAgent] = useState({ "firstName": "" });

    const auth = useContext(AuthContext);

    const { id } = useParams();

    const history = useHistory();

    useEffect(() => {
        if (id) {
            fetchById(id)
                .then((agent) => setAgent(agent))
                .catch(() => history.push("/404"));
        }
    }, [id, history]);

    const handleDelete = () => {
        deleteById(id, auth.user.token)
            .then(() => {
                history.push("/agent");
            })
            .catch(console.log);
    }

    return <>
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>Delete {agent.lastName}?</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    This cannot be reversed.
                </div>
            </div>
            <div className="row justify-content-start">
                <div className="col-3">
                    <button className="btn btn-danger" onClick={handleDelete}>Delete Agent Record</button>
                </div>
                <div className="col-6">
                    <Link to="/agent" className="btn btn-dark">Cancel Delete</Link>
                </div>
            </div>
        </div>
    </>
}

export default ConfirmDelete;