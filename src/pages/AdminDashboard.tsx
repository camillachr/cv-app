import { useGetAllCVsQuery, useGetAllUsersQuery } from "../redux/apiSlice";

const AdminDashboard = () => {
  const {
    data: cvs,
    isLoading: isLoadingCVs,
    isError: isErrorCVs,
  } = useGetAllCVsQuery();
  const {
    data: users,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
  } = useGetAllUsersQuery();

  if (isLoadingCVs || isLoadingUsers) {
    return <p>Loading data...</p>;
  }

  if (isErrorCVs || isErrorUsers) {
    return <p>Failed to load data. Please try again.</p>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <h2>Statistics</h2>
        <p>Total CVs: {cvs?.length || 0}</p>
        <p>Total Users: {users?.length || 0}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
