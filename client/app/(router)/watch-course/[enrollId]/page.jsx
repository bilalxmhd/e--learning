"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import CourseVideoDescription from "../../course-preview/[courseId]/_components/CourseVideoDescription";
import CourseContentSection from "../../course-preview/[courseId]/_components/CourseContentSection";
import { toast } from "sonner";

function WatchCourse({ params }) {
  const { user } = useUser();
  const [courseInfo, setCourseInfo] = useState([]);
  const [completedChapter, setCompletedChapter] = useState([]);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  useEffect(() => {}, []);

  useEffect(() => {
    params && user && getUserEnrolledCourseDetails();
  }, [params && user]);

  // get user enrolled course details by Id+Email

  const getUserEnrolledCourseDetails = () => {
    GlobalApi.getUserEnrolledCourseDetails(
      params.enrollId,
      user.primaryEmailAddress.emailAddress
    ).then((resp) => {
      setCompletedChapter(resp.userEnrollCourses[0].completedChapter);
      setCourseInfo(resp.userEnrollCourses[0].courseList);
    });
  };

  // save completed chapter Id
  const onChapterComplete = (chapterId) => {
    GlobalApi.markChapterCompleted(params.enrollId, chapterId).then((resp) => {
      console.log(resp);
      if (resp) {
        toast("chapter mark as completed!");
        getUserEnrolledCourseDetails();
      }
    });
  };
  return (
    courseInfo.name && (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 p-5 gap-3">
          {/* title,video,Description */}
          <div className="col-span-2 bg-white p-3">
            <CourseVideoDescription
              courseInfo={courseInfo}
              activeChapterIndex={activeChapterIndex}
              watchMode={true}
              setChapterCompleted={(chapterId) => onChapterComplete(chapterId)}
            />
          </div>
          {/* course content */}
          <div>
            <CourseContentSection
              courseInfo={courseInfo}
              isUserAlreadyEnrolled={true}
              watchMode={true}
              completedChapter={completedChapter}
              setActiveChapterIndex={(index) => setActiveChapterIndex(index)}
            />
          </div>
        </div>
      </div>
    )
  );
}

export default WatchCourse;
