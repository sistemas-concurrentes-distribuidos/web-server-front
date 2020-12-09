import clienteAxios from "../config/axios";

export const getAllStudents = async () => {
  try {
    const response = await clienteAxios.get("student");
    const { data } = response;
    return data;
  } catch (e) {
    console.log(e);
  }
};
export const addRegister = async body => {
  try {
    const response = await clienteAxios.post("student", body);
    const { data } = response;
    return data;
  } catch (e) {
    console.log(e);
  }
};
export const getAllClasses = async () => {
  try {
    const response = await clienteAxios.get("class");
    const { data } = response;
    return data;
  } catch (e) {
    console.log(e);
  }
};
export const getGeneralAverage = async () => {
  try {
    const response = await clienteAxios.get("average");
    const { data } = response;
    return data;
  } catch (e) {
    console.log(e);
  }
};
export const getStudentAvegare = async student => {
  try {
    const response = await clienteAxios.get(`average/student/${student}`);
    const { data } = response;
    return data;
  } catch (e) {
    console.log(e);
  }
};
export const getAverageByClass = async schoolClass => {
  try {
    const response = await clienteAxios.get(`average/class/${schoolClass}`);
    const { data } = response;
    return data;
  } catch (e) {
    console.log(e);
  }
};

const server = {
  getAllStudents,
  addRegister,
  getAllClasses,
  getGeneralAverage,
  getStudentAvegare,
  getAverageByClass,
};

export default server;
