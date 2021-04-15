import { useState, useEffect } from 'react';
import { BasicProps } from '../interfaces/BasicProps';
import { User as UserInterface } from '../interfaces/User';

import User from "./User"

const UserList = (props: any) => {
    const [users, setUsers] = useState<UserInterface[]>([]);

    useEffect(() => console.log(props), []);

    const fetchAll = () => {
        const apiUrl = `${process.env.REACT_APP_API_URL}/users/all`;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
            })
            .catch((error) => console.error(error));
    };

    useEffect(fetchAll, []);

    return (
        <div>
            <ul>
                {users.map(user =>
                    <li key={user.id}><User user={user} activeUser={props.value} /></li>
                )
                }
            </ul>
        </div>
    )
};

export default UserList;
