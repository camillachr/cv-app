import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useGetAllCVsQuery } from "../redux/apiSlice";

const useUserCV = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: cvs, isLoading, error } = useGetAllCVsQuery();

  if (!user?.id || isLoading || error) {
    return { cv: null, isLoading };
  }

  const userCV = cvs?.find((cv) => cv.userId === user.id);

  return { cv: userCV, isLoading };
};

export default useUserCV;
