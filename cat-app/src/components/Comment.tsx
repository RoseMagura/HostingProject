import { Comment as CommentInterface } from "../interfaces/Comment";
import { DefaultButton } from "./DefaultButton"

export const Comment = (props: CommentInterface) => {

    return (
        <div>
            <div>
                {`${props.user !== undefined && props.user.firstName} ${props.user !== undefined && props.user.lastName}: 
                ${props.text}`}
            </div>
            {/* TODO: Only visible if admin or the commenter */}
            {props.loginStatus &&
                <div>
                    <DefaultButton onClick={() => props.delete(props.id)} name='Delete' />
                    <DefaultButton onClick={() => props.edit(props.id)} name='Edit' />
                </div>}
        </div>
    )
}