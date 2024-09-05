import Category from "../components/category/Category";
import { useGetAllCategoriesQuery } from "../redux/features/category/categoryApi";

const CategoryPage = () => {
  const { data, isLoading } = useGetAllCategoriesQuery("");

  // Slice the data to pass only the first 8 items
  const categoryData = data?.data || [];
  return <Category data={categoryData} isLoading={isLoading} />;
};

export default CategoryPage;
