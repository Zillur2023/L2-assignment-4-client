import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import "antd/dist/reset.css"; // Make sure Ant Design styles are properly imported
import { useAppDispatch } from "../../redux/hooks";
import { addItem } from "../../redux/features/cart/cartSlice";

import Cart from "../cart/Cart";

// Utility function to merge class names
// function classNames(...classes: string[]) {
//   return classes.filter(Boolean).join(' ');
// }

// TypeScript interface for product details props
interface ProductDetailsProps {
  product: {
    _id: string;
    category: [string];
    name: string;
    price: number;
    stock: number;
    description: string;
    image: string;
  };
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  // console.log("productDetails---> ", product);
  const [open, setOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    if (product.stock > 0) {
      dispatch(
        addItem({
          _id: product._id,
          name: product.name,
          image: product.image,
          price: parseFloat(product.price.toFixed(2)),
          stock: product.stock,
          quantity: 1,
        })
      );
      setOpenCart(true);
    }
  };

  const addProductBtnClass = `mt-6 flex w-full items-center justify-center rounded-md border border-transparent 
    ${product.stock > 0 ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'} 
    px-8 py-3 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`;
 

  return (
    <>
      <Cart openCart={openCart} setOpenCart={setOpenCart} />
      {/* Ant Design Card for Product Overview */}
      <Card
      hoverable
      style={{ width: 240 }}
      cover={
        <img
          alt={product.name}
          src={product.image}
          style={{ height: 200, width:'100%', objectFit: 'contain' }} // Ensures consistent image size and fit
        />
      }
    >
      <Meta
        title={product.name}
        description={`$${product.price.toFixed(2)}`}
      />

      {/* Button to open the product details dialog */}
      <button
        onClick={() => setOpen(true)}
        className="mt-4 w-full rounded-md bg-indigo-600 py-2 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        View details
      </button>
    </Card>

      {/* Tailwind CSS Dialog for Detailed Product Information */}
      <Dialog open={open} onClose={setOpen} className="relative z-10">
  {/* Overlay */}
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

  {/* Dialog Panel */}
  <div className="fixed inset-0 z-10 overflow-y-auto">
    <div className="flex min-h-full items-center justify-center p-4 text-center">
      <Dialog.Panel className="relative w-full max-w-4xl transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Close</span>
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        </button>

        {/* Product Details Content */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-12 lg:gap-8">
          {/* Product Image */}
          <div className="sm:col-span-5 lg:col-span-6">
            <div className="overflow-hidden rounded-lg bg-gray-100">
              <img
                src={product.image}
                alt={`${product.name} main image`}
                style={{ height: '100%', width: '100%', objectFit: 'contain' }} // Fixed height, full width, and cover fit
                className="object-center"
              />
            </div>
          </div>

          {/* Product Information */}
          <div className="sm:col-span-7 lg:col-span-6">
            {/* <h2 className="text-2xl font-bold text-gray-900">{product.name} - {product?.category?.name} </h2> */}
            <h2 className="text-2xl font-bold text-gray-900">{product.name}  </h2>

            <p className="mt-2 text-2xl text-gray-900">
              ${product.price.toFixed(2)}
            </p>

            <div className="mt-4">
              <h3 className="sr-only">Description</h3>
              <p className="text-sm text-gray-700">{product.description}</p>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              type="button"
              className={addProductBtnClass}
              >
              Add to Cart
            </button>

            {/* Stock Information */}
            <p className="mt-4 text-sm text-gray-500">
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </p>
          </div>
        </div>
      </Dialog.Panel>
    </div>
  </div>
</Dialog>

    </>
  );
}
