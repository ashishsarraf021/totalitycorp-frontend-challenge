import React, { useEffect, useState } from "react";
import CreateCourse from "./CreateCourse";
import { useParams } from "react-router-dom";

function UpdateCourse() {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});

  useEffect(() => {
    fetch(
      `https://course-selling-web-app-tau.vercel.app/admin/courses/${courseId}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setCourse(data.course);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <CreateCourse course={course} isUpdate={true} />
    </div>
  );
}

export default UpdateCourse;
