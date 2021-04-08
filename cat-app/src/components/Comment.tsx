import { Comment as CommentInterface } from "../interfaces/Comment";
import { DefaultButton } from "./DefaultButton"

export const Comment = (props: CommentInterface) => {

    const editComment = () => {
        console.log('editing');
    }
    return (
        <div>
            <div>
                {`${props.user !== undefined && props.user.firstName} ${props.user !== undefined && props.user.lastName}: 
                ${props.text}`}
            </div>
            {/* TODO: Only visible if admin or the commenter */}
            {props.loginStatus &&
                <div>
                    <DefaultButton onClick={() => props.func(props.id)} name='Delete' />
                    <DefaultButton onClick={editComment} name='Edit' />
                </div>}
        </div>
    )
}