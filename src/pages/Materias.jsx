import React, { useEffect, useState } from "react";
import { Input, Select } from "antd";
import server from "../APIS/server";
const { Option } = Select;

const Materias = () => {
  const [schoolClass, setSchoolClass] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [average, setAverage] = useState(0);
  const [generalAverage, setGeneralAverage] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    server.getAllClasses().then(schoolClass => {
      setSchoolClass(schoolClass);
      setIsLoading(false);
    });
    server.getGeneralAverage().then(response => {
      setGeneralAverage(response.average);
    });
  }, []);

  const handleOnChangeClassSelect = value => {
    setIsLoading(true);
    server.getAverageByClass(value).then(data => {
      const { average } = data;
      console.log(data);
      setAverage(average);
      setIsLoading(false);
    });
  };

  return (
    <div className="container margin">
      <div className="section-header-container">
        <strong>Materias</strong>
      </div>
      <div className="section-header-container">
        <h5>Promedio general</h5>
      </div>
      <div className="add-register-container">
        <Input style={{ marginLeft: 15 }} value={generalAverage} />
      </div>
      <div className="section-header-container">
        <h5>Promedio por materia</h5>
      </div>
      <div className="add-register-container">
        <Select
          loading={isLoading}
          onChange={handleOnChangeClassSelect}
          showSearch
          style={{ width: 500 }}
          placeholder="Selecciona una materia"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {Array.isArray(schoolClass)
            ? schoolClass.map(schoolClass => (
                <Option key={schoolClass} value={schoolClass}>
                  {schoolClass}
                </Option>
              ))
            : null}
        </Select>
        <Input style={{ marginLeft: 15 }} value={average} />
      </div>
    </div>
  );
};

export default Materias;
