function ConfirmDelete({ agent, onConfirm, onCancel }) {
    return <>
        <div>
            <h1>Delete {agent.lastName}?</h1>
        </div>
        <div>
            This cannot be reversed.
        </div>
        <div>
            <button className="btn btn-danger" onClick={() => onConfirm()}>Delete Agent Record</button>
            <button className="btn btn-dark" onClick={() => onCancel()}>Cancel Delete</button>
        </div>
    </>
}

export default ConfirmDelete;