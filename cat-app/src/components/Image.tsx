import { useState, useEffect } from 'react';

import { EditButton } from './EditButton';
import { DefaultButton } from './DefaultButton';
import { CommentList } from './CommentList';
import { Modal } from './Modal';

import { Like } from '../interfaces/Like';
import { ImageProps } from '../interfaces/ImageProps';
import { Comment } from '../interfaces/Comment';

export const Image = (myProps: ImageProps) => {
    const [apiResponse, setResponse] = useState('');
    const [likes, setLikes] = useState<Like[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);

    const [alreadyLiked, setLike] = useState(false);
    const [myLike, setMyLike] = useState<Like | null>(null);
    const [loggedIn, setLogin] = useState(myProps.loginStatus);
    const [hover, setHover] = useState(false);
    const [editing, setEditing] = useState(false);

    const [url, setUrl] = useState(myProps.url);
    const [title, setTitle] = useState(myProps.title);

    const onHover = () => {
        setHover(true);
    }

    const onLeave = () => {
        setHover(false);
    }

    useEffect(() => {
        setLogin(myProps.loginStatus);
    }, [myProps.loginStatus]);

    // send fetch request to get the likes for the individual image
    const fetchLikes = () => {
        fetch(
            `${process.env.REACT_APP_API_URL}/likes/imageId/${myProps.id}`
        ).then(async (result) => {
            const likeList = await result.json();
            if (likeList.length > 0) {
                setLikes(likeList);
                if (localStorage.getItem('id') !== null) {
                    likeList.map((x: Like) => {
                        if (String(x.userId) === String(localStorage.getItem('id'))) {
                            setLike(true);
                            setMyLike(x);
                        }
                    }
                    );
                }
            }
        })
    };

    const fetchComments = () => {
        fetch(`${process.env.REACT_APP_API_URL}/comments/imageId/${myProps.id}`).then(
            async (res) => {
                const commentList = await res.json();
                if (commentList.length > 0) {
                    setComments(commentList);
                    // TODO: Filter to see which belong to currently logged in user
                }
            }
        )
    }

    useEffect(fetchComments, []);
    useEffect(fetchLikes, []);

    const updateImage = () => {
        setEditing(true);
    };

    const updateRes = async (status: any) => {
        setEditing(false);
        if (status.changed) {
            setResponse(await status.res.json());
            if (status.res.status === 200) {
                console.log('OK', status);
                status.newTitle !== title && setTitle(status.newTitle);
                status.newUrl !== url && setUrl(status.newUrl);
            }
        }
    }

    const likeImage = (imageId: number) => {
        const userId = String(localStorage.getItem('id'));
        fetch(`${process.env.REACT_APP_API_URL}/likes`, {
            method: 'POST',
            headers: new Headers({
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({ userId, imageId }),
        }).then(async (res) => {
            // Report only if error
            if (res.status !== 200) {
                alert(await res.json());
            }
            setLike(true);
            fetchLikes();
        });
    };

    const deleteLike = (id: number) => {
        fetch(`${process.env.REACT_APP_API_URL}/likes/id/${id}`, {
            method: 'DELETE',
            headers: new Headers({
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            })
        }).then(async (res) => {
            // Report only if error
            if (res.status !== 200) {
                alert(await res.json());
            }
            const newLikes: Like[] = likes.filter(l => l.id !== id);
            setLikes(newLikes);
            const newStatus = false;
            setLike(newStatus);
        });
    }
    return (
        <div>
            <img key={myProps.id} src={url} alt={title} />
            {loggedIn && <div id='button-bar'>
                <DefaultButton id={myProps.id} onClick={myProps.delete} name='Delete' />
                <EditButton item={myProps} onClick={updateImage} />
                {editing && <Modal id={myProps.id} title={title} url={url}
                    func={updateRes} />}
                {alreadyLiked
                    ? <DefaultButton id={myLike?.id} onClick={deleteLike} name='Unlike' />
                    : <DefaultButton id={myProps.id} onClick={likeImage} name='Like' />}
                <div>{apiResponse}</div>
            </div>}
            {likes.length > 0 && (
                <div onMouseEnter={onHover} onMouseLeave={onLeave}>
                    { hover
                        ? <div>
                            <ul>
                                {likes.map(l =>
                                    <li
                                        key={`like-user-${l.userId}`}
                                        style={{ listStyle: 'none' }}
                                    >{`${l.user?.firstName} ${l.user?.lastName}`}</li>
                                )}
                                liked this image
                            </ul>
                        </div>
                        : <div>
                            {likes.length} {likes.length > 1 ? 'Likes' : 'Like'}
                        </div>}
                </div>
            )}
            <CommentList array={comments} imageId={myProps.id} loginStatus={loggedIn} />
        </div>
    );
};
