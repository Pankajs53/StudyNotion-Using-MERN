import React from "react";
import ContactUsForm from "./ContactUsForm";
import { useForm } from "react-hook-form";

const ContactForm = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const onSubmit = values => console.log(values);

  return (
    <div className="border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col">
      {/* info section */}
      <h1 className="text-4xl leading-10 font-semibold text-richblack-5">
        Got a Idea? We&apos;ve got the skills. Let&apos;s team up
      </h1>
      <p className="">
        Tell us more about yourself and what you&apos;re got in mind.
      </p>
      {/* form section */}
      <div className="mt-7">
        <ContactUsForm/>
      </div>
    </div>
  );
};

export default ContactForm;
