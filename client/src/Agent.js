

function Agent({ agent, onEditAgent }) {
    return <>
                    <tr>
                    <th scope="row">{agent.agentId}</th>
                    <td>{agent.firstName}</td>
                    <td>{agent.lastName}</td>
                    <td>{agent.dob}</td>
                    <td><button className="btn btn-light" onEditAgent={() => onEditAgent(agent)}>Edit</button></td>
                    <td><button className="btn btn-danger">Delete</button></td>
                    </tr>
    </>
}

export default Agent;