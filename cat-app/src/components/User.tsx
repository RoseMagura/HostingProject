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

    const startEditing = () => {
        edit();
        setEditing(true);
    }

    const processResponse = async (obj: EditUserResponse) => {
        setEditing(false);
        if (obj.changed) {
            const info = await obj.res.json();
            console.log(info);
            // setResponse(String(info));

            if (Number(obj.res.status) === 200) {
                console.log('OK');
                // obj.newTitle !== title && setTitle(obj.newTitle);
                // obj.newUrl !== url && setUrl(obj.newUrl);
            }
        }

    }

    return (
        <div className={active ? 'active-user' : 'inactive'}>
            <h2>{`${user.firstName} ${user.lastName}`}</h2>
            <h3>{user.username}</h3>
            {user.admin ? <h3>Admin</h3> : <h3>Standard User</h3>}
            {(admin || activeUser === String(user.id)) ? <div>
                <DefaultButton id={user.id} onClick={deleteFunc} name='Delete' />
                <EditButton item={user} onClick={startEditing} />
            </div> : null}
            {editing && <div><UserModal id={user.id} username={user.username}
                firstName={user.firstName} lastName={user.lastName}
                password={user.password} admin={user.admin} func={processResponse} /></div>}
        </div>
    )
};

export default User;
