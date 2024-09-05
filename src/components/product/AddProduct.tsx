import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  Form,
  Input,
  Button,
  Select,
  message,
  Card,
  Typography,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { useGetAllCategoriesQuery } from "../../redux/features/category/categoryApi";
import { useCreateProductMutation } from "../../redux/features/product/productApi";
import { toast } from "sonner";
import { RcFile } from "antd/es/upload";
import config from "../../config";

const { Title } = Typography;

type FormValues = {
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  image?: UploadFile[];
};

const AddProduct: React.FC = () => {
  const [createProduct] = useCreateProductMutation();
  const { data } = useGetAllCategoriesQuery("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const {
    control,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      category: "",
      price: undefined,
      stock: undefined,
      description: "",
      image: [],
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (dataInfo) => {
    if (fileList.length === 0) {
      setError("image", { type: "manual", message: "Image is required" });
      return;
    }

    try {
      const imageFile = fileList[0].originFileObj as Blob; // Get the image file as Blob

      const imageHostingKey = config.image_hosting_key;
      const imageHostingApi = `${config.image_hosting_api}?key=${imageHostingKey}`;

      // Create FormData object for image upload
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await fetch(imageHostingApi, {
        method: "POST",
        body: formData, // Send the FormData object
      });

      const result = await response.json();

      console.log("imageHostingResult", result);

      if (result.success) {
        const imageUrl = result.data.url; // Get the hosted image URL from ImgBB

        const productData = {
          name: dataInfo.name,
          category: dataInfo.category,
          price: dataInfo.price,
          stock: dataInfo.stock,
          description: dataInfo.description,
          image: imageUrl, // Use the hosted image URL
        };

        console.log({ productData });

        await toast.promise(
          createProduct(productData).unwrap(),
          {
            loading: "Loading...",
            success: () => `${dataInfo.name} has been added`,
            error: "Error occurred while adding product",
          }
        );

        reset();
        setFileList([]); // Clear file list after successful submission
        clearErrors("image"); // Clear the image error if it exists
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      message.error("Failed to add product. Please try again.");
    }
  };

  const uploadProps: UploadProps = {
    listType: "picture",
    beforeUpload(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const img = document.createElement("img");
          img.src = reader.result as string;
          img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext("2d")!;
            ctx.drawImage(img, 0, 0);
            ctx.fillStyle = "red";
            ctx.textBaseline = "middle";
            ctx.font = "33px Arial";
            // ctx.fillText("Ant Design", 20, 20); 
            canvas.toBlob((result) => resolve(result as Blob));
          };
        };
      });
    },
    onChange(info) {
      if (info.fileList) {
        setFileList(info.fileList);
      }
    },
    customRequest: ({ file, onSuccess }) => {
      // Simulate a successful upload
      // setFileList([file]);
      setFileList([{ ...(file as RcFile), status: 'done' }]);
      onSuccess?.(file);
    },
  };

  return (
    <Card className="max-w-xl mx-auto mt-8 p-6 shadow-lg">
      <Title level={3} className="text-center mb-6">
        Add New Product
      </Title>
      <Form
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        {/* Product Name */}
        <Form.Item
          label="Product Name"
          validateStatus={errors.name ? "error" : ""}
          help={errors.name?.message}
          required
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: "Product name is required" }}
            render={({ field }) => (
              <Input {...field} placeholder="Enter product name" />
            )}
          />
        </Form.Item>

        {/* Category */}
        <Form.Item
          label="Category"
          validateStatus={errors.category ? "error" : ""}
          help={errors.category ? "Please select a category" : ""}
          required
        >
          <Controller
            name="category"
            control={control}
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Select Category"
                value={field.value || ""}
                onChange={(value) => field.onChange(value)}
              >
                <Select.Option value="" disabled>
                  Select Category
                </Select.Option>
                {data?.data?.map((category: any) => (
                  <Select.Option key={category._id} value={category._id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          />
        </Form.Item>

        {/* Price */}
        <Form.Item
          label="Price"
          validateStatus={errors.price ? "error" : ""}
          help={errors.price?.message}
          required
        >
          <Controller
            name="price"
            control={control}
            rules={{
              required: "Price is required",
              min: { value: 0.01, message: "Price must be at least 0.01" },
            }}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                min="0.01"
                step="0.01"
                placeholder="Enter product price"
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  if (value >= 0.01) {
                    field.onChange(value);
                  }
                }}
              />
            )}
          />
        </Form.Item>

        {/* Stock */}
        <Form.Item
          label="Stock"
          validateStatus={errors.stock ? "error" : ""}
          help={errors.stock?.message}
          required
        >
          <Controller
            name="stock"
            control={control}
            rules={{
              required: "Stock is required",
              min: { value: 1, message: "Stock must be at least 1" },
            }}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                min="1"
                placeholder="Enter stock quantity"
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (value >= 1) {
                    field.onChange(value);
                  }
                }}
              />
            )}
          />
        </Form.Item>

        {/* Description */}
        <Form.Item
          label="Description"
          validateStatus={errors.description ? "error" : ""}
          help={errors.description?.message}
          required
        >
          <Controller
            name="description"
            control={control}
            rules={{ required: "Description is required" }}
            render={({ field }) => (
              <Input.TextArea
                {...field}
                placeholder="Enter product description"
              />
            )}
          />
        </Form.Item>

        {/* Upload Image */}
        <Form.Item
          label="Upload Image"
          validateStatus={errors.image ? "error" : ""}
          help={errors.image?.message}
          required
        >
          <Controller
            name="image"
            control={control}
            rules={{ required: "Image is required" }}
            render={({ field }) => (
              <Upload
                {...uploadProps}
                fileList={fileList}
                onChange={(info) => {
                  setFileList(info.fileList);
                  field.onChange(info.fileList);
                }}
                onRemove={(file) => {
                  const updatedFileList = fileList.filter(
                    (f) => f.uid !== file.uid
                  );
                  setFileList(updatedFileList);
                  field.onChange(updatedFileList);
                }}
              >
                <Button type="primary" icon={<UploadOutlined />}>
                  Upload
                </Button>
              </Upload>
            )}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddProduct;
