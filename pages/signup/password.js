import React from "react";
import SignupLayout from "@/layouts/SignupLayout";

function Password() {
  return <div>password</div>;
}

export default Password;

Password.getLayout = function getLayout(page) {
  return <SignupLayout>{page}</SignupLayout>;
};
