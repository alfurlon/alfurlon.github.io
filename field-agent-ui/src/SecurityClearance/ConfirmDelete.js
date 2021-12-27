function ConfirmDelete({ secClearance, onConfirm, onCancel }) {
    return <>
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>Delete {secClearance.name}?</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                This cannot be reversed.
                </div>
            </div>
            <div className="row justify-content-start">
                <div className="col-3">
                    <button className="btn btn-danger" onClick={() => onConfirm()}>Delete Security Clearance</button>
                </div>
                <div className="col-6">
                    <button className="btn btn-dark" onClick={() => onCancel()}>Cancel Delete</button>
                </div>

            </div>
        </div>
    </>
}

export default ConfirmDelete;