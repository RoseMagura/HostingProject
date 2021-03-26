import { FunctionComponent, useState, useEffect } from 'react';
import { ImageObject } from './Home';
import { EditButton } from './EditButton';
import { DefaultButton } from './DefaultButton';

// TODO: Separate interfaces into own folder + files
export interface Like {
    id: number;
    imageId: number;
    userId: number;
}

export interface User {
    id: number;
    firstName?: string;
    lastName?: string;
    password?: string;
    admin: boolean;
}

export const Image: FunctionComponent<ImageObject> = (myProps: ImageObject) => {
    const [apiResponse, setResponse] = useState('');
    const [likes, setLikes] = useState<Like[]>([]);
    const [alreadyLiked, setLike] = useState(false);
    const [myLike, setMyLike] = useState<Like | null>(null);
    const [currUser, setUser] = useState<User | null>(null);

    // set up user and adjust UI accordingly
    const userData = localStorage.getItem('id');
    useEffect(() => {
        console.log(userData);
        if(userData !== null) {
            // console.log(localStorage);
            const id = parseInt(userData);
            const admin = Boolean(localStorage.getItem('admin'));
            setUser({id, admin});
        } else {
            console.log('logged out');
            setUser(null);
        }
    }, [localStorage]);

    // console.log(currUser);

    // send fetch request to get the likes for the individual image
    const fetchLikes = () => {
        fetch(
            `${process.env.REACT_APP_API_URL}/likes/imageId/${myProps.id}`
        ).then(async (result) => {
            const likeList = await result.json();
            if (likeList.length > 0) {
                setLikes(likeList);
                if(localStorage.getItem('user') !== null){
                    likeList.map((x: Like) => {
                        if (String(x.userId) === String(localStorage.getItem('user'))) {
                            setLike(true);
                            setMyLike(x);
                        }
                    }
                    );
            }
            }
        })
    };

    useEffect(fetchLikes, []);

    const deleteImage = (id: number) => {
        const token = `Bearer ${localStorage.getItem('token')}`;

        if (window.confirm('Are you sure you want to delete this image?')) {
            // send delete request to backend
            const url = `${process.env.REACT_APP_API_URL}/images/id/${id}`;
            fetch(url, {
                method: 'DELETE',
                headers: new Headers({ Authorization: token }),
            }).then(async (response) => {
                const feedback = await response.json();
                setResponse(feedback);
                // Reload after deleting successfully?
            });
        }
    };

    const updateImage = (image: ImageObject) => {
        console.log('editing', image);
    };

    const likeImage = (imageId: number) => {
        const userId = String(localStorage.getItem('user'));
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
        }).then(() => {
            console.log('running', likes.length);
        }
        );
    }
    return (
        <div>
            <img key={myProps.id} src={myProps.url} alt={myProps.title} />
            {currUser !== null && <div>logged in</div>}
            <div id='button-bar'>
                <DefaultButton id={myProps.id} onClick={deleteImage} name='Delete' />
                <EditButton image={myProps} onClick={updateImage} />
                {alreadyLiked
                    ? <DefaultButton id={myLike?.id} onClick={deleteLike} name='Unlike' />
                    : <DefaultButton id={myProps.id} onClick={likeImage} name='Like' />}
                {likes.length > 0 && (
                    <div>
                        {likes.length} {likes.length > 1 ? 'Likes' : 'Like'}
                    </div>
                )}
                <div>{apiResponse}</div>
            </div>
        </div>
    );
};
