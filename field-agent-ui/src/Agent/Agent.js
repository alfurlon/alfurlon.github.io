import { Link } from "react-router-dom";

function Agent({ agent, onEditAgent, onDeleteAgent }) {
    return <>
                    <tr>
                    <th scope="row">{agent.agentId}</th>
                    <td>{agent.firstName}</td>
                    <td>{agent.lastName}</td>
                    <td>{agent.dob}</td>
                    <td><Link to={`/agent/edit/${agent.agentId}`} className="btn btn-light">Edit</Link></td>
                    <td><Link to={`/agent/delete/${agent.agentId}`} className="btn btn-danger">Delete</Link></td>
                    </tr>
    </>
}

export default Agent;