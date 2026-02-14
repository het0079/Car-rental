import { message } from "antd";
import axios from "axios";

const API = "http://localhost:5000";

// =====================
// GET ALL CARS
// =====================
export const getAllCars = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.get(`${API}/api/cars`);
    dispatch({ type: "GET_ALL_CARS", payload: response.data });
  } catch (error) {
    console.log(error);
    message.error("Failed to load cars");
  }

  dispatch({ type: "LOADING", payload: false });
};

// =====================
// ADD CAR
// =====================
export const addCar = (formData) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post(`${API}/api/cars/addcar`, formData);
    message.success("Car added successfully");

    setTimeout(() => {
      window.location.href = "/admin";
    }, 500);
  } catch (error) {
    console.log(error);
    message.error("Something went wrong");
  }

  dispatch({ type: "LOADING", payload: false });
};

// =====================
// EDIT CAR
// =====================
export const editCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post(`${API}/api/cars/editcar`, reqObj);
    message.success("Car details updated successfully");

    setTimeout(() => {
      window.location.href = "/admin";
    }, 500);
  } catch (error) {
    console.log(error);
    message.error("Update failed");
  }

  dispatch({ type: "LOADING", payload: false });
};

// =====================
// DELETE CAR
// =====================
export const deleteCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post(`${API}/api/cars/deletecar`, reqObj);
    message.success("Car deleted successfully");

    setTimeout(() => {
      window.location.reload();
    }, 500);
  } catch (error) {
    console.log(error);
    message.error("Delete failed");
  }
  dispatch({ type: "LOADING", payload: false });
};
