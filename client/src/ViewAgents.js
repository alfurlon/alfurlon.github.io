import { useState, useEffect } from 'react';
import AgentForm from './AgentForm';
import Agent from './Agent';
import ConfirmDelete from './ConfirmDelete';

function ViewAgents() {

    const [currentView, setCurrentView] = useState("view");
    const [currentAgent, setCurrentAgent] = useState();
    const [agents, setAgents] = useState([]);

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

    const confirmDeleteAgent = (agent) => {
        setCurrentAgent(agent);
        setCurrentView("delete");
    }

    const addAgent = () => {
        setCurrentAgent();
        setCurrentView("form");
    }

    const editAgent = (agent) => {
        setCurrentAgent(agent);
        setCurrentView("form");
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

    const handleDelete = async () => {
        const url = `http://localhost:8080/api/agent/${currentAgent.agentId}`;
        const init = {
            method: "DELETE"
        };
        const response = await fetch(url, init);
        if (response.status !== 204) {
            Promise.reject("Could not delete agent!");
        }
        const nextAgents = agents.filter(a => a.agentId !== currentAgent.agentId);
        setAgents(nextAgents);
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
        const nextAgents = [...agents, agentJson];
        setAgents(nextAgents);
    }

    const updateAgent = async (agent) => {
        const url = `http://localhost:8080/api/agent/${agent.agentId}`;
        const init = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify(agent)
        };
        const response = await fetch(url, init);
        if (response.status !== 204) {
            Promise.reject(`Could not update agent: ${agent.agentId}`);
        }
        const agentIndex = agents.findIndex(a => a.agentId === agent.agentId);
        if (agentIndex > -1) {
            const nextAgents = [...agents];
            nextAgents.splice(agentIndex, 1, agent);
            setAgents(nextAgents);
        }
    }


    if (currentView === "form") {
        return <AgentForm agent={currentAgent} onSave={handleSave} onCancel={cancel}/>

    } else if (currentView === "delete") {
        return <ConfirmDelete agent={currentAgent} onConfirm={handleDelete} onCancel={cancel} />
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
                    {agents.map(a => <Agent key={a.agentId} agent={a} onEditAgent={editAgent} onDeleteAgent={confirmDeleteAgent}/>)}
                </tbody>
                </table>
    </>
}

export default ViewAgents;