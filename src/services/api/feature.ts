import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrls } from '../../config/baseUrls';
import { UserModel } from '../../types/api/UserModel';



// Replace with your backend API base URL (ensure HTTPS)
const baseUrl = baseUrls.development.concat('/master/feature');

export const featureApi = createApi({
    reducerPath: 'featureApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
            return headers;
        },
    }),
    tagTypes: ["Feature"],
    endpoints: (builder) => ({
        getFeatures: builder.query<UserModel[], void>({
            query: () => '/all', // Endpoint for fetching all users
            providesTags: ["Feature"],
        }),
        // getUserById: builder.query({
        //     query: (id) => `/${id}`,
        // }),
        // getSelfUser: builder.query<UserModel, void>({
        //     query: () => `/self`,
        // }),
        getPageScopes: builder.query<UserModel[], void>({
            query: () => '/page-scopes', // Endpoint for fetching all users
            providesTags: ["Feature"],
        }),

        createFeature: builder.mutation({
            query: (user) => ({
                url: '/',
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['Feature'], // Invalidate all users tag on create
        }),
        updateFeature: builder.mutation({
            query: (feature) => ({
                url: `/?id=${feature.id}`,
                method: 'PUT',
                body: feature,
            }),
            invalidatesTags: (_result, error, { id }) =>
                error ? [] : ['Feature', id], // Invalidate all users or specific user tag on update
        }),
        deleteFeature: builder.mutation({
            query: (id) => ({
                url: `/?id=${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Feature'], // Invalidate all users tag on delete
        }),
    }),
});

export const {
    useGetFeaturesQuery,
    // useGetUserByIdQuery,
    useCreateFeatureMutation,
    useUpdateFeatureMutation,
    useDeleteFeatureMutation,
    useGetPageScopesQuery
} = featureApi;
