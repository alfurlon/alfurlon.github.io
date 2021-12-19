import { useState, useEffect } from 'react';
import SecurityClearance from './SecurityClearance';
import SecurityClearanceForm from './SecurityClearanceForm';
import ConfirmDelete from '../SecurityClearance/ConfirmDelete';

function ViewSecurityClearance() {

    const [currentView, setCurrentView] = useState("view");
    const [currentSecClearance, setCurrentSecClearance] = useState();
    const [secClearances, setSecClearances] = useState([]);

    useEffect(() => {
        const fetchAll = async () => {
            const url = "http://localhost:8080/api/security/clearance";
            const response = await fetch(url);
            if (response.status !== 200) {
                Promise.reject("Could not fetch all Security Clearances!");
            }
            const scJson = await response.json();
            setSecClearances(scJson);
        };
        fetchAll();
    }, []);

    const confirmDeleteSecurityClearance = (secClearance) => {
        setCurrentSecClearance(secClearance);
        setCurrentView("delete");
    }

    const addSecClearance = () => {
        setCurrentSecClearance();
        setCurrentView("form");
    }

    const cancel = () => {
        setCurrentSecClearance();
        setCurrentView("view");
    }

    const editSecClearance = (secClearance) => {
        setCurrentSecClearance(secClearance);
        setCurrentView("form");
    }

    const handleSave = async (secClearance) => {
        if (secClearance.securityClearanceId > 0) {
            updateSecClearance(secClearance);
        } else {
            createSecClearance(secClearance);
        }
        setCurrentView("view");
    }

    const handleDelete = async () => {
        const url = `http://localhost:8080/api/agent/${currentSecClearance.securityClearanceId}`;
        const init = {
            method: "DELETE"
        };
        const response = await fetch(url, init);
        if (response.status !== 204) {
            Promise.reject("Could not delete agent!");
        }
        const nextSecClearances = secClearances.filter(s => s.securityClearanceId !== currentSecClearance.securityClearanceId);
        setSecClearances(nextSecClearances);
        setCurrentView("view");
    }

    const updateSecClearance = async (secClearance) => {
        const url = `http://localhost:8080/api/security/clearance/${secClearance.securityClearanceId}`;
        const init = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify(secClearance)
        };
        const response = await fetch(url, init);
        if (response.status !== 204) {
            Promise.reject(`Could not update Security Clearance: ${secClearance.securityClearanceId}`);
        }
        const secClearanceIndex = secClearances.findIndex(s => s.securityClearanceId === secClearance.securityClearanceId);
        if (secClearanceIndex > -1) {
            const nextSecurityClearances = [...secClearances];
            nextSecurityClearances.splice(secClearanceIndex, 1, secClearance);
            setSecClearances(nextSecurityClearances);
        }
    }

    const createSecClearance = async (secClearance) => {
        const url = "http://localhost:8080/api/security/clearance";
        const init = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            method: "POST",
            body: JSON.stringify(secClearance)
        };

        const response = await fetch(url, init);
        if (response.status !== 201) {
            Promise.reject("Agent not created.");
        }
        const scJson = await response.json();
        const nextSecurityClearances = [...secClearances, scJson];
        setSecClearances(nextSecurityClearances);
    }

    if (currentView === "form") {
        return <SecurityClearanceForm secClearance={currentSecClearance} onSave={handleSave} onCancel={cancel}/>
    } else if (currentView === "delete") {
        return <ConfirmDelete secClearance={currentSecClearance} onConfirm={handleDelete} onCancel={cancel} />
    }

    return <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-4">
                        <button className="btn btn-info" onClick={addSecClearance}>Add Security Clearance</button>
                    </div>
                </div>
                <div className="row">
                    <table className="table table-dark table-hover">
                    <thead>
                        <tr>
                        <th scope="col">Security Clearance Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {secClearances.map(s => <SecurityClearance key={s.securityClearanceId} secClearance={s} onEditSecurityClearance={editSecClearance} onDeleteSecurityClearance={confirmDeleteSecurityClearance}/>)}
                    </tbody>
                    </table>

                </div>
            </div>
    </>
}

export default ViewSecurityClearance;