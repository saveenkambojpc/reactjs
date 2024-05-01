import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseUrls } from "../../config/baseUrls";
import { MedicationModel } from "../../types/api/MedicationModel";

// Replace with your backend API base URL (ensure HTTPS)
const baseUrl = baseUrls.development.concat("/medication");

export const medicationApi = createApi({
  reducerPath: "medicationApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
      return headers;
    },
  }),
  tagTypes: ["Medication"],
  endpoints: (builder) => ({
    // getDiets: builder.query<DietModel[], void>({
    //     query: () => '/all', // Endpoint for fetching all users
    //     providesTags: ["Medication"],
    // }),
    getMedicationByUserId: builder.query<MedicationModel[], string>({
      query: (id) => `/user?member_id=${id}`,
      providesTags: ["Medication"],
    }),
    createMedication: builder.mutation({
      query: (medication) => ({
        url: `/?member_id=${medication.member_id}`,
        method: "POST",
        body: medication,
      }),
      invalidatesTags: ["Medication"], // Invalidate all users tag on create
    }),
    updateMedication: builder.mutation({
      query: (medication) => ({
        url: `/?id=${medication.id}&member_id=${medication.member_id}`,
        method: "PUT",
        body: medication,
      }),
      invalidatesTags: (_result, error, { id }) =>
        error ? [] : ["Medication", id], // Invalidate all users or specific user tag on update
    }),
    deleteMedication: builder.mutation({
      query: ({ id, member_id }: { id: string; member_id: string }) => ({
        url: `/?id=${id}&member_id=${member_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Medication"], // Invalidate all users tag on delete
    }),
  }),
});

export const {
  useGetMedicationByUserIdQuery,
  useCreateMedicationMutation,
  useUpdateMedicationMutation,
  useDeleteMedicationMutation,
} = medicationApi;
