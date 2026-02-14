import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllBookings } from "../redux/actions/bookingActions";
import { Row, Col, Divider } from "antd";
import moment from "moment";

function UserBookings() {
  const dispatch = useDispatch();

  const { bookings } = useSelector((state) => state.bookingsReducer);
  const { loading } = useSelector((state) => state.alertsReducer);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  return (
    <DefaultLayout>
      <h2 className="text-center mt-2">My Bookings</h2>

      <Row justify="center" gutter={16}>
        {bookings
          .filter((o) => o.user === user._id)
          .map((booking) => (
            <Col lg={16} sm={24} className="bs1 p-3 m-2" key={booking._id}>
              <Row gutter={16}>
                <Col lg={6} sm={24}>
                  <p><b>{booking.car.name}</b></p>
                  <p>Total Days: {booking.totalHours / 24}</p>
                  <p>Total Amount: ₹{booking.totalAmount}</p>
                </Col>

                <Col lg={6} sm={24}>
                  <p>
                    From:{" "}
                    {moment(booking.bookedTimeSlots.from).format(
                      "MMM DD YYYY HH:mm"
                    )}
                  </p>
                  <p>
                    To:{" "}
                    {moment(booking.bookedTimeSlots.to).format(
                      "MMM DD YYYY HH:mm"
                    )}
                  </p>
                </Col>

                <Col lg={6} sm={24}>
                  <p>Transaction ID: {booking.transactionId}</p>
                  <p>Status: Booked</p>
                </Col>
              </Row>
            </Col>
          ))}
      </Row>
    </DefaultLayout>
  );
}

export default UserBookings;
