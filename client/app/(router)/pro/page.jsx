"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Script from "next/script";
import React, { useState } from "react";
import { toast } from "sonner";

function Upgrade() {
  const [subscriptionId, setSubscriptionId] = useState(null);
  const { user } = useUser();

  /**
   * To create subscription Id
   * @param {*} planId
   * */
  const createSubscription = async (planId) => {
    axios
      .post(
        "/api/create-subscription",
        JSON.stringify({
          plan_id: planId,
        })
      )
      .then((resp) => {
        console.log(resp.data);
        setSubscriptionId(resp.data.id);
        makePayment();
      });
  };

  const makePayment = () => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_LIVE_KEY,
      subscription_id: subscriptionId,
      name: "E-Learning Academy",
      description: "Pro Membership",
      handler: async (resp) => {
        console.log(resp);
        if (resp) {
          addNewMember(resp?.razorpay_payment_id);
        }
      },
      theme: {
        color: "#7D41E1",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const addNewMember = (paymentId) => {
    GlobalApi.addNewMember(
      user.primaryEmailAddress.emailAddress,
      paymentId
    ).then(
      (resp) => {
        console.log(resp);
        if (resp) {
          toast("Payment Successfull!!");
        }
      },
      (error) => {
        toast("some error happened");
      }
    );
  };

  return (
    <div>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      ></Script>
      <div className="bg-gray-100 flex justify-center items-center mt-5">
        <div className="flex space-x-8">
          {/* Monthly Plan */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-80">
            <h2 className="text-2xl font-bold mb-4">Monthly</h2>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold">4.99$</span>
              <span className="text-sm text-gray-600">/month</span>
            </div>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-purple-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="ml-2">Access to All Courses</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-purple-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="ml-2">Free Source Code</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-purple-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="ml-2">Free App Membership</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-purple-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="ml-2">Email & Instagram DM support</span>
              </li>
            </ul>
            <Button
              onClick={() => createSubscription("")}
              className="mt-6 bg-purple-600 text-white py-2 px-4 rounded"
            >
              Get Started
            </Button>
          </div>

          {/* Yearly Plan */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-80">
            <h2 className="text-2xl font-bold mb-4">Yearly</h2>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold">39.99$</span>
              <span className="text-sm text-gray-600">/month</span>
            </div>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-purple-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="ml-2">Access to All Courses</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-purple-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="ml-2">Free Source Code</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-purple-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="ml-2">Free App Membership</span>
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-purple-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="ml-2">Email & Instagram DM support</span>
              </li>
            </ul>
            <Button className="mt-6 bg-purple-600 text-white py-2 px-4 rounded">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upgrade;
