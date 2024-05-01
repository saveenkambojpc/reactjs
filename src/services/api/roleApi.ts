import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrls } from '../../config/baseUrls';
import { RoleModel } from '../../types/api/RoleModel';


// Replace with your backend API base URL (ensure HTTPS)
const baseUrl = baseUrls.development.concat('/role');

export const roleApi = createApi({
    reducerPath: 'roleApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
            return headers;
        },
    }),
    tagTypes: ["Role"],
    endpoints: (builder) => ({
        getRoles: builder.query<RoleModel[],void>({
            query: () => '/all', // Endpoint for fetching all users
            providesTags: ["Role"],
        }),
        createRole: builder.mutation({
            query: (role) => ({
                url: '/',
                method: 'POST',
                body: role,
            }),
            invalidatesTags: ['Role'], // Invalidate all users tag on create
        }),
        updateRole: builder.mutation({
            query: (updatedRole) => ({
                url: `/?id=${updatedRole.id}`,
                method: 'PUT',
                body: updatedRole,
            }),
            invalidatesTags: (_result, error, { id }) =>
                error ? [] : ['Role', id], // Invalidate all users or specific user tag on update
        }),
        deleteRole: builder.mutation({
            query: (id) => ({
                url: `/?id=${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Role'], // Invalidate all users tag on delete
        }),
    }),
});

export const {
    useGetRolesQuery,
    useCreateRoleMutation,
    useUpdateRoleMutation,
    useDeleteRoleMutation
} = roleApi
