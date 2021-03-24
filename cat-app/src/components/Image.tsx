import { FunctionComponent, useState } from 'react';
import { ImageObject } from './Home';
import { DeleteButton } from './DeleteButton';
import { EditButton } from './EditButton';
import { LikeButton } from './LikeButton';

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
                setResponse(feedback);
                // Reload after deleting successfully?
            });
        }
    };

    const updateImage = (image: ImageObject) => {
        console.log('editing', image);
    };

    const likeImage = (imageId: number) => {
        const userId = String(localStorage.getItem('user'));
        fetch(`${process.env.REACT_APP_API_URL}/likes`, {
            method: 'POST',
            headers: new Headers({ 
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({userId, imageId})
        }).then(async (res) => alert(await res.json()));
    }

    return (
        <div>
            <img key={myProps.id} src={myProps.url} alt={myProps.title} />
            <DeleteButton id={myProps.id} onClick={deleteImage} />
            <EditButton image={myProps} onClick={updateImage} />
            <LikeButton id={myProps.id} onClick={likeImage}/>
            <div>{apiResponse}</div>
        </div>
    );
};
