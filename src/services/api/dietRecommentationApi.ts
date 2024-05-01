import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseUrls } from "../../config/baseUrls";
import { DietRecommendationModel } from "../../types/api/DietRecommendationModel";

// Replace with your backend API base URL (ensure HTTPS)
const baseUrl = baseUrls.development.concat("/diet_recommendations");

export const dietRecommendationApi = createApi({
  reducerPath: "dietRecommendationApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
      return headers;
    },
  }),
  tagTypes: ["Diet Recommendation"],
  endpoints: (builder) => ({
    getDietRecommendationsByUserId: builder.query<
      DietRecommendationModel[],
      string
    >({
      query: (id) => `/user?user_id=${id}`,
      providesTags: ["Diet Recommendation"],
    }),
    createDietRecommentation: builder.mutation({
      query: (diet) => ({
        url: "/",
        method: "POST",
        body: diet,
      }),
      invalidatesTags: ["Diet Recommendation"], // Invalidate all users tag on create
    }),
    updateDietRecommendation: builder.mutation({
      query: ({ id, user_id, diet }: { id: any; user_id: any; diet: any }) => ({
        url: `/?id=${id}&user_id=${user_id}`,
        method: "PUT",
        body: diet,
      }),
      invalidatesTags: (_result, error, { id }) =>
        error ? [] : ["Diet Recommendation", id], // Invalidate all users or specific user tag on update
    }),
    deleteDietRecommendation: builder.mutation({
      query: ({ id, user_id }: { id: string; user_id: string }) => ({
        url: `/?id=${id}&user_id=${user_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Diet Recommendation"], // Invalidate all users tag on delete
    }),
  }),
});

export const {
  useGetDietRecommendationsByUserIdQuery,
  useCreateDietRecommentationMutation,
  useUpdateDietRecommendationMutation,
  useDeleteDietRecommendationMutation,
  //   useCreateDietMutation,
  //   useUpdateDietMutation,
  //   useDeleteDietMutation,
} = dietRecommendationApi;
