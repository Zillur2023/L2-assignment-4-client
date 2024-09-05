import Banner from "../components/banner/Banner";
import Category from "../components/category/Category";
import { useGetAllProductsQuery } from "../redux/features/product/productApi";
import ProductDetails from "../components/product/ProductDetails";
import Footer from "../components/footer/Footer";
import AllSpecialSection from "../components/specialSection/AllSpecialSection";
import { useGetAllCategoriesQuery } from "../redux/features/category/categoryApi";

const HomePage = () => {
  const { data, isLoading } = useGetAllProductsQuery("");
  const { data: categoryData, isLoading: categoryIsLoading } = useGetAllCategoriesQuery("");


  // Slice the data to pass only the first 8 items
  const categorySlicedData = categoryData?.data?.slice(0, 4) || [];
  return (
    <div>
      <Banner />

      <Category data={categorySlicedData} isLoading={categoryIsLoading} />

      <>
        {isLoading ? (
          "Loading..."
        ) : (
          <div>
            <h3 className="font-bold text-2xl m-8 text-center text-gray-800 tracking-wide">
              products
            </h3>
            <div className="flex justify-center items-center my-5">
              {data?.data?.length > 0 ? ( // Check if there are any products
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
                  {data?.data?.slice(0, 8).map((product: any) => (
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
      </>
      <AllSpecialSection />
      <Footer />
    </div>
  );
};

export default HomePage;
