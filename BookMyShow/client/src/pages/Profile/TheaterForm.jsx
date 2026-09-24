import React from "react";
import { addTheater, updateTheater } from "../../Services/theaterApiCalls";
import { useDispatch } from "react-redux";
import { toggleLoader } from "../../Redux/loaderSlice";
import { Col, Form, Input, message, Modal, Row } from "antd";
import Button from "../../Components/Button";

const TheaterForm = ({
  theaterForm,
  setTheaterForm,
  formType,
  selectedTheater,
  getData,
}) => {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(toggleLoader(true));
      let response = null;
      if (formType === "add") response = await addTheater(values);
      else
        response = await updateTheater({ _id: selectedTheater._id, ...values });
      if (response?.success) {
        message.success(response.message);
        setTheaterForm(false);
        await getData();
      } else message.error(response.message);
      dispatch(toggleLoader(false));
    } catch (err) {
      dispatch(toggleLoader(false));
      message.error(err?.response?.data?.message || err.message);
    }
  };
  return (
    <div>
      <Modal
        title={formType === "add" ? "ADD THEATER" : "EDIT THEATER"}
        open={theaterForm}
        onCancel={() => {
          setTheaterForm(false);
        }}
        footer={null}
        width={800}
      >
        <Form
          layout="vertical"
          initialValues={selectedTheater}
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Theater Name" name="name">
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Address" name="address">
                <Input.TextArea />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Contact Details" name="phone">
                <Input type="number" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Email" name="email">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <div className="flex justify-end gap-1">
            <Button
              title="Cancel"
              onClick={() => {
                setTheaterForm(false);
              }}
            />
            <Button title="Save" type="submit" />
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default TheaterForm;
