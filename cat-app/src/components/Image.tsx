import { FunctionComponent, useState } from 'react';
import { ImageObject } from './Home';
import { DeleteButton } from './DeleteButton';
import { EditButton } from './EditButton';

export const Image: FunctionComponent<ImageObject> = (myProps: ImageObject) => {
    const [apiResponse, setResponse] = useState('');

    const deleteImage = (id: number) => {
        const token = `Bearer ${localStorage.getItem('token')}`;

        if (window.confirm('Are you sure you want to delete this image?')) {
            // send delete request to backend
            const url = `${process.env.REACT_APP_API_URL}/images/id/${id}`;
            fetch(url, {
                method: 'DELETE',
                headers: new Headers({ Authorization: token }),
            }).then(async (response) => {
                const feedback = await response.json(); 
                console.log(feedback);
                setResponse(feedback);
                // Reload after deleting successfully?
            });
        }
    };

    const updateImage = (image: ImageObject) => {
        console.log('editing', image);
    };

    return (
        <div>
            <img key={myProps.id} src={myProps.url} alt={myProps.title} />
            <DeleteButton id={myProps.id} onClick={deleteImage} />
            <EditButton image={myProps} onClick={updateImage} />
            <div>{apiResponse}</div>
        </div>
    );
};
