import { FunctionComponent } from 'react';
import { ImageObject } from './Home';
import { Button } from '@material-ui/core';

export const Image: FunctionComponent<ImageObject> = (myProps: ImageObject) => {
    return (
        <div>
            <img key={myProps.id} src={myProps.url} alt={myProps.title} />
            <Button>DELETE</Button>
            <Button>UPATE</Button>
        </div>
    );
};
