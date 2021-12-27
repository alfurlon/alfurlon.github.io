

function Agent({ agent, onEditAgent, onDeleteAgent }) {
    return <>
                    <tr>
                    <th scope="row">{agent.agentId}</th>
                    <td>{agent.firstName}</td>
                    <td>{agent.lastName}</td>
                    <td>{agent.dob}</td>
                    <td><button className="btn btn-light" onClick={() => onEditAgent(agent)}>Edit</button></td>
                    <td><button className="btn btn-danger" onClick={() => onDeleteAgent(agent)}>Delete</button></td>
                    </tr>
    </>
}

export default Agent;