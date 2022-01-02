import { useState, useEffect } from 'react';
import { fetchImage } from "./services/NotFoundApi";

function NotFound() {

    const [imageUrl, setImageUrl] = useState([]);

    useEffect(() => {
        fetchImage()
            .then(json => setImageUrl(json))
            .catch(errors => console.log(errors));
    }, []);

    return <>
        <div>
            Oops!
        </div>
        <div>
        <img src={imageUrl["message"]} alt="dog" />
    </div>
    </>
}

export default NotFound;