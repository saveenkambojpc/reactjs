import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { baseUrls } from "../../config/baseUrls";
import { DocumentModel, DocumentPutModel } from "../../types/api/DocumentModel";

// interface UploadResponse {
//   url: string;
// }

// Replace with your backend API base URL (ensure HTTPS)
const baseUrl = baseUrls.development.concat("/document");

export const documentApi = createApi({
  reducerPath: "documentApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
      return headers;
    },
  }),
  tagTypes: ["Document"],
  endpoints: (builder) => ({
    getDocumentByUserId: builder.query<DocumentModel[], string>({
      query: (id) => `/user?id=${id}`,
      providesTags: ["Document"],
    }),

    uploadDocument: builder.mutation({
      query: (formData) => ({
        url: "/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Document"],
    }),
    updateDocument: builder.mutation({
      query: ({
        id,
        formData,
      }: {
        id: string;
        formData: DocumentPutModel;
      }) => ({
        url: `/?id=${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Document"],
    }),
    // deleteDocument: builder.mutation({
    //   query: (id) => ({
    //     url: `/?id=${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Document"], // Invalidate all users tag on delete
    // }),
  }),
});

export const {
  useUploadDocumentMutation,
  useGetDocumentByUserIdQuery,
  useUpdateDocumentMutation,
} = documentApi;
