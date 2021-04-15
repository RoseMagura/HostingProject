import { User as UserInterface } from "../interfaces/User";
import { DefaultButton } from './DefaultButton';
import { EditButton } from './EditButton';

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

    return (
        <div className={active ? 'active-user' : 'inactive'}>
            <h2>{`${user.firstName} ${user.lastName}`}</h2>
            <h3>{user.username}</h3>
            {user.admin ? <h3>Admin</h3> : <h3>Standard User</h3>}
            {(admin || activeUser === String(user.id)) ? <div>
                <DefaultButton id={user.id} onClick={deleteFunc} name='Delete' />
                <EditButton item={user} onClick={edit} />
            </div> : null}
        </div>
    )
};

export default User;
