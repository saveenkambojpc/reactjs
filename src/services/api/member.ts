import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseUrls } from "../../config/baseUrls";
import { MemberModel } from "../../types/api/MemberModel";

// Replace with your backend API base URL (ensure HTTPS)
const baseUrl = baseUrls.development.concat("/master/member");

export const memberApi = createApi({
  reducerPath: "memberApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
      return headers;
    },
  }),
  tagTypes: ["Member"],
  endpoints: (builder) => ({
    // getDiets: builder.query<DietModel[], void>({
    //     query: () => '/all', // Endpoint for fetching all users
    //     providesTags: ["Member"],
    // }),
    
    getMembers: builder.query<MemberModel[], void>({
      query: () => '/all', // Endpoint for fetching all users
      providesTags: ["Member"],
    }),
    createMember: builder.mutation({
      query: (member) => ({
        url: '/',
        method: "POST",
        body: member,
      }),
      invalidatesTags: ["Member"], // Invalidate all users tag on create
    }),
    updateMember: builder.mutation({
      query: (member) => ({
        url: `/?id=${member.id}&member_id=${member.member_id}`,
        method: "PUT",
        body: member,
      }),
      invalidatesTags: (_result, error, { id }) =>
        error ? [] : ["Member", id], // Invalidate all users or specific user tag on update
    }),
    // deleteMember: builder.mutation({
    //   query: ({ id, member_id }: { id: string; member_id: string }) => ({
    //     url: `/?id=${id}&member_id=${member_id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Member"], // Invalidate all users tag on delete
    // }),
  }),
});

export const {
  useGetMembersQuery,
  useCreateMemberMutation,
  useUpdateMemberMutation,
  // useDeleteMemberMutation,
} = memberApi;
