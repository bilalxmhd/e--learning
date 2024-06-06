import { UserMemberContext } from "@/app/_context/UserMemberContext";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { toast } from "sonner";

function CourseEnrollSection({ courseInfo, isUserAlreadyEnrolled }) {
  // const membership = false;
  const { user } = useUser();

  const { isMember, setIsMember } = useContext(UserMemberContext);
  const router = useRouter();

  useEffect(() => {
    console.log("isUserAlreadyEnrolled", isUserAlreadyEnrolled);
  }, [isUserAlreadyEnrolled]);

  //enroll to course
  const onEnrollCourse = () => {
    GlobalApi.enrollToCourse(
      courseInfo?.slug,
      user?.primaryEmailAddress.emailAddress
    ).then((resp) => {
      console.log(resp);

      if (resp) {
        //Show Toast on succesfull Enroll

        toast("User Enrolled Successfull", {
          description: "User Enrolled to this Course",
        });

        //Redirect to watch course
        router.push("/watch-course/" + resp.createUserEnrollCourse.id);
      }
    });
  };
  return (
    <div className="p-3 text-center rounded-sm bg-yellow-300 flex flex-col gap-3">
      <h2 className="text-[20px] font-bold text-black">Enroll The Course</h2>
      {/* user has membership and already login */}

      {user && (isMember || courseInfo.free) && !isUserAlreadyEnrolled ? (
        <div className="flex flex-col gap-3 ">
          <h2 className=" text-black font-light">
            Enroll Now To Start Learning and Building Project
          </h2>
          <Button
            className="bg-primary text-white mt-2 hover:bg-black hover:text-yellow-400"
            onClick={() => onEnrollCourse()}
          >
            Enroll Now
          </Button>
        </div>
      ) : !user ? (
        <div className="flex flex-col gap-3 ">
          <h2 className=" text-black font-light">
            Enroll Now To Start Learning and Building Project
          </h2>
          <Link href={"/sign-in"}>
            <Button className="bg-primary text-white mt-2 hover:bg-black hover:text-yellow-400">
              Enroll Now
            </Button>
          </Link>
        </div>
      ) : (
        !isUserAlreadyEnrolled && (
          <div className="flex flex-col gap-3 ">
            <h2 className=" text-black font-light">
              Buy Monthly Membership and Get Access to All Courses
            </h2>
            <Button className="bg-primary text-white mt-2 hover:bg-black hover:text-yellow-400">
              Buy Membership Just $2.55
            </Button>
          </div>
        )
      )}
      {/* user does not have  membership or Not Signup/Login  */}

      {isUserAlreadyEnrolled && (
        <div className="flex flex-col gap-3 ">
          <h2 className=" text-black font-light">
            Continue to Learn and Build Project
          </h2>
          <Link href={"/watch-course/" + isUserAlreadyEnrolled}>
            <Button className="bg-primary text-white mt-2 hover:bg-black hover:text-yellow-400">
              Continue
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default CourseEnrollSection;
