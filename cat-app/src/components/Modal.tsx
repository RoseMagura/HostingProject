import { ImageObject } from '../interfaces/ImageObject';
import { Button, TextField } from '@material-ui/core';
import { useState } from 'react';

interface ModalProps {
    id: number;
    title: string;
    url: string;
    func: Function;
}

export const Modal = (props: ModalProps) => {
    const { id, title, url } = props;

    const [newUrl, setUrl] = useState(url);
    const [newTitle, setTitle] = useState(title);

    const updateTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const updateUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    }

    const editImage = () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('id');
        fetch(`${process.env.REACT_APP_API_URL}/images/id/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title: newTitle, url: newUrl, userId })
        }).then(async res => {
            props.func({ res, newTitle, newUrl, changed: true });
        }
        );
    }

    const cancel = () => {
        props.func({ changed: false });
    }

    return (
        <div className='modal'>
            <form>
                <TextField label='Title' variant='outlined' onChange={updateTitle} />
                <TextField label='Url' variant='outlined' onChange={updateUrl} />
                <Button onClick={editImage}>Submit</Button>
                <Button onClick={cancel}>Cancel</Button>
            </form>
        </div>
    )
}