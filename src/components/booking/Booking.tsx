import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Input, Button } from "antd";
import { toast } from "sonner";
import { useCreateBookingMutation } from "../../redux/features/booking/bookingApi";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { useGetUserQuery } from "../../redux/user/userApi";
import dayjs from "dayjs";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

const Booking = () => {
  const location = useLocation();
  const { state } = location;
  const { service, selectedSlot } = state || {};
  const navigate = useNavigate();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { data: userInfo } = useGetUserQuery(user?.email, {
    skip: !user?.email,
  });
  const [createBooking] = useCreateBookingMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (customerData) => {
    const toastId = toast.loading("Creating booking...");
    const bookingData = {
      userEmail: user?.email,
      ...customerData,
      bookingInfo: { service: service._id, slot: selectedSlot._id },
    };

    try {
      const res = await createBooking(bookingData).unwrap();
      if (res.success) {
        toast.success(res.message, { id: toastId });
        navigate('/')
      } else {
        toast.error(res.message, { id: toastId });
      }
     
    } catch (error) {
      console.error("Booking creation failed:", error);
      alert("Booking creation failed. Please try again.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Service Details */}
        <div className="space-y-4">
          <div className="flex items-center border p-4 rounded-lg">
            <img
              src={service.image}
              alt={service.name}
              className="h-24 w-24 object-cover rounded-md"
            />
            <div className="ml-4 flex-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {service.name}
              </h3>
              <p className="text-sm text-gray-500">{service.description}</p>
              <p className="text-lg font-bold text-gray-900">
                ${service.price.toFixed(2)}
              </p>
              <p>
                <span className="text-md font-bold text-gray-500">
                  Service booked :{" "}
                </span>
                <span className="text-sm font-medium text-gray-500">
                  {dayjs(selectedSlot.date).format("MM/DD/YYYY")} -{" "}
                  {selectedSlot.startTime} to {selectedSlot.endTime}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* User Information Form */}
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <Controller
              name="name"
              control={control}
              defaultValue={userInfo?.data?.name || ""} // Fill with user info if available
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <Input
                  id="name"
                  placeholder="Enter your name"
                  {...field}
                  className="w-full p-3 border rounded-md"
                />
              )}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Controller
              name="email"
              control={control}
              defaultValue={userInfo?.data?.email || ""} // Fill with user info if available
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email address",
                },
              }}
              render={({ field }) => (
                <Input
                  id="email"
                  placeholder="Enter your email"
                  {...field}
                  className="w-full p-3 border rounded-md"
                />
              )}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <Controller
              name="phone"
              control={control}
              defaultValue={userInfo?.data?.phone || ""} // Fill with user info if available
              rules={{ required: "Phone number is required" }}
              render={({ field }) => (
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  {...field}
                  className="w-full p-3 border rounded-md"
                />
              )}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <Controller
              name="address"
              control={control}
              defaultValue={userInfo?.data?.address || ""} // Fill with user info if available
              rules={{ required: "Address is required" }}
              render={({ field }) => (
                <Input.TextArea
                  id="address"
                  placeholder="Enter your address"
                  rows={4}
                  {...field}
                  className="w-full p-3 border rounded-md"
                />
              )}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">
                {errors.address.message}
              </p>
            )}
          </div>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full py-3 mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md"
            onClick={handleSubmit(onSubmit)}
          >
            Pay Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
