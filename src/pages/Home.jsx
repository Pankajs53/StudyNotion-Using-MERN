import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimeLineSection from "../components/core/HomePage/TimeLineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import Footer from "../components/common/Footer";
import ExploreMore from "../components/core/HomePage/ExploreMore";

const Home = () => {
  return (
    <div>
      {/* section A */}
      <div className="relative max-w-maxContent mx-auto flex flex-col w-11/12 md:items-center lg:items-center text-white justify-between items-start">
        <Link to={"/signup"}>
          <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-full shadow-sm shadow-white">
            <div className="flex flex-row items-center gap-2 rounded-full px-8 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become An Instrutor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className=" lg:text-center md:text-center  text-semibold text-4xl mt-7">
          Empower Your Future with
          <HighlightText text={"Coding Skills"} />
        </div>

        <div className="lg:text-center md:text-center text-start font-bold text-lg mt-4 text-richblack-300  w-[90%]">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on-project, quizzes, and personalized feedback from
          instructors.
        </div>

        {/* buttons */}
        <div className="flex flex-row gap-7 mt-8">
          {/* first button */}
          <CTAButton linkto={"/signup"} active={true}>
            Learn More
          </CTAButton>

          {/* second button */}
          <CTAButton linkto={"/login"} active={false}>
            Book a Demo
          </CTAButton>
        </div>

        {/* vidoe section0 */}
        <div className=" my-12 shadow-[10px_-5px_50px_-5px] shadow-blue-200 border border-lg lg:items-start">
          <video
            muted
            loop
            autoPlay
            className="shadow-[20px_20px_rgba(255,255,255)]"
          >
            <source src={Banner} type="video/mp4"></source>
          </video>
        </div>

        {/* code section 1 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl  font-semibold">
                Unlock your
                <HighlightText text={"coding potential"} /> with our online
                courses.
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-yellow-25"}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>

        {/* Code Section 2 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="w-[100%] text-4xl font-semibold lg:w-[50%]">
                Start
                <HighlightText text={"coding in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-white"}
            codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>

        {/* explore more */}
        <ExploreMore/>
      </div>

      {/* section 2 */}
      <div className=" bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[310px] ">
          <div className="w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto">
            <div className="h-[150px]"></div>
            <div className="flex flex-row gap-7 text-white ">
              <CTAButton linkto={"/signup"} active={true}>
                <div className="flex items-center gap-3">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>

              <CTAButton linkto={"/signup"} active={false}>
                <div>Learn More</div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-7">
          <div className="flex flex-row gap-5 mb-10 mt-[95px]">
            <div className="w-[45%] text-[25px] font-semibold">
              Get the skills you need for a{" "}
              <HighlightText text={"job that is in demand"} />
            </div>

            <div className="w-[45%] flex flex-col gap-10 items-start ">
              <p className="text-[16px]">
                The modern StudyNotion is the dicates its own terms. Today, to
                be a competitive speaclist requires more than professional
                skills
              </p>

              <CTAButton active={true} linkto={"signup"}>
                <div>Learn More</div>
              </CTAButton>
            </div>
          </div>

          <TimeLineSection/>

          <LearningLanguageSection/>
        </div>

        


        
      </div>

      {/* section 3 */}
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
            {/* Become a instructor section */}
            <InstructorSection />

            <p className="text-center text-4xl font-semibold mt-8">Reviews from other learners</p>

            {/* slider Remaining  */}
            {/* <ReviewSlider/> */}
      </div>

      {/* footer */}
      <Footer/>
    </div>
  );
};

export default Home;
