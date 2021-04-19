import { useState } from "react";
import { EditUserResponse } from "../interfaces/EditUserResponse";
import { User as UserInterface } from "../interfaces/User";
import { DefaultButton } from './DefaultButton';
import { EditButton } from './EditButton';
import { UserModal } from './UserModal';

interface UserProps {
    user: UserInterface;
    activeUser: string;
    deleteFunc: Function;
    edit: Function;
}

const User = (props: UserProps) => {
    const { user, activeUser, deleteFunc, edit } = props;

    const active = activeUser === String(user.id);
    const admin = localStorage.getItem('admin') === 'true';
    const [editing, setEditing] = useState(false);

    const [firstName, setFirstName] = useState(user.firstName);
    const [username, setUsername] = useState(user.username);
    const [lastName, setLastName] = useState(user.lastName);
    const [adminStatus, setAdminStatus] = useState(user.admin);

    const startEditing = () => {
        edit();
        setEditing(true);
    }

    const processResponse = async (obj: EditUserResponse) => {
        setEditing(false);
        if (obj.changed) {
            if (Number(obj.res.status) === 200) {
                obj.newFirstName !== firstName && setFirstName(obj.newFirstName);
                obj.newLastName !== lastName && setLastName(obj.newLastName);
                obj.newUsername !== username && setUsername(obj.newUsername);
                obj.newAdminStatus !== adminStatus && setAdminStatus(obj.newAdminStatus);
            }
        }

    }

    return (
        <div className={active ? 'active-user' : 'inactive'}>
            <h2>{`${firstName} ${lastName}`}</h2>
            <h3>{username}</h3>
            {adminStatus ? <h3>Admin</h3> : <h3>Standard User</h3>}
            {(admin || activeUser === String(user.id)) ? <div>
                <DefaultButton id={user.id} onClick={deleteFunc} name='Delete' />
                <EditButton item={user} onClick={startEditing} />
            </div> : null}
            {editing && <div><UserModal id={user.id} username={username}
                firstName={firstName} lastName={lastName}
                password={user.password} admin={adminStatus} func={processResponse} /></div>}
        </div>
    )
};

export default User;
