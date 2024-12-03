import { Link, useNavigate } from "react-router-dom";
import { useGetAllUsersQuery } from "../../redux/apiSlice";

const UserList = () => {
  const navigate = useNavigate();
  const { data: users, error, isLoading } = useGetAllUsersQuery();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products.</p>;

  const handleButtonClick = () => {
    navigate("/users/new");
  };

  return (
    <div>
      <h1>User List</h1>
      <button onClick={handleButtonClick}>Add user</button>
      <ul>
        {users?.map((user) => (
          <li key={user._uuid}>
            <Link to={`/users/${user._uuid}`}>
              {user.name} - {user.email}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
