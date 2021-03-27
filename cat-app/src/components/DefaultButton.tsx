import { Button } from '@material-ui/core';
import { ButtonProps } from '../interfaces/ButtonProps';

export const DefaultButton = (props: ButtonProps) => {
    const handleClick = () => {
        props.onClick(props.id);
    }
    return(
        <Button onClick={handleClick}>{props.name}</Button>
    )
}