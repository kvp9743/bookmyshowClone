import { Col, Form, Input, message, Modal, Row, Select } from "antd";
import { useDispatch } from "react-redux";
import Button from "../../Components/Button";
import { toggleLoader } from "../../Redux/loaderSlice";
import moment from "moment";
import { addMovie, updateMovie } from "../../Services/movieApiCalls";

const Movieform = ({
  movieForm,
  setMovieForm,
  formType,
  selectedMovie,
  getData,
}) => {
  const formattedMovie = selectedMovie
    ? {
        ...selectedMovie,
        releaseDate: moment(selectedMovie.releaseDate).format("YYYY-MM-DD"),
      }
    : {};

  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(toggleLoader(true));
      let response = null;
      if (formType === "add") response = await addMovie(values);
      else response = await updateMovie({ _id: selectedMovie._id, ...values });
      if (response?.success) {
        message.success(response.message);
        setMovieForm(false);
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
        title={formType === "add" ? "ADD MOVIE" : "EDIT MOVIE"}
        open={movieForm}
        onCancel={() => {
          setMovieForm(false);
        }}
        footer={null}
        width={800}
      >
        <Form
          layout="vertical"
          initialValues={formattedMovie}
          onFinish={onFinish}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item label="Movie Name" name="title">
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Movie Description" name="description">
                <Input.TextArea />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Movie Duration (Min)" name="duration">
                <Input type="number" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Language" name="language">
                <Select
                  showSearch={{ optionFilterProp: "label" }}
                  placeholder="Select a person"
                  //onChange={onChange}
                  options={[
                    {
                      value: "English",
                      label: "English",
                    },
                    {
                      value: "Hindi",
                      label: "Hindi",
                    },
                    {
                      value: "Tamil",
                      label: "Tamil",
                    },
                    {
                      value: "Telugu",
                      label: "Telugu",
                    },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Movie Release Date" name="releaseDate">
                <Input type="date" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Genre" name="genre">
                <Input />
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label="Poster URL" name="poster">
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <div className="flex justify-end gap-1">
            <Button
              title="Cancel"
              onClick={() => {
                setMovieForm(false);
              }}
            />
            <Button title="Save" type="Submit" />
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default Movieform;
