import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddCourse from "./AddCourse";
import Course from "./Course.js";
import Loader from "../utils/Loader";
import { NotificationError, NotificationSuccess } from "../utils/Notifications";
import {
  getCourses as getCourseList,
  getReservationFee as getFee,
  addCourse as addCourse,
  makeReservation as makeReservationAction,
  endReservation as endReservationAction,
  deleteCourse as deletecourseAction,
} from "../../utils/course";
import PropTypes from "prop-types";
import { Row } from "react-bootstrap";
import { formatE8s } from "../../utils/conversions";

const Courses = ({ fetchBalance }) => {
  const [courses, setCourses] = useState([]);
  const [reservationFee, setReservationFee] = useState(0);
  const [loading, setLoading] = useState(false);

  const getCourses = async () => {
    setLoading(true);
    getCourseList()
      .then((courses) => {
        if (courses) {
          setCourses(courses);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally((_) => {
        setLoading(false);
      });
  };

  const getReservationFee = async () => {
    setLoading(true);
    getFee()
      .then((fee) => {
        if (fee) {
          setReservationFee(fee);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally((_) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getCourses();
    getReservationFee();
  }, []);

  const createNewCourse = async (data) => {
    setLoading(true);
    const priceStr = data.pricePerCourse;
    data.pricePerCourse = parseInt(priceStr, 10) * 10 ** 8;
    addCourse(data)
      .then(() => {
        toast(<NotificationSuccess text="Course added successfully." />);
        getCourses();
        fetchBalance();
      })
      .catch((error) => {
        console.log(error);
        toast(<NotificationError text="Failed to create course." />);
        setLoading(false);
      });
  };

  const makeReservation = async (course, noOfCourses) => {
    setLoading(true);
    makeReservationAction(course, noOfCourses)
      .then(() => {
        toast(<NotificationSuccess text="Reservation made successfully" />);
        getCourses();
        fetchBalance();
      })
      .catch((error) => {
        console.log(error);
        toast(<NotificationError text="Failed to make reservation." />);
        setLoading(false);
      });
  };

  const endReservation = async (id) => {
    setLoading(true);
    endReservationAction(id)
      .then(() => {
        toast(<NotificationSuccess text="Reservation ended successfully" />);
        getCourses();
        fetchBalance();
      })
      .catch((error) => {
        console.log(error);
        toast(<NotificationError text="Failed to end reservation." />);
        setLoading(false);
      });
  };

  const deleteCourse = async (id) => {
    setLoading(true);
    deletecourseAction(id)
      .then(() => {
        toast(<NotificationSuccess text="Course deleted successfully" />);
        getCourses();
        fetchBalance();
      })
      .catch((error) => {
        console.log(error);
        toast(<NotificationError text="Failed to delete course." />);
        setLoading(false);
      });
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fs-4 fw-bold mb-0 text-light">
          Language Learning Application{" "}
        </h1>
        <AddCourse createNewCourse={createNewCourse} />
      </div>
      <div className="mb-3 text-light">
        <i className="bi bi-bell-fill"></i> Holding fee for any reservation is{" "}
        {formatE8s(reservationFee)} ICP.
      </div>
      <Row xs={1} sm={2} lg={3} className="g-3 mb-5 g-xl-4 g-xxl-5">
        <>
          {courses.map((course, index) => (
            <Course
              course={course}
              makeReservation={makeReservation}
              endReservation={endReservation}
              deleteCourse={deleteCourse}
              key={index}
            />
          ))}
        </>
      </Row>
    </>
  );
};

Courses.propTypes = {
  fetchBalance: PropTypes.func.isRequired,
};

export default Courses;
