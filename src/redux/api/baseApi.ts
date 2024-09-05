import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";
import config from "../../config";

const baseQuery = fetchBaseQuery({
  baseUrl: `${config.server_url}/api/v1`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    
    if (token) {
      headers.set("authorization", `${token}`);
    }
    
    return headers;
  },
});

console.log('process.env.SERVER_URL',config.server_url)

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);
  // console.log({result})

  if (result?.error?.status === 401) {
    //* Send Refresh
    console.log("Sending refresh token");

    const res = await fetch(`${config.server_url}/api/v1/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    console.log({ res });
    console.log({ data });

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  console.log("result-------->", result);
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["Product", "Category", "Order"],
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
