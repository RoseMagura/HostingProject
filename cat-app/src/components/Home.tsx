import { useState, useEffect } from 'react';
import { BasicProps } from '../interfaces/BasicProps';
import { ImageObject } from '../interfaces/ImageObject';
import { Image } from './Image';

const Home = (props: BasicProps) => {
    const loginStatus = Boolean(props.value);
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
