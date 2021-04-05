import { Comment as CommentInterface } from '../interfaces/Comment';
import { Comment } from './Comment';
import { Button, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

export interface CommentListProps {
    array: CommentInterface[];
    imageId: number;
}

export const CommentList = (props: CommentListProps) => {
    const [commentText, setText] = useState('');
    const [comments, setComments] = useState<CommentInterface[]>([]);
    const {imageId} = props;

    useEffect(() => setComments(comments.concat(props.array)), [props.array]);

    const createComment = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent | React.KeyboardEvent<HTMLDivElement>, imageId: number) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('id');
        fetch(`${process.env.REACT_APP_API_URL}/comments`, {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Bearer ${token}`,
                'Content-type': 'application/json'
            }),
            body: JSON.stringify({ userId, imageId, 'text': commentText })
        }).then(async res => 
            {
                setComments(comments.concat(await res.json()));
            }
            );
    }

    const updateComment = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    }

    const deleteComment = () => {
        console.log(`deleting from comment list component`);
    }

    const keyPress = (e: React.KeyboardEvent<HTMLDivElement>, imageId: number) => {
        if (e.key === 'Enter') {
            createComment(e, imageId);
        }
    }
    return (
        <div>
            <div>
                {  
                    comments.map(
                        (comment: CommentInterface) =>
                                <Comment {...comment} key={`C${comment.id}`} func={deleteComment}/>
                    )
                    }
                <form onSubmit={event => createComment(event, imageId)}>
                    <TextField label='Compose a Comment'
                        onChange={updateComment}
                        onKeyDown={ev => keyPress(ev, imageId)} />
                    <Button type='submit'
                        onClick={e =>
                            createComment(e, imageId)
                        }>
                        Submit</Button>
                </form>
            </div>

        </div>
    )
}