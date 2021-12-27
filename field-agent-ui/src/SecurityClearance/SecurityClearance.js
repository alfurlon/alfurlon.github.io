function SecurityClearance({ secClearance, onEditSecurityClearance, onDeleteSecurityClearance }) {
    return <>
                    <tr>
                    <th scope="row">{secClearance.securityClearanceId}</th>
                    <td>{secClearance.name}</td>
                    <td><button className="btn btn-light" onClick={() => onEditSecurityClearance(secClearance)}>Edit</button></td>
                    <td><button className="btn btn-danger" onClick={() => onDeleteSecurityClearance(secClearance)}>Delete</button></td>
                    </tr>
    </>
}

export default SecurityClearance;