import { Button } from '@material-ui/core';
import { ButtonProps } from '../interfaces/ButtonProps';

export const EditButton = (props: ButtonProps) => {
    const handleClick = () => {
        props.onClick(props.image);
    }
    return(
        <Button onClick={handleClick}>Edit</Button>
    )
}