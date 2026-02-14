import React, { useState } from "react";
import { useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { addCar } from "../redux/actions/carsActions";
import { message } from "antd";

function AddCar() {
  const dispatch = useDispatch();

  const [car, setCar] = useState({
    name: "",
    rentPerHour: "",
    capacity: "",
    fuelType: "",
  });

  const [image, setImage] = useState(null);

  function handleChange(e) {
    setCar({ ...car, [e.target.name]: e.target.value });
  }

  function submitForm() {
    if (!image) {
      message.error("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", car.name);
    formData.append("rentPerDay", car.rentPerDay);
    formData.append("capacity", car.capacity);
    formData.append("fuelType", car.fuelType);

    dispatch(addCar(formData));
  }

  return (
    <DefaultLayout>
      <div className="container mt-4">
        <h3>Add New Car</h3>

        <input
          type="text"
          placeholder="Car name"
          name="name"
          value={car.name}
          onChange={handleChange}
        />

        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <input
          type="number"
          placeholder="Rent per Day"
          name="rentPerDay"
          value={car.rentPerDay}
          onChange={handleChange}
        />

        <input
          type="number"
          placeholder="Capacity"
          name="capacity"
          value={car.capacity}
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="Fuel Type"
          name="fuelType"
          value={car.fuelType}
          onChange={handleChange}
        />

        <button className="btn1 mt-3" onClick={submitForm}>
          ADD CAR
        </button>
      </div>
    </DefaultLayout>
  );
}

export default AddCar;
