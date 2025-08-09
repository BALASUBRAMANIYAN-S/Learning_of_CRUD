import { useParams } from 'react-router-dom';
import UserForm from '../components/UserForm';

function UpdateUser() {
  const { name, email,id } = useParams();


  return (
    <UserForm UserId={id} IName={name} IEmail={email} saveLabel="Update" />
  );
}

export default UpdateUser;
