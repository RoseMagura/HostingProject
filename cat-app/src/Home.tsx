import React from 'react';
import * as dotenv from 'dotenv';

interface imageObject {
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
        const apiUrl = `${process.env.REACT_APP_API_URL}/all`;
        let imageList: imageObject[] = [];
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                data.forEach((element: imageObject) => {
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
        const apiUrl = `${process.env.REACT_APP_API_URL}/id/${id}`;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                this.setState({ selectedImages: data });
            });
    };
    render() {
        return (
            <div>
                <h1>Cat Pictures</h1>
                <button onClick={this.displayAll}>See All</button>
                <div>
                    <h2>Pick By Title:</h2>
                    <select onChange={this.fetchById}>
                        <option>Select a title</option>
                        {this.state.allImages.map((i: imageObject) => (
                            <option value={i.id} key={i.id}>
                                {i.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div id="image-grid">
                    {this.state.selectedImages.map((image: imageObject) => (
                        <img key={image.id} src={image.url} alt={image.title} />
                    ))}
                </div>

            </div>
        );
    }
}

export default Home;
