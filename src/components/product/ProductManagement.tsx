import React, { useState } from "react";
import { Space, Table, Button, Modal, Form, Input, InputNumber, Select, Row, Col } from "antd";
import { useGetAllCategoriesQuery } from "../../redux/features/category/categoryApi";
import { useDeleteProductMutation, useGetAllProductsQuery, useUpdateProductMutation } from "../../redux/features/product/productApi";

const { Option } = Select;

interface TableProductData {
  _id: string;
  key: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

const ProductManagement: React.FC = () => {
  const { data: products, isLoading } = useGetAllProductsQuery('');
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<TableProductData | null>(null);
  const { data: categoryData } = useGetAllCategoriesQuery('');

  const getCategoryName = (categoryId: any) => {
    const category = categoryData?.data?.find((cat: any) => cat._id === categoryId);
    return category ? category.name : "undefined";
  };

  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setCurrentProduct(null);
  };

  const onFinish = async (values: any) => {
    if (currentProduct) {
      try {
        await updateProduct({ ...currentProduct, ...values }).unwrap();
      } catch (error) {
        console.error("Failed to update product:", error);
      }
    }
    handleCancel();
  };

  const handleEdit = (product: TableProductData) => {
    setCurrentProduct(product);
    form.setFieldsValue(product);
    setIsModalVisible(true);
  };

  const handleDelete = async (product: any) => {
    try {
      await deleteProduct(product._id);
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handleDeleteClick = (product: any) => {
    Modal.confirm({
      title: (
        <span>
          Are you sure you want to delete{' '}
          <span style={{ color: 'red', fontWeight: 'bold' }}>
            {product.name}
          </span>
          ?
        </span>
      ),
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDelete(product),
    });
  };

  const columns = [
    {
      title: "No",
      key: "no",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      key: "category",
      render: (_: any, record: any) => getCategoryName(record?.category),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDeleteClick(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const dataSource = products?.data?.map((item: any) => ({
    _id: item._id,
    key: item._id,
    name: item.name,
    category: item.category._id,
    price: item.price,
    stock: item.stock,
  }));

  return (
    <>
      <Row justify="center" style={{ margin: '20px' }}>
        <Col xs={24} sm={22} md={20} lg={18}>
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={{ pageSize: 10 }}
            scroll={{ x: 'max-content' }}
          />
          <div className="mt-5 text-center">{isLoading && "Loading..."}</div>
        </Col>
      </Row>

      <Modal
        title="Edit Product"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width="80%"
        style={{ maxWidth: '800px' }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter the product name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select the product category!" }]}
          >
            <Select>
              {categoryData?.data?.map((category: any) => (
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter the product price!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Stock"
            name="stock"
            rules={[{ required: true, message: "Please enter the product stock!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Update Product
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ProductManagement;
