import { FunctionComponent, useState } from 'react';
import { ImageObject } from './Home';
import { Button } from '@material-ui/core';
import { DeleteButton } from './DeleteButton';

export const Image: FunctionComponent<ImageObject> = (myProps: ImageObject) => {
    const [apiResponse, setResponse] = useState('');

    const deleteImage = (id: number) => {
        if (window.confirm('Are you sure you want to delete this image?')) {
            // send delete request to backend
            const url = `${process.env.REACT_APP_API_URL}/images/id/${id}`;
            console.log(url);
            fetch(url, { method: 'DELETE' }).then((response) => {
                console.log(response.statusText);
                setResponse(`${response.status}: ${response.statusText}`);
            });
        }
    };

    return (
        <div>
            <img key={myProps.id} src={myProps.url} alt={myProps.title} />
            <DeleteButton value={myProps.id} onClick={deleteImage} />
            <Button>UPATE</Button>
            <div>{apiResponse}</div>
        </div>
    );
};
