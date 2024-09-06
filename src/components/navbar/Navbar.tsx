import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {  Avatar, Badge, Space } from "antd";
import { Link } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { logout } from "../../redux/features/auth/authSlice";
import { useState } from "react";
import Cart from "../cart/Cart";
import { UserOutlined } from '@ant-design/icons';


const navigation = [
  // { name: "Home", link: "/", current: false },
  { name: "Products", link: "/products", current: false },                       
  { name: "Category", link: "/category", current: false },
  { name: "Add category", link: "/add-category", current: false },
  { name: "Add product", link: "/add-product", current: false },
  { name: "Product management", link: "/productManagement", current: false },
  { name: "Checkout", link: "/checkout", current: false },
];

function classNames(...classes: (string | boolean | undefined | null)[]): string {
    return classes.filter(Boolean).join(" ");
  }

export default function Navbar() {
  const [openCart, setOpenCart] = useState(false);
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { products,totalProductsQty } = useAppSelector((state:RootState) => state.cart)
  
  
  
  return (
    <Disclosure as="nav" className="bg-gray-800">
      <Cart openCart={openCart} setOpenCart={setOpenCart} />
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
           <Link to='/'>
           <div className="flex flex-shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://res.cloudinary.com/dsisnya7j/image/upload/v1725216774/banner1725216773536.png"
                className="h-5 w-auto m-2"
              />
            </div>
           </Link>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.link}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          {products.length &&   <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              {/* <BellIcon aria-hidden="true" className="h-6 w-6" /> */}
              <div onClick={() => setOpenCart(true)}>
                {/* <Badge count={5}> */}
                <Badge count={totalProductsQty}>
                  {/* <Avatar shape="square" size="large" /> */}
                  <HiOutlineShoppingBag className=" rounded-md bg-white w-8 h-8" />
                </Badge>
              </div>
            </button>}

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                 
                  <div className="flex items-center space-x-2">
      {user ? (
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-500 text-white ">
          {user.email[0].toUpperCase()}
        </div>
      ) : (
        <>
          {/* <Link to="/auth/login">
            <Button type="primary" size="middle">
              Login
            </Button>
          </Link>
          <Link to="/auth/register">
            <Button type="primary" size="middle">
              Register
            </Button>
          </Link> */}
          <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  {/* <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="h-8 w-8 rounded-full"
                  /> */}
                     <Space direction="vertical" size={16}>
    <Space wrap size={16}>
      <Avatar size="large" icon={<UserOutlined />} />
  
    </Space>
  
  </Space>
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <Link to="/auth/login" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                  Login
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/auth/register" className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                    Register
                  </Link>
                </MenuItem>
               
              </MenuItems>
            </Menu>
        </>
      )}
    </div>
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                 
                  <Link
                    to="/auth/login"
                    onClick={() => dispatch(logout())}
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                  >
                    Sign out
                  </Link>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              // href={item.href}
              href={item.link}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
