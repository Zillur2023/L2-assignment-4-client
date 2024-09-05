/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
"use client";

import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon, FunnelIcon } from "@heroicons/react/20/solid";
import { Input, Pagination } from "antd";
import { TClassValue, TFilter, TFilterOptions, TFilterOptionsValue, TSortOptions } from "../../types";
import MobileFilter from "./MobileFilter";
import DesktopFilter from "./DesktopFilter";
import { useGetProductByCategoryQuery } from "../../redux/features/product/productApi";
import { useParams } from "react-router-dom";
import ProductDetails from "./ProductDetails";


const sortOptions: TSortOptions[] = [
  // { name: "Most Popular", href: "#", current: true },
  // { name: "Best Rating", href: "#", current: false },
  { name: "Newest", value: "-createdAt", current: true },
  { name: "Price: Low to High", value: "price", current: true },
  { name: "Price: High to Low", value: "-price", current: true },
];


function classNames(...classes: TClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function ProductByCategory() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  const [filter, setFilter] = useState<TFilter>({
    searchTerm,
    sort,
    limit: 10,
    page: 1,
    priceMin: undefined,
    priceMax: undefined,
    fields: "",
  });

  const { category } = useParams<{ category: string }>();
  // console.log({category})

  const { data, isLoading } = useGetProductByCategoryQuery({category,filter});

  // console.log('productByCategory',data?.data?.result)
  // if (!isLoading && data?.data?.result) {
  //   console.log('productByCategoryDetails', data.data.result.map((item: any) => ({
  //     value: item._id,
  //     label: item.name,
  //     checked: false
  //   })));
  // } else {
  //   console.log('Data is loading or is undefined.');
  // }

 
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    // console.log('E--->',e.target)
    const { name, value, checked } = e.target as HTMLInputElement;
  
    setFilter((prev) => {
      const newFilter = { ...prev, [name]: checked ? value : undefined } as TFilter;
      return newFilter;
    });
  };
  
  let filterOptionsValue: TFilterOptionsValue[] = [];

  if (!isLoading && data?.data?.result) {
    filterOptionsValue = [
      {
        id: "category",
        name: "Category",
        options: Array.from(
          new Map(
            data.data.result.map((item: any) => [
              item.category._id, // Use category._id as the unique key
              {
                value: item.category._id,
                label: item.category.name,
                checked: false,
              },
            ])
          ).values() // Extract only the unique filter option objects
        ) as TFilterOptions[],
      },
      {
        id: "_id",
        name: "Product list",
        options: data.data.result.map((item: any) => ({
          value: item._id,
          label: item.name,
          checked: false,
        })),
      },
    ];
  } else {
    // console.log('Data is still loading or is undefined.');
  }

  const handleSortChange = (
    e: React.MouseEvent<HTMLDivElement>,
    option: TSortOptions
  ) => {
    e.preventDefault();
    setSort(option.value);
    setFilter((prev) => ({
      ...prev,
      sort: option.value,
    }));
  };

  const handleClearFilters = () => {
    // Reset all filters to initial values
    setSearchTerm("");
    setSort("");
    setFilter({
      searchTerm: "",
      sort: "",
      limit: 10,
      page: 1,
      priceMin: undefined,
      priceMax: undefined,
      fields: "",
    });
  };

  return (
    <div className="bg-white">
    {/* // <div className=""> */}
      <div> {isLoading && "Loading..."} </div>
      <div>
        {/* Mobile filter dialog */}
        <MobileFilter
          filter={filter}
          setFilter={setFilter}
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          handleFilterChange={handleFilterChange}
          filterOptionsValue={filterOptionsValue}
          handleClearFilters={handleClearFilters}
        />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-5 pt-5">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              {/* New Arrivals */}
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <div
                          className={classNames(
                            option.current
                              ? "font-medium text-gray-900"
                              : "text-gray-500",
                            "block px-4 py-2 text-sm data-[focus]:bg-gray-100"
                          )}
                          onClick={(e) => handleSortChange(e, option)}
                        >
                          {option.name}
                        </div>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Input
                  placeholder="🔍"
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setFilter((prev) => ({
                      ...prev,
                      searchTerm: e.target.value,
                    }));
                  }}
                />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <DesktopFilter
               filter={filter}
               setFilter={setFilter}
                handleFilterChange={handleFilterChange}
                filterOptionsValue={filterOptionsValue}
                handleClearFilters={handleClearFilters}
              />

              {/* Product grid */}
  
              <div className="lg:col-span-3">{/* Your content */}
              <div className="mb-5">
  {isLoading ? (
    "Loading..."
  ) : (
    <div>
      <h4 className="font-medium m-5">
        Total products {data?.data?.result?.length || 0}
      </h4>
      <div className="flex justify-center items-center">
        {data?.data?.result?.length > 0 ? ( // Check if there are any products
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data?.data?.result?.map((product: any) => (
              <div key={product._id}>
                <ProductDetails product={product} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No products found.</p> // Message when no products
        )}
      </div>
    </div>
  )}
</div>
              <Pagination
                align="end"
                defaultCurrent={9}
                total={data?.meta?.total}
              />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
