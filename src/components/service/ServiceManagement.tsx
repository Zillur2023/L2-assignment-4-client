import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, Space } from "antd";
import { useDeleteServiceMutation, useGetAllServicesQuery, useUpdateServiceMutation } from "../../redux/features/service/serviceApi";

interface DataType {
  _id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
}

const Servicemanagement: React.FC = () => {
  const { data: serviceData, isFetching } = useGetAllServicesQuery('');
  const [deleteService] = useDeleteServiceMutation();
  const [updateService] = useUpdateServiceMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentService, setCurrentService] = useState<DataType | null>(null);
  const [form] = Form.useForm();

  const handleEdit = (service: DataType) => {
    setCurrentService(service);
    form.setFieldsValue(service);
    setIsModalVisible(true);
  };

  const handleDelete = async (service: DataType) => {
    try {
      await deleteService(service._id);
    } catch (error) {
      console.error("Failed to delete service:", error);
    }
  };

  const handleDeleteClick = (service: DataType) => {
    Modal.confirm({
      // title: `Are you sure you want to delete ${service.name}?`,
      title: (
        <span>
          Are you sure you want to delete{' '}
          <span style={{ color: 'red', fontWeight: 'bold' }}>
            {service.name}
          </span>
          ?
        </span>
      ),
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDelete(service),
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setCurrentService(null);
  };

  const onFinish = async (values: DataType) => {
    if (currentService) {
      try {
        await updateService({ ...currentService, ...values }).unwrap();
        handleCancel();
      } catch (error) {
        console.error("Failed to update service:", error);
      }
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      filters: serviceData?.data?.map((service: DataType) => ({ text: service.name, value: service.name })),
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value as string),
      width: "30%",
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "40%",
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      width: "15%",
    },
    {
      title: "Duration (minutes)",
      dataIndex: "duration",
      sorter: (a, b) => a.duration - b.duration,
      width: "15%",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: DataType) => (
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

  const data = serviceData?.data?.map((service: DataType) => ({
    key: service._id,
    ...service,
  }));

  return (
    <>
      <Table loading={isFetching} columns={columns} dataSource={data} />

      <Modal
        title="Edit Service"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter the service name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter the service description!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter the service price!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Duration (minutes)"
            name="duration"
            rules={[{ required: true, message: "Please enter the service duration!" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Update Service
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Servicemanagement;
