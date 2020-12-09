import React, { useEffect, useState } from "react";
import { Form, Input, Button, InputNumber, Select } from "antd";
import server from "../APIS/server";
const { Option } = Select;

const Alumnos = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [average, setAverage] = useState(0);
  const [activeStudent, setActiveStudent] = useState("");

  useEffect(() => {
    server.getAllStudents().then(students => {
      setStudents(students);
    });
  }, []);

  const [form] = Form.useForm();

  const handleFinishiForm = values => {
    console.log("values", values);
    setIsLoading(true);
    setActiveStudent("");
    setAverage(0);
    server.addRegister(values).then(() => {
      setIsLoading(false);
      server.getAllStudents().then(students => {
        setStudents(students);
      });
      form.resetFields();
    });
  };

  const handleOnChangeStudentsSelect = value => {
    setActiveStudent(value);
    server.getStudentAvegare(value).then(data => {
      const { average } = data;
      console.log(data);
      setAverage(average);
    });
  };

  return (
    <div className="container margin">
      <div className="section-header-container">
        <strong>Alumnos</strong>
      </div>
      <div className="section-header-container">
        <h5>Consular promedio</h5>
      </div>
      <div className="add-register-container">
        <Select
          showSearch
          style={{ width: 500 }}
          loading={isLoading}
          onChange={handleOnChangeStudentsSelect}
          placeholder="Selecciona un estudiante"
          optionFilterProp="children"
          value={activeStudent}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {Array.isArray(students)
            ? students.map(student => (
                <Option key={student} value={student}>
                  {student}
                </Option>
              ))
            : null}
        </Select>
        <Input style={{ marginLeft: 15 }} value={average} />
      </div>
      {/* AGREGAR REGISTRO */}
      <div className="section-header-container">
        <h5>Agregar registro</h5>
      </div>
      <div className="add-register-container">
        <Form
          style={{ width: "50%" }}
          layout={"vertical"}
          form={form}
          onFinish={handleFinishiForm}
        >
          <Form.Item
            name="alumno"
            label="Nombre"
            rules={[{ required: true, message: "El nombre es obligatorio" }]}
          >
            <Input
              disabled={isLoading}
              placeholder="Joaquin Coronado Ramirez"
            />
          </Form.Item>
          <Form.Item
            name="materia"
            label="Materia"
            rules={[{ required: true, message: "La materia es obligatoria" }]}
          >
            <Input
              disabled={isLoading}
              placeholder="Sistemas Concurrentes y Distribuidos"
            />
          </Form.Item>
          <Form.Item
            name="calificacion"
            label="Calificación"
            rules={[
              { required: true, message: "La calificación es obligatoria" },
            ]}
          >
            <InputNumber disabled={isLoading} />
          </Form.Item>
          <Form.Item>
            <Button loading={isLoading} type="primary" htmlType="submit">
              Guardar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Alumnos;
