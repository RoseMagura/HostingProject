import { Comment as CommentInterface } from "../interfaces/Comment";
import { DefaultButton } from "./DefaultButton";
import { ChangeEvent, useState } from 'react';
import { TextField, Button } from '@material-ui/core';

export const Comment = (props: CommentInterface) => {
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(props.text);

    const edit = () => {
        setEditing(true);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    }

    const submit = () => {
        props.edit(props.id, text);
        setEditing(false);
    }

    const cancel = () => {
        setEditing(false);
    }

    return (
        <div>
            {editing
                ? <div>
                    {`${props.user !== undefined && props.user.firstName} ${props.user !== undefined && props.user.lastName}:`}
                    <TextField
                        type='text'
                        placeholder={String(props.text)}
                        onChange={handleChange}
                    ></TextField>
                    <Button onClick={submit}>Submit Changes</Button>
                    <Button onClick={cancel}>Cancel</Button>
                </div>
                : <div>
                    {`${props.user !== undefined && props.user.firstName} ${props.user !== undefined && props.user.lastName}: 
                            ${props.text}`}
                </div>
            }

            {/* TODO: Only visible if admin or the commenter */}
            {props.loginStatus &&
                <div>
                    <DefaultButton onClick={() => props.delete(props.id)} name='Delete' />
                    <DefaultButton onClick={edit} name='Edit' />
                </div>}
        </div>
    )
}