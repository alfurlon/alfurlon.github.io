import { useState, useEffect } from 'react';
import Agent from './Agent';
import { fetchAll } from "../services/agentApi";
import { Link } from "react-router-dom";

function ViewAgents() {

    const [agents, setAgents] = useState([]);

    useEffect(() => {
        fetchAll()
            .then(json => setAgents(json))
            .catch(errors => console.log(errors));
    }, []);

    return <>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-3">
                    {/* <button className="btn btn-info" onClick={addAgent}>Add Agent</button> */}
                    <Link to="/agent/add" className="btn btn-info">Add Agent</Link>
                </div>
            </div>
            <div className="row">
                <table className="table table-dark table-hover">
                <thead>
                    <tr>
                    <th scope="col">Agent Id</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Date of Birth</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {agents.map(a => <Agent key={a.agentId} agent={a} />)}
                    {/* onEditAgent={editAgent} onDeleteAgent={confirmDeleteAgent} */}
                </tbody>
                </table>

            </div>
        </div>
    </>
}

export default ViewAgents;