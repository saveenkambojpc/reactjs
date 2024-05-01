import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrls } from '../../config/baseUrls';


const baseQuery = fetchBaseQuery({
    baseUrl: baseUrls.development,
});

interface SendOtpMutationResponse {
    data: any; // Replace with the actual data structure you expect
}
interface SendOtpMutationArgs {
    username: string,
    password: string,
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery,
    endpoints: (builder) => ({
        sendOtp: builder.mutation<SendOtpMutationResponse,SendOtpMutationArgs >({
            query: (credentials) => ({
                url: '/auth/send-otp',
                method: 'POST',
                body: credentials,
            }),
        }),
        verifyOtp: builder.mutation({
            query: (data) => ({
                url: '/auth/verify-otp',
                method: 'POST',
                body: data,
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            }),
        }),
        resendOtp: builder.query({
            query: () => ({
                url: "/resend-otp",
                method: 'GET'
            })
        })
    }),
});

export const { useSendOtpMutation, useResendOtpQuery, useVerifyOtpMutation } = authApi;



