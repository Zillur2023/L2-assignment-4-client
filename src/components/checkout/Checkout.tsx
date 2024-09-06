import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Input, Button, Badge, Avatar } from "antd";
import {  useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import {
  useCreateOrderMutation,

  
} from "../../redux/features/order/orderApi";
import { toast } from "sonner";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

const Checkout: React.FC = () => {
  // const [transactionId, setTransactionId] = useState('')
  const [createOrder] = useCreateOrderMutation();
  // const {data:transactionIdData} = useOrderbyTransactionIdQuery(transactionId);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "Zillur",
      email: "zillur@gmail.com",
      phone: "12324",
      address: "Trishal,Mymensingh",
    },
  });

  const { products, totalPrice } = useAppSelector(
    (state: RootState) => state.cart
  );

  const onSubmit: SubmitHandler<FormValues> = async (user) => {
  
    // Prepare the order data
    const orderData = {
      user,
      products: products.map((product) => ({
        product: product._id,
        quantity: product.quantity,
      })),
    };
  
    try {
      // Use toast.promise to handle loading, success, and error states
       toast.promise(
        createOrder(orderData).unwrap(),
        {
          loading: 'Creating order...',
          success: ({data}) => {
  
            // Redirect to the payment page
            const paymentUrl = data.paymentSession.payment_url;
            window.location.href = paymentUrl;

  
            return 'Order has been created successfully! Redirecting to payment...';
          },
          error: 'Order creation failed. Please try again.',
        }
      );
    } catch (error) {
      console.error("Order creation failed:", error);
      alert("Order creation failed. Please try again.");
    }
  };
  
  

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Details */}
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex items-center border p-4 rounded-lg"
            >
              <div className="h-20 w-20 flex-shrink-0 rounded-md overflow-hidden">
                <Badge count={product.quantity} offset={[-10, 10]}>
                  <Avatar
                    shape="square"
                    // size="large"
                    size={90}
                    src={product.image} // Replace with your image URL
                    alt="User Image"
                    style={{ width: "100%", height: "100%" }}
                  />
                </Badge>
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Price: ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}

          <div className="mt-4 flex justify-between items-center border-t pt-4">
            <h3 className="text-lg font-bold text-gray-800">Total:</h3>
            <p className="text-lg font-bold text-indigo-600">
              ${totalPrice.toFixed(2)}
            </p>
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
            Confirm Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
