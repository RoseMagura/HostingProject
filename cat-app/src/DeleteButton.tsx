import { Button } from '@material-ui/core';

export const DeleteButton = (props: any) => {
    const handleClick = () => {
        props.onClick(props.value);
    }
    return(
        <Button onClick={handleClick}>Delete</Button>
    )
}