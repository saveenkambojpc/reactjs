import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrls } from '../../config/baseUrls';
import { AllergyModel } from '../../types/api/AllergyModel';



// Replace with your backend API base URL (ensure HTTPS)
const baseUrl = baseUrls.development.concat('/allergies');

export const allergyApi = createApi({
    reducerPath: 'allergiesApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
            return headers;
        },
    }),
    tagTypes: ["Allergies"],
    endpoints: (builder) => ({
        getAllergies: builder.query<AllergyModel[], void>({
            query: () => '/all', // Endpoint for fetching all users
            providesTags: ["Allergies"],
        }),
        createAllergy: builder.mutation({
            query: (allergy) => ({
                url: '/',
                method: 'POST',
                body: allergy,
            }),
            invalidatesTags: ['Allergies'], // Invalidate all users tag on create
        }),
        updateAllergy: builder.mutation({
            query: (updatedAllergy) => ({
                url: `/?id=${updatedAllergy.id}`,
                method: 'PUT',
                body: updatedAllergy,
            }),
            invalidatesTags: (_result, error, { id }) =>
                error ? [] : ['Allergies', id], // Invalidate all users or specific user tag on update
        }),
        deleteAllergy: builder.mutation({
            query: (id) => ({
                url: `/?id=${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Allergies'], // Invalidate all users tag on delete
        }),
    }),
});

export const {
    useGetAllergiesQuery,
    useCreateAllergyMutation,
    useUpdateAllergyMutation,
    useDeleteAllergyMutation,
} = allergyApi
