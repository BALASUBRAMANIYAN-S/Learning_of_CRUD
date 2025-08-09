import React from "react";
import Card from "../components/UserCard";
import { Outlet, Link } from "react-router-dom";
import {
  useGetUsersQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../services/userApi";

function UserList() {
  const { data: users = [] } = useGetUsersQuery();
 

  return (
    <div className="mt-5 mx-20 p-4 h-auto shadow-md border-2 border-teal-600 rounded-2xl flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">User List</h2>
        <button className="px-4 py-1 cursor-pointer bg-teal-600 text-white rounded-md hover:bg-teal-700 transition">
          <Link to={"/AddUser"}> Add</Link>
        </button>
      </div>
      {users.map((user) => (
        <div key={user._id}>
          <Card user={user} Name={user.name} Email={user.email} />
        </div>
      ))}
    </div>
  );
}

export default UserList;
