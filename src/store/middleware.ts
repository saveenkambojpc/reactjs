import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
import { toast } from "../services/toast";
import { messages } from "../constants/messages";

// Define an interface for your error object (optional)
interface ErrorResponse {
  status: number | string;
  data?: any;
  message?: string;
}

/**
 * This middleware intercepts rejected actions (failed API calls)
 * and dispatches additional actions based on the response status code.
 */
export const handleApiErrors: Middleware =
  (_api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const error = action.payload as ErrorResponse; // No need to destructure here


      if (error && error.status) {
        switch (error.status) {
          case "FETCH_ERROR":
            toast("error", messages.global.error_500);
            break;
          default:
            console.error("Unexpected error:", error, error.status);
        }
      } else {
        console.error("Unexpected error format:", error);
      }
    }

    return next(action);
  };
