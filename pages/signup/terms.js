import React from "react";
import SignupLayout from "@/layouts/SignupLayout";

function Terms() {
  return <div>Terms</div>;
}

export default Terms;

Terms.getLayout = function getLayout(page) {
  return <SignupLayout>{page}</SignupLayout>;
};
