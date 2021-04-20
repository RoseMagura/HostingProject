import { useState, useEffect } from 'react';
import { User as UserInterface } from '../interfaces/User';

import User from "./User"

interface UserListProps {
    value: string | null;
}

const UserList = (props: UserListProps) => {
    const [users, setUsers] = useState<UserInterface[]>([]);
    const [apiResponse, setResponse] = useState('');

    const fetchAll = () => {
        const apiUrl = `${process.env.REACT_APP_API_URL}/users/all`;
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
            })
            .catch((error) => console.error(error));
    };

    const deleteUser = (id: number) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            const token = `Bearer ${localStorage.getItem('token')}`;
            fetch(`http://localhost:8080/users/id/${id}`,
                {
                    method: 'DELETE',
                    headers: new Headers({ Authorization: token }),
                }).then(async res => {
                    setResponse(await res.json());
                    if (res.status === 200) {
                        const filteredUsers = users.filter(u => u.id !== id);
                        setUsers(filteredUsers);
                    }
                }
                )
        }
    }

    useEffect(fetchAll, []);

    return (
        <div>
            <ul>
                {users.map(user =>
                    <li key={user.id}>
                        <User user={user} activeUser={String(props.value)}
                            deleteFunc={deleteUser} />
                    </li>
                )
                }
            </ul>
            {apiResponse}
        </div>
    )
};

export default UserList;
