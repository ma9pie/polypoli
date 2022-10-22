import React from "react";
import SettingLayout from "@/layouts/SettingLayout";

function Management() {
  return <div>management</div>;
}

export default Management;

Management.getLayout = function getLayout(page) {
  return <SettingLayout>{page}</SettingLayout>;
};
