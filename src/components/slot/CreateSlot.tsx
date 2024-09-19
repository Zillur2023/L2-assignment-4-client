import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Form, Input, Button, Card, Typography, Select } from "antd";
import { toast } from "sonner";
import {  useGetAllServicesQuery } from "../../redux/features/service/serviceApi";
import { useCreateSlotMutation } from "../../redux/features/slot/slotApi";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Option } = Select;

type FormValues = {
  service: string;
  date: string;
  startTime: string;
  endTime: string;
};

const CreateSlot: React.FC = () => {
  const navigate = useNavigate()
  const [createService] = useCreateSlotMutation();
  const { data: services, isLoading } = useGetAllServicesQuery(''); // Fetch service options

  console.log('serviceDatasss', services)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      service: "",
      date: "",
      startTime: "",
      endTime: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (dataInfo) => {
    const toastId = toast.loading("Slot creating...")
    const serviceData = {
      service: dataInfo.service,
      date: dataInfo.date,
      startTime: dataInfo.startTime,
      endTime: dataInfo.endTime,
    };
    try {
      const res = await createService(serviceData).unwrap()
      console.log({res})
      if(res.success) {
        toast.success(res?.message, {id: toastId})
        reset()
        navigate('/')
      } else {
        toast.error(res.message, {id: toastId})
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="max-w-xl mx-auto mt-8 p-6 shadow-lg">
      <Title level={3} className="text-center mb-6">
        Add New Service
      </Title>
      <Form
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        {/* Service Selection */}
        <Form.Item
          label="Service"
          validateStatus={errors.service ? "error" : ""}
          help={errors.service?.message}
          required
        >
          <Controller
            name="service"
            control={control}
            rules={{ required: "Service is required" }}
            render={({ field }) => (
              <Select
                {...field}
                loading={isLoading}
                placeholder="Select a service"
              >
                {services?.data?.map((service: { _id: string; name: string }) => (
                  <Option key={service?._id} value={service?._id}>
                    {service.name}
                  </Option>
                ))}
              </Select>
            )}
          />
        </Form.Item>

        {/* Date */}
        <Form.Item
          label="Date"
          validateStatus={errors.date ? "error" : ""}
          help={errors.date?.message}
          required
        >
          <Controller
            name="date"
            control={control}
            rules={{ required: "Date is required" }}
            render={({ field }) => (
              <Input {...field} type="date" placeholder="Select a date" />
            )}
          />
        </Form.Item>

        {/* Start Time */}
        <Form.Item
          label="Start Time"
          validateStatus={errors.startTime ? "error" : ""}
          help={errors.startTime?.message}
          required
        >
          <Controller
            name="startTime"
            control={control}
            rules={{ required: "Start time is required" }}
            render={({ field }) => (
              <Input {...field} type="time" placeholder="Select start time" />
            )}
          />
        </Form.Item>

        {/* End Time */}
        <Form.Item
          label="End Time"
          validateStatus={errors.endTime ? "error" : ""}
          help={errors.endTime?.message}
          required
        >
          <Controller
            name="endTime"
            control={control}
            rules={{ required: "End time is required" }}
            render={({ field }) => (
              <Input {...field} type="time" placeholder="Select end time" />
            )}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add Service
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default CreateSlot;
