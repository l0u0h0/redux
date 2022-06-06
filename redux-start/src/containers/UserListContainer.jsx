import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserList from "../components/UserList";
import {
  getUsersPromise,
  // getUsersFail,
  // getUsersStart,
  // getUsersSuccess,
  getUsersThunk,
} from "../redux/actions";
// import axios from "axios";

export default function UserListContainer() {
  const users = useSelector((state) => state.users.data);
  const dispatch = useDispatch();

  // 비동기 작업
  // const getUsers = useCallback(
  //   async function getUsers() {
  //     try {
  //       dispatch(getUsersStart());
  //       const res = await axios.get("https://api.github.com/users");
  //       dispatch(getUsersSuccess(res.data));
  //     } catch (error) {
  //       dispatch(getUsersFail(error));
  //     }
  //   },
  //   [dispatch]
  // );

  // const getUsers = useCallback(() => {
  //   dispatch(getUsersThunk);
  // }, [dispatch]);
  const getUsers = useCallback(() => {
    dispatch(getUsersPromise());
  }, [dispatch]);
  return <UserList users={users} getUsers={getUsers} />;
}
