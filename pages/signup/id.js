import React from "react";
import SignupLayout from "@/layouts/SignupLayout";

function Id() {
  return <div>id</div>;
}

export default Id;

Id.getLayout = function getLayout(page) {
  return <SignupLayout>{page}</SignupLayout>;
};
