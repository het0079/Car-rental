import { Col, Row, Divider, DatePicker, Checkbox, Modal } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import Spinner from "../components/Spinner";
import { getAllCars } from "../redux/actions/carsActions";
import moment from "moment";
import { bookCar } from "../redux/actions/bookingActions";
import StripeCheckout from "react-stripe-checkout";
import { useParams } from "react-router-dom";

const { RangePicker } = DatePicker;

function BookingCar() {
  const { carid } = useParams();
  const dispatch = useDispatch();

  const { cars } = useSelector((state) => state.carsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);

  const [car, setCar] = useState({});
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [totalDays, setTotalDays] = useState(0);
  const [driver, setDriver] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      const found = cars.find((o) => o._id === carid);
      setCar(found);
    }
  }, [cars, carid, dispatch]);

  function selectTimeSlots(values) {
    const fromISO = values[0].toISOString();
    const toISO = values[1].toISOString();

    setFrom(fromISO);
    setTo(toISO);

    const days = Math.ceil(values[1].diff(values[0], "days", true));
    setTotalDays(days);
  }

  useEffect(() => {
    if (!car?.rentPerDay || totalDays === 0) return;

    let amount = totalDays * car.rentPerDay;
    if (driver) amount += totalDays * 500;

    setTotalAmount(amount);
  }, [totalDays, driver, car]);

  function onToken(token) {
    const reqObj = {
      token,
      user: JSON.parse(localStorage.getItem("user"))._id,
      car: car._id,
      totalDays,
      totalAmount,
      driverRequired: driver,
      bookedTimeSlots: { from, to },
    };

    dispatch(bookCar(reqObj));

    setTimeout(() => {
      dispatch(getAllCars());
    }, 500);
  }

  return (
    <DefaultLayout>
      {loading && <Spinner />}

      <Row justify="center" className="d-flex align-items-center" style={{ minHeight: "90vh" }}>
        <Col lg={10} sm={24} xs={24} className="p-3">
          <img src={car?.image} className="carimg2 bs1 w-100" alt="" />
        </Col>

        <Col lg={10} sm={24} xs={24} className="text-right">

          <Divider dashed>Car Info</Divider>
          <p>{car?.name}</p>
          <p>Rent Per Day : ₹{car?.rentPerDay}</p>
          <p>Fuel Type : {car?.fuelType}</p>
          <p>Max Persons : {car?.capacity}</p>

          <Divider dashed>Select Time Slot</Divider>

          <RangePicker showTime format="MMM DD YYYY HH:mm" onChange={selectTimeSlots} />

          <br />

          <button className="btn1 mt-2" onClick={() => setShowModal(true)}>
            See Booked Slots
          </button>

          {from && to && (
            <>
              <p>Total Days : {totalDays}</p>
              <p>Rent Per Day : ₹{car?.rentPerDay}</p>

              <Checkbox onChange={(e) => setDriver(e.target.checked)}>
                Driver Required (+₹500/day)
              </Checkbox>

              <h3>Total Amount : ₹{totalAmount}</h3>

              <StripeCheckout
                shippingAddress
                token={onToken}
                currency="inr"
                amount={totalAmount * 100}
                stripeKey="pk_test_51NFtVGSAZAXtdYSkpJntFLfuU3dQNlk1BVqldJWCWQUyDqAtoE1wHVhRCB2GEnGurggdZOd1L08afXnaMN0H7qcO00yUPQevQp"
              >
                <button className="btn1">Book Now</button>
              </StripeCheckout>
            </>
          )}
        </Col>

        {car?.bookedTimeSlots && (
          <Modal open={showModal} footer={false} onCancel={() => setShowModal(false)}>
            {car.bookedTimeSlots.map((slot, i) => (
              <button key={i} className="btn1 mt-2">
                {moment(slot.from).format("MMM DD YYYY HH:mm")} -{" "}
                {moment(slot.to).format("MMM DD YYYY HH:mm")}
              </button>
            ))}
          </Modal>
        )}
      </Row>
    </DefaultLayout>
  );
}

export default BookingCar;
