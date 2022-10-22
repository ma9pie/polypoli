import React from "react";
import SignupLayout from "@/layouts/SignupLayout";

function Phone() {
  return <div>Phone</div>;
}

export default Phone;

Phone.getLayout = function getLayout(page) {
  return <SignupLayout>{page}</SignupLayout>;
};
