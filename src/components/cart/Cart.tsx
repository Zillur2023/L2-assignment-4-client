"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { Button, Modal } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from "../../redux/features/cart/cartSlice";
import { Link } from "react-router-dom";

interface CartProps {
  openCart: boolean;
  setOpenCart: (open: boolean) => void;
}

export default function Cart({
  openCart: openCart,
  setOpenCart: setOpenCart,
}: CartProps) {
  const dispatch = useAppDispatch();
  const { products, totalProductsQty, totalPrice } = useAppSelector(
    (state: RootState) => state.cart
  );

  const handleRemoveClick = (product: any) => {
    Modal.confirm({
      title: (
        <span>
          Are you sure you want to delete{" "}
          <span style={{ color: "red", fontWeight: "bold" }}>
            {product.name}
          </span>
          ?
        </span>
      ),
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleRemove(product),
    });
  };

  // Function to handle delete action
  const handleRemove = (product: any) => {
    dispatch(removeItem(product._id));
  };
  // Function to handle delete action

  return (
    <Dialog open={openCart} onClose={setOpenCart} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">
                      Total items {totalProductsQty}
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpenCart(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {products.map((product) => (
                          <li key={product._id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                // alt={product.imageAlt}
                                alt={"product image"}
                                src={product.image}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    {/* <a href={product.href}>{product.name}</a> */}
                                    {product.name}
                                  </h3>
                                  <p className="ml-4">
                                    ${product.price.toFixed(2)}
                                  </p>
                                </div>
                                {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                {/* <p className="text-gray-500">Qty {product.quantity}</p> */}
                                <div className="flex items-center border rounded px-1  space-x-2">
                                  <Button
                                    onClick={async () => {
                                      dispatch(decreaseQuantity(product._id));
                                    }}
                                    shape="circle"
                                    size="small"
                                    icon={<MinusOutlined />}
                                    disabled={product.quantity <= 1} // Optional: Disable if quantity is 1
                                  />
                                  <br />
                                  <p className="text-sm font-medium text-gray-700 mt-3">
                                    {product.quantity}
                                  </p>
                                  <Button
                                    onClick={async () => {
                                      dispatch(increaseQuantity(product._id));
                                    }}
                                    shape="circle"
                                    size="small"
                                    icon={<PlusOutlined />}
                                    // disabled={product.quantity > product.stock} // Optional: Disable if stock is reached
                                    disabled={product.stock < 1}
                                  />
                                </div>

                                <div className="flex">
                                  <button
                                    onClick={() => handleRemoveClick(product)}
                                    type="button"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${totalPrice.toFixed(2)}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <Link
                      to="/checkout"
                      onClick={() => setOpenCart(false)}
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Checkout
                    </Link>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or
                      <Link to="/products">
                        <button
                          type="button"
                          onClick={() => setOpenCart(false)}
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
