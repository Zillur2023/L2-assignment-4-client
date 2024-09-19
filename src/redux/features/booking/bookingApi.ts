import { baseApi } from "../../api/baseApi";


export const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      createBooking: builder.mutation({
        query: ( bookingData ) => {
          // Log bookingData for debugging
          console.log({ bookingData });
  
          return {
            url: '/booking/create',
            method: 'POST',
            body: bookingData,
          };
        },
      }),
    }),
  });
  
  export const { useCreateBookingMutation } = bookingApi;
