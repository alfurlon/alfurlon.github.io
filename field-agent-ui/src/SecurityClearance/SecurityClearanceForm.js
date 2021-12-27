import { useState } from 'react';

const EMPTY_SEC_CLEARANCE = {
    "securityClearanceId": 0,
    "name": ""
}

function SecurityClearanceForm({ secClearance = EMPTY_SEC_CLEARANCE, onSave, onCancel }) {
    const [securityClearance, setSecurityClearance] = useState({...secClearance});

    const handleChange = (evt) => {
        const nextSecurityClearance = { ...securityClearance};
        nextSecurityClearance[evt.target.name] = evt.target.value;
        setSecurityClearance(nextSecurityClearance);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onSave(securityClearance);
    }

    return <>
            <h1>{securityClearance.securityClearanceId === 0 ? "New Security Clearance" : `Edit ${securityClearance.name}`}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" value={securityClearance.name} name="name" onChange={handleChange} required></input>
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" className="btn btn-secondary" onClick={() => onCancel()}>Cancel</button>
            </form>
    </>

}

export default SecurityClearanceForm;