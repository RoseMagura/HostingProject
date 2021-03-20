import React from 'react';
import * as dotenv from 'dotenv';
import { Image } from './Image';
import { Button, Select, MenuItem } from '@material-ui/core';

export interface ImageObject {
    id: number;
    title: string;
    url: string;
}

class Home extends React.Component {
    state = {
        allImages: [],
        selectedImages: [],
    };

    componentDidMount() {
        dotenv.config();
        this.fetchAll();
    }

    fetchAll = () => {
        const apiUrl = `${process.env.REACT_APP_API_URL}/images/all`;
        let imageList: ImageObject[] = [];
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                data.forEach((element: ImageObject) => {
                    imageList.push(element);
                });
                this.setState({ allImages: imageList });
            })
            .catch((error) => console.error(error));
    };

    displayAll = () => {
        this.setState({ selectedImages: this.state.allImages });
    };

    fetchById = (event: any) => {
        const id = event.target.value;
        const apiUrl = `${process.env.REACT_APP_API_URL}/images/id/${id}`;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data: ImageObject) => {
                this.setState({ selectedImages: [data] });
            });
    };
    render() {
        return (
            <div>
                <h1>CatBook</h1>
                <Button onClick={this.displayAll}>See All</Button>
                <div>
                    <h2>Pick By Title:</h2>
                    <Select 
                        onChange={this.fetchById}
                        displayEmpty>
                        <MenuItem value="" disabled>
                            Select a title
                        </MenuItem>
                        {this.state.allImages.map((i: ImageObject) => (
                            <MenuItem
                                value={i.id}
                                key={i.id}
                                data-testid="select-MenuItem"
                            >
                                {i.title}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                <div id="image-grid">
                    {this.state.selectedImages.map((image: ImageObject) => (
                        <Image {...image} key={image.id}/>
                    ))}
                </div>
            </div>
        );
    }
}

export default Home;
