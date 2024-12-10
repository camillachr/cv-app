import { Link, useNavigate } from "react-router-dom";
import { useGetAllUsersQuery } from "../../redux/apiSlice";
import { ROUTES } from "../../routes/AppRoutes";

const UserList = () => {
  const navigate = useNavigate();
  const { data: users, error, isLoading } = useGetAllUsersQuery();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users.</p>;

  const handleButtonClick = () => {
    navigate(ROUTES.ADMIN.NEW_USER);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>+ Add user</button>
      <ul>
        {users?.map((user) => (
          <li key={user._uuid}>
            <Link to={`${ROUTES.ADMIN.USER(user._uuid)}`}>
              {user.name} - {user.email} - {user.role}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
