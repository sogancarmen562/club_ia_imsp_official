"use client";

import axios from "axios";
import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let response: any;
    try {
      response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/contact-us`, {
        name: name,
        email: email,
        subject: subject,
        message: message,
      });
      // console.log(name);
      if (response.data?.sucess == true) {
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      }
    } catch (error) {}
  };

  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        <div
          className="mx-auto text-center wow fadeIn"
          data-wow-delay="0.1s"
          style={{ maxWidth: "500px" }}
        >
          <div className="btn btn-sm border rounded-pill text-primary px-3 mb-3">
            Contact Us
          </div>
          <h1 className="mb-4">If You Have Any Query, Please Contact Us</h1>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <p className="text-center mb-4">
              The contact form is currently inactive. Get a functional and
              working contact form with Ajax & PHP in a few minutes. Just copy
              and paste the files, add a little code and you're done.{" "}
              <a href="https://htmlcodex.com/contact-form">Download Now</a>.
            </p>
            <div className="wow fadeIn" data-wow-delay="0.3s">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e: any) => {
                          setName(e.target.value);
                        }}
                        placeholder="Your Name"
                      />
                      <label htmlFor="name">Your Name</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e: any) => {
                          setEmail(e.target.value);
                        }}
                        placeholder="Your Email"
                      />
                      <label htmlFor="email">Your Email</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        value={subject}
                        onChange={(e: any) => {
                          setSubject(e.target.value);
                        }}
                        placeholder="Subject"
                      />
                      <label htmlFor="subject">Subject</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        placeholder="Leave a message here"
                        id="message"
                        value={message}
                        onChange={(e: any) => {
                          setMessage(e.target.value);
                        }}
                        style={{ height: "150px" }}
                      ></textarea>
                      <label htmlFor="message">Message</label>
                    </div>
                  </div>
                  <div className="col-12">
                    <button
                      className="btn btn-primary w-100 py-3"
                      type="submit"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
