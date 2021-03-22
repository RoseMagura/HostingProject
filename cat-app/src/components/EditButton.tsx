import { Button } from '@material-ui/core';
import { ImageObject } from './Home';

export interface ButtonProps {
    image?: ImageObject;
    id?: number;
    onClick: Function;
}

export const EditButton = (props: ButtonProps) => {
    const handleClick = () => {
        props.onClick(props.image);
    }
    return(
        <Button onClick={handleClick}>Edit</Button>
    )
}