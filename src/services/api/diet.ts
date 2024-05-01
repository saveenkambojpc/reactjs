import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrls } from '../../config/baseUrls';
import { DietModel } from '../../types/api/DietModel';



// Replace with your backend API base URL (ensure HTTPS)
const baseUrl = baseUrls.development.concat('/diet');

export const dietApi = createApi({
    reducerPath: 'dietApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
            return headers;
        },
    }),
    tagTypes: ["Diet"],
    endpoints: (builder) => ({
        getDiets: builder.query<DietModel[], void>({
            query: () => '/all', // Endpoint for fetching all users
            providesTags: ["Diet"],
        }),
        getDietByUserId: builder.query<DietModel[], string>({
            query: (id) => `/user?user_id=${id}`,
            providesTags: ["Diet"],
        }),
        createDiet: builder.mutation({
            query: (diet) => ({
                url: '/',
                method: 'POST',
                body: diet,
            }),
            invalidatesTags: ['Diet'], // Invalidate all users tag on create
        }),
        updateDiet: builder.mutation({
            query: (diet) => ({
                url: `/?id=${diet.id}`,
                method: 'PUT',
                body: diet,
            }),
            invalidatesTags: (_result, error, { id }) =>
                error ? [] : ['Diet', id], // Invalidate all users or specific user tag on update
        }),
        deleteDiet: builder.mutation({
            query: (id) => ({
                url: `/?id=${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Diet'], // Invalidate all users tag on delete
        }),
    }),
});

export const {
    useGetDietsQuery,
    useGetDietByUserIdQuery,
    useCreateDietMutation,
    useUpdateDietMutation,
    useDeleteDietMutation
} = dietApi
