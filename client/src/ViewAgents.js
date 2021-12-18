import { useState, useEffect } from 'react';
import AgentForm from './AgentForm';
import Agent from './Agent';
import ConfirmDelete from './ConfirmDelete';

function ViewAgents() {

    const [currentView, setCurrentView] = useState("view");
    const [currentAgent, setCurrentAgent] = useState();
    const [Agents, setAgents] = useState([]);

    useEffect(() => {
        const fetchAll = async () => {
            const url = "http://localhost:8080/api/agent";
            const response = await fetch(url);
            if (response.status !== 200) {
                Promise.reject("Could not fetch all Agents!");
            }
            const agentJson = await response.json();
            setAgents(agentJson);
        };
        fetchAll();
    }, []);

    const addAgent = () => {
        setCurrentAgent();
        setCurrentView("form");
    }

    const editAgent = () => {
        
    }

    const cancel = () => {
        setCurrentAgent();
        setCurrentView("view");
    }

    const handleSave = async (agent) => {
        if (agent.agentId > 0) {
            updateAgent(agent);
        } else {
            createAgent(agent);
        }
        setCurrentView("view");
    }

    const createAgent = async (agent) => {
        const url = "http://localhost:8080/api/agent";
        const init = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            method: "POST",
            body: JSON.stringify(agent)
        };

        const response = await fetch(url, init);
        if (response.status !== 201) {
            Promise.reject("Agent not created.");
        }
        const agentJson = await response.json();
        const nextAgents = [...Agents, agentJson];
        setAgents(nextAgents);
    }

    const updateAgent = async (agent) => {

    }


    if (currentView === "form") {
        return <AgentForm agent={currentAgent} onSave={handleSave} onCancel={cancel}/>

    } else if (currentView === "delete") {

    }

    return <>
                <div>
                    <button className="btn btn-outline-info" onClick={addAgent}>Add Agent</button>
                </div>
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
                    {Agents.map(a => <Agent key={a.agentId} agent={a} />)}
                </tbody>
                </table>
    </>
}

export default ViewAgents;