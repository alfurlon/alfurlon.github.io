import { useState, useEffect, useContext } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import { fetchById, save } from "../services/agentApi";
import ErrorSummary from '../ErrorSummary';
import AuthContext from '../AuthContext';

const EMPTY_AGENT = {
    "agentId": 0,
    "firstName": "",
    "middleName": "",
    "lastName": "",
    "dob": "",
    "heightInInches": 0,
    "agencies": []
}

function AgentForm({ onSave }) {
    const [theAgent, setTheAgent] = useState(EMPTY_AGENT);
    const [errors, setErrors] = useState([]);

    const auth = useContext(AuthContext);

    const { id } = useParams();

    const history = useHistory();

    useEffect(() => {
        if (id) {
            fetchById(id)
                .then(setTheAgent)
                .catch(console.log);
        }
    }, [id]);

    const handleChange = (evt) => {
        const nextAgent = { ...theAgent};
        nextAgent[evt.target.name] = evt.target.value;
        setTheAgent(nextAgent);
    }
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        save(theAgent, auth.user.token)
            .then(() => {
                history.push("/agent");
            })
            .catch(setErrors);
    }

    return <>
    <h1>{theAgent.agentId === 0 ? "New Agent" : `Edit ${theAgent.lastName}`}</h1>
    <form onSubmit={handleSubmit}>
        <div>
            <label className="form-label">First Name</label>
            <input type="text" className="form-control" value={theAgent.firstName} name="firstName" onChange={handleChange} required></input>
        </div>
        <div>
            <label className="form-label">Middle Name</label>
            <input type="text" className="form-control" value={theAgent.middleName} name="middleName" onChange={handleChange} required></input>
        </div>
        <div>
            <label className="form-label">Last Name</label>
            <input type="text" className="form-control" value={theAgent.lastName} name="lastName" onChange={handleChange} required></input>
        </div>
        <div>
            <label className="form-label">Date of Birth</label>
            <input type="date" className="form-control" value={theAgent.dob} name="dob" onChange={handleChange} required></input>
        </div>
        <div>
            <label className="form-label">Height in Inches</label>
            <input type="number" min="36" max="96" className="form-control" value={theAgent.heightInInches} name="heightInInches" onChange={handleChange} required></input>
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
        <Link to="/agent" className="btn btn-secondary">Cancel</Link>
    </form>
    <ErrorSummary errors={errors} />
    </>
}

export default AgentForm;