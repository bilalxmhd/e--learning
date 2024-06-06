"use client";

import React, { useEffect, useState } from "react";
import CourseVideoDescription from "./_components/CourseVideoDescription";
import GlobalApi from "@/app/_utils/GlobalApi";
import CourseEnrollSection from "./_components/CourseEnrollSection";
import CourseContentSection from "./_components/CourseContentSection";
import { useUser } from "@clerk/nextjs";

function CoursePreview({ params }) {
  const { user } = useUser();
  const [courseInfo, setCourseInfo] = useState(null);
  const [isUserAlreadyEnrolled, setIsUserAlreadyEnrolled] = useState("");

  useEffect(() => {
    params && getCourseInfoById();
  }, [params]);

  useEffect(() => {
    courseInfo && user && checkUserEnrolledToCourse();
  }, [courseInfo, user]);

  //   used to get course info by slug/id name

  const getCourseInfoById = () => {
    GlobalApi.getCourseById(params?.courseId).then((resp) => {
      setCourseInfo(resp?.courseList);
    });
  };
  // to check user already enrolled to course

  const checkUserEnrolledToCourse = () => {
    GlobalApi.checkUserEnrolledToCourse(
      courseInfo.slug,
      user.primaryEmailAddress.emailAddress
    ).then((resp) => {
      if (resp?.userEnrollCourses) {
        setIsUserAlreadyEnrolled(resp?.userEnrollCourses[0]?.id);
      }
    });
  };

  return (
    courseInfo && (
      <div className="grid grid-cols-1 md:grid-cols-3 p-5 gap-3">
        {/* title,video,Description */}
        <div className="col-span-2 bg-white p-3">
          <CourseVideoDescription courseInfo={courseInfo} />
        </div>
        {/* course content */}
        <div>
          <CourseEnrollSection
            courseInfo={courseInfo}
            isUserAlreadyEnrolled={isUserAlreadyEnrolled}
          />
          <CourseContentSection
            courseInfo={courseInfo}
            isUserAlreadyEnrolled={isUserAlreadyEnrolled}
          />
        </div>
      </div>
    )
  );
}

export default CoursePreview;
