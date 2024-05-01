import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetUsersQuery, useCreateUserMutation, useDeleteUserMutation } from './userApi'; // Replace with your API slice path

const User = () => {
  const [users, isLoading, error] = useSelector((state) => state.userApi.getUsers);
  const dispatch = useDispatch();
  const [createUser, { isLoading: creating, error: createError }] = useCreateUserMutation();
  const [deleteUser, { isLoading: deleting, error: deleteError }] = useDeleteUserMutation();
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '' }); // Replace with your user model properties

  useEffect(() => {
    dispatch(useGetUsersQuery().unwrap()); // Unwrap the promise for easier usage
  }, [dispatch]);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await createUser(newUser);
      setNewUser({ name: '', email: '', password: '' }); // Clear form after successful creation
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div>
      <h2>Users</h2>
      {isLoading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.name} ({user.email})
              <button onClick={() => handleDeleteUser(user._id)} disabled={deleting}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <h2>Create User</h2>
      <form onSubmit={handleCreateUser}>
        <label>
          Name:
          <input type="text" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} required />
        </label>
        <label>
          Email:
          <input type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} required />
        </label>
        <label>
          Password:
          <input type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} required />
        </label>
        <button type="submit" disabled={creating}>
          Create User
        </button>
        {createError && <p>Error: {createError.message}</p>}
      </form>
    </div>
  );
};

export default User;


    {
        "dob": "2024-03-23",
        "roles": [
            "525dbfaf-6149-4d3a-8312-3f40547618bc"
        ],
        "gender": "M",
        "name": "Prabal2",
        "email": "prabal01pathak@gmail.com",
        "phone_number": "tel:+91-97701-95894",
        "id": "d2c667f1-3c0a-4390-a44c-e9bd88713d14",
        "account_approved": true,
        "last_login_timestamp": null,
        "last_login_attempt_timestamp": null,
        "last_login_attempts_success": false,
        "login_attempts": 0,
        "created_at": "2024-03-22T19:36:53.355566",
        "created_by": "admin",
        "update_at": "2024-03-22T19:36:53.355580",
        "updated_by": "admin",
        "partitionKey": "user"
    },
POST
    {
  "dob": "2024-03-27",
  "roles": [],
  "gender": "M",
  "name": "string",
  "email": "user@example.com",
  "phone_number": "strings"
}