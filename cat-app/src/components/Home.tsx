import { useState, useEffect } from 'react';
import { Image } from './Image';

export interface ImageObject {
    id: number;
    title: string;
    url: string;
    likes?: any[];
}

const Home = () => {
    // TODO: Replace loginStatus with prop
    const [loginStatus, setStatus] = useState(false);
    const [selectedImages, setSelected] = useState([
        { id: 0, title: '', url: '' },
    ]);
    const fetchAll = () => {
        const apiUrl = `${process.env.REACT_APP_API_URL}/images/all`;
        let imageList: ImageObject[] = [];
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                data.forEach((element: ImageObject) => {
                    imageList.push(element);
                });
                setSelected(imageList);
            })
            .catch((error) => console.error(error));
    };

    useEffect(fetchAll, []);

    return (
        <div>
            <div id="image-grid">
                {selectedImages.map(
                    (image: ImageObject) =>
                        image.title !== '' && (
                            <Image {...image} key={image.id} loginStatus={loginStatus}/>
                        )
                )}
            </div>
        </div>
    );
};

export default Home;
