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
        toggleDisplay(!displayForm); // TODO: Edit
    }
    const postImage = () => {
        console.log('creating image');
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('id');
        console.log(token, userId);
        fetch(`${process.env.REACT_APP_API_URL}/images`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({title, url, userId})
        }).then(async res => console.log(await res.json()));
    }

    const updateTitle = (event: any) => {
        setTitle(event.target.value);
    }

    const updateUrl = (e: any) => {
        setUrl(e.target.value);
    }

    useEffect(fetchAll, []);

    return (
        <div>
            <div>
                <Button onClick={toggleDisplayForm}>Post New Image</Button>
                {displayForm &&
                    <div id="post-form">
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
            </div>
            <div id="image-grid">
                {selectedImages.map(
                    (image: ImageObject) =>
                        image.title !== '' && (
                            <Image {...image} key={image.id} loginStatus={loginStatus}/>
                        )
                )}
            </div>
        </div>
    );
};

export default Home;
