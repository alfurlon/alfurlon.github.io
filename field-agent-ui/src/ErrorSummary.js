function ErrorSummary({ errors }) {

    if (!errors || errors.length === 0) {
        return null;
    }

    return <>
        <div className="alert alert-danger">
            {errors.map((err, index) => <div key={index}>{err}</div>)}
        </div>
    </>

}

export default ErrorSummary;