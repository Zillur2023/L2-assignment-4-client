import { Link } from "react-router-dom";
import { Card } from "antd";

const { Meta } = Card;

interface CategoryProps {
  data: any[]; // Array of category items
  isLoading: boolean;
}

const Category: React.FC<CategoryProps> = ({ data, isLoading }) => {

  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <div>
        <h3 className="font-bold text-2xl m-8 text-center text-gray-800 tracking-wide">
  Category
</h3>          <div className="flex justify-center items-center">
            {data?.length > 0 ? ( // Check if there are any categories
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
                {data?.map((item: any) => (
                  <Link
                    key={item._id}
                    to={`/productByCategory/${item._id}`}
                    className="block"
                  >
                    <Card
                      hoverable
                      style={{ width: "100%" }}
                      cover={
                        <img
                          alt={item.name}
                          src={item.image}
                          style={{ height: 200, objectFit: "cover" }}
                        />
                      }
                    >
                      <Meta title={item?.name} />
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No category found.</p> // Message when no categories
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
