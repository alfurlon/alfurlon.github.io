function ConfirmDelete({ secClearance, onConfirm, onCancel }) {
    return <>
        <div>
            <h1>Delete {secClearance.name}?</h1>
        </div>
        <div>
            This cannot be reversed.
        </div>
        <div>
            <button className="btn btn-danger" onClick={() => onConfirm()}>Delete Security Clearance</button>
            <button className="btn btn-dark" onClick={() => onCancel()}>Cancel Delete</button>
        </div>
    </>
}

export default ConfirmDelete;