import { Comment as CommentInterface} from '../interfaces/Comment';
import { Comment } from './Comment';

export const CommentList = (props: any) => {
    console.log(props);
    return(
        <div>
            {
            props.comments.map(
                (comment: CommentInterface) =>                     
                    <Comment comment={comment}/>
            )}

        </div>
    )
}