import { useState, useEffect } from 'react';
import { BasicProps } from '../interfaces/BasicProps';
import { ImageObject } from '../interfaces/ImageObject';
import { Image } from './Image';
import { Button, TextField } from '@material-ui/core';

const Home = (props: BasicProps) => {
    const loginStatus = Boolean(props.value);
    const [selectedImages, setSelected] = useState([
        { id: 0, title: '', url: '' },
    ]);
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [postResponse, setResponse] = useState('');
    const [displayForm, toggleDisplay] = useState(false);

    const fetchAll = () => {
        const apiUrl = `${process.env.REACT_APP_API_URL}/images/all`;
        let imageList: ImageObject[] = [];
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                data.forEach((element: ImageObject) => {
                    imageList.push(element);
                });
                setSelected(imageList);
            })
            .catch((error) => console.error(error));
    };

    const toggleDisplayForm = () => {
        toggleDisplay(!displayForm);
    }

    const postImage = () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('id');
        fetch(`${process.env.REACT_APP_API_URL}/images`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({title, url, userId})
        }).then(async res => {
            setResponse(await res.json());
            toggleDisplay(false);
            fetchAll();
        }
        );
    }

    const updateTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const updateUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    }

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
                alert(feedback);
                if(response.status === 200){
                    const filteredImages = selectedImages.filter(img => img.id !== id);
                    setSelected(filteredImages);
                }
            });
        }
    };

    useEffect(fetchAll, []);

    return (
        <div>
            <div>
                {loginStatus && <Button onClick={toggleDisplayForm}>Post New Image</Button>}
                {displayForm &&
                    <div id="image-grid">
                        <TextField 
                            id='title'
                            label='title'
                            onChange={updateTitle}/>
                        <TextField 
                            id='url'
                            label='url'
                            onChange={updateUrl}/>
                        <Button onClick={postImage}>Post</Button>
                        <Button onClick={toggleDisplayForm}>Cancel</Button>
                    </div>
                }
                <div>{postResponse}</div>
            </div>
            <div id="image-grid">
                {selectedImages.map(
                    (image: ImageObject) =>
                        image.title !== '' && (
                            <Image {...image} key={image.id} loginStatus={loginStatus} delete={deleteImage}/>
                        )
                )}
            </div>
        </div>
    );
};

export default Home;
