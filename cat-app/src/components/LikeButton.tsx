import { Button } from '@material-ui/core';
import { ButtonProps } from './EditButton';

export const LikeButton = (props: ButtonProps) => {
    const handleClick = () => {
        props.onClick(props.id);
    }
    return(
        <Button onClick={handleClick}>Like</Button>
    )
}