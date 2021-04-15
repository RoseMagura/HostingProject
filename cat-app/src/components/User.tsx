import { User as UserInterface } from "../interfaces/User";
import { useState, useEffect } from 'react';
import { DefaultButton } from './DefaultButton';
import { EditButton } from './EditButton';

interface UserProps {
    user: UserInterface;
    activeUser: string;
}

const User = (props: UserProps) => {
    const { user, activeUser } = props;

    const active = activeUser === String(user.id);
    const admin = localStorage.getItem('admin') === 'true';

    const deleteUser = () => {
        console.log('delete');
    }

    const updateUser = () => {
        console.log('update');
    }

    return (
        <div className={active ? 'active-user' : 'inactive'}>
            <h2>{`${user.firstName} ${user.lastName}`}</h2>
            <h3>{user.username}</h3>
            {user.admin ? <h3>Admin</h3> : <h3>Standard User</h3>}
            {(admin || activeUser === String(user.id)) ? <div>
                <DefaultButton id={user.id} onClick={deleteUser} name='Delete' />
                <EditButton item={user} onClick={updateUser} />
            </div> : null}
        </div>
    )
};

export default User;
