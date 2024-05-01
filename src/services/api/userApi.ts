import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrls } from '../../config/baseUrls';
import { UserModel } from '../../types/api/UserModel';



// Replace with your backend API base URL (ensure HTTPS)
const baseUrl = baseUrls.development.concat('/user');

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
            // headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        getUsers: builder.query<UserModel[],void>({
            query: () => '/all', // Endpoint for fetching all users
            providesTags: ["User"],
        }),
        getFamilyProfiles: builder.query<UserModel[],void>({
            query: () => '/members', // Endpoint for fetching all users
            providesTags: ["User"],
        }),
        getUserById: builder.query({
            query: (id) => `/${id}`,
        }),
        getSelfUser: builder.query<UserModel, void>({
            query: () => `/self`,
        }),
        createUser: builder.mutation({
            query: (user) => ({
                url: '/',
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['User'], // Invalidate all users tag on create
        }),
        updateUser: builder.mutation({
            query: (updatedUser) => ({
                url: `/?user_id=${updatedUser.id}`,
                method: 'PUT',
                body: updatedUser,
            }),
            invalidatesTags: (_result, error, { id }) =>
                error ? [] : ['User', id], // Invalidate all users or specific user tag on update
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/?id=${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User'], // Invalidate all users tag on delete
        }),
    }),
});

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useGetSelfUserQuery,
    useGetFamilyProfilesQuery
} = userApi;
