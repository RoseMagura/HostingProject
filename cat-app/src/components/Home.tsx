import { useState, useEffect } from 'react';
import { Image } from './Image';
import { Button, Select, MenuItem } from '@material-ui/core';
import { AppHeader } from './AppHeader';

export interface ImageObject {
    id: number;
    title: string;
    url: string;
}

const Home = () => {
    const [allImages, setImages] = useState([{ id: 0, title: '', url: '' }]);
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
                setImages(imageList);
                setSelected(imageList);
            })
            .catch((error) => console.error(error));
    };

    useEffect(fetchAll, []);
    // fetchAll();

    const displayAll = () => {
        setSelected(allImages);
    };

    const fetchById = (event: any) => {
        const id = event.target.value;
        const apiUrl = `${process.env.REACT_APP_API_URL}/images/id/${id}`;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data: ImageObject) => {
                setSelected([data]);
            });
    };

    return (
        <div>
            {/* <AppHeader /> */}
            {/* <Button onClick={displayAll}>See All</Button> */}
            {/* <div>
                <h2>Pick By Title:</h2>
                <Select onChange={fetchById} value="" displayEmpty>
                    <MenuItem value="" disabled>
                        Select a title
                    </MenuItem>
                    {allImages.map((i: ImageObject) => (
                        <MenuItem
                            value={i.id}
                            key={i.id}
                            data-testid="select-MenuItem"
                        >
                            {i.title}
                        </MenuItem>
                    ))}
                </Select>
            </div> */}
            <div id="image-grid">
                {selectedImages.map(
                    (image: ImageObject) =>
                        image.title !== '' && (
                            <Image {...image} key={image.id} />
                        )
                )}
            </div>
        </div>
    );
};

export default Home;
