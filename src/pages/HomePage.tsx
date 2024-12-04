import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Home = () => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  return (
    <div>
      {!isAuthenticated && (
        <div>
          <h2>Create, Customize, Conquer </h2>
          <h1>Your Dynamic CV Awaits!</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            eu odio nibh. Etiam laoreet ullamcorper scelerisque. Duis sagittis
            libero lorem, fermentum consectetur velit ornare ut.
          </p>
        </div>
      )}

      {isAuthenticated && (
        <div>
          <h1>Welcome, {user?.name}!</h1>
          <h2>Clever message here </h2>
        </div>
      )}
    </div>
  );
};

export default Home;
