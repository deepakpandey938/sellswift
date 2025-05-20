import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/usersdata")
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-semibold text-center text-blue-700 mb-8">📋 User List</h1>

      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        {loading ? (
          <div className="text-center text-gray-500 py-10">Loading users...</div>
        ) : users.length === 0 ? (
          <div className="text-center text-gray-500 py-10">No users found.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Mobile</th>
                <th className="p-4">Gender</th>
                <th className="p-4">Age</th>
                <th className="p-4">Landlord</th>
                <th className="p-4">Listing</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="odd:bg-white even:bg-blue-50 hover:bg-blue-100 transition"
                >
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.mobile}</td>
                  <td className="p-4">{user.gender}</td>
                  <td className="p-4">{user.age}</td>
                  <td className="p-4">{user.landlordUsername}</td>
                  <td className="p-4">{user.listingName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserList;
