import { Comment as CommentInterface} from "../interfaces/Comment";
import { DefaultButton } from "./DefaultButton"

export const Comment = (props: CommentInterface) => {
    const deleteComment = () => {
        console.log('deleting');
    }

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
            <div>
                <DefaultButton onClick={deleteComment} name='Delete'/>
                <DefaultButton onClick={editComment} name='Edit'/>
            </div>
        </div>
    )
}