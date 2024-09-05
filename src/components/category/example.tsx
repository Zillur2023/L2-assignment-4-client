import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  Form,
  Input,
  Button,
  message,
  Card,
  Typography,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { useCreateCategoryMutation } from "../../redux/features/category/categoryApi";
import { toast } from "sonner";
import { RcFile } from "antd/es/upload";

const { Title } = Typography;

type FormValues = {
  name: string;
  image?: UploadFile[];
};

const image_hosting_key = 'd686a14f67c883bd74bfcfca42893a08'
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddCategory: React.FC = () => {
  const [createCategory] = useCreateCategoryMutation();
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
      image: [],
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (dataInfo) => {
    console.log('addCategoryFromData',dataInfo)
    if (fileList.length === 0) {
      setError("image", { type: "manual", message: "Image is required" });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", fileList[0].originFileObj as Blob); // Append the first file

      console.log("fileList[0].originFileObj",fileList[0].originFileObj)

      const productData = {
        name: dataInfo.name,
      };

      formData.append("data", JSON.stringify(productData));

      // console.log("FormData:", formData);

   
      reset();
      setFileList([]); // Clear file list after successful submission
      clearErrors("image"); // Clear the image error if it exists
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
        Add New Category
      </Title>
      <Form
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        {/* Product Name */}
        <Form.Item
          label="Category Name"
          validateStatus={errors.name ? "error" : ""}
          help={errors.name?.message}
          required
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: "Category name is required" }}
            render={({ field }) => (
              <Input {...field} placeholder="Enter category name" />
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
            Add Category
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddCategory;
