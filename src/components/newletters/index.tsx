"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";

export default function Newletters() {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let response: any;
    try {
      response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/subscriber/${email}`, {});
      if (response.data?.sucess == true) {
        setEmail("");
      }
    } catch (error) {}
  };
  return (
    <div className="container-fluid bg-primary newsletter py-5">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div
            className="col-md-5 ps-lg-0 pt-5 pt-md-0 text-start wow fadeIn"
            data-wow-delay="0.3s"
          >
            <Image
              width={600}
              height={600}
              className="img-fluid"
              src="/img/newsletter.png"
              alt=""
            />
          </div>
          <div
            className="col-md-7 py-5 newsletter-text wow fadeIn"
            data-wow-delay="0.5s"
          >
            <div className="btn btn-sm border rounded-pill text-white px-3 mb-3">
              Newsletter
            </div>
            <h1 className="text-white mb-4">Let's subscribe the newsletter</h1>
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="position-relative w-100 mt-3 mb-2"
            >
              <input
                className="form-control border-0 rounded-pill w-100 ps-4 pe-5"
                type="email"
                value={email}
                onChange={(e: any) => {
                  setEmail(e.target.value);
                }}
                required
                placeholder="Enter Your Email"
                height={70}
              />
              <button
                type="submit"
                className="btn shadow-none position-absolute top-0 end-0 mt-1 me-2"
              >
                <FontAwesomeIcon
                  icon={faPaperPlane}
                  className="text-primary fs-4 mb-4"
                  width={20}
                />
              </button>
            </form>
            <small className="text-white-50">
              Diam sed sed dolor stet amet eirmod
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}
