import React from "react";
import SettingLayout from "@/layouts/SettingLayout";

function Password() {
  return <div>password</div>;
}

export default Password;

Password.getLayout = function getLayout(page) {
  return <SettingLayout>{page}</SettingLayout>;
};
