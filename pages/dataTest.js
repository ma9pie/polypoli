import Axios from "axios";
import React, { useEffect } from "react";
import Rest from "@/api/index.js";

const DataTest = () => {
  useEffect(() => {
    Rest.get("/api/v2/user").then((res) => {});
    Rest.get("https://jsonplaceholder.typicode.com/todos").then((res) => {});
  }, []);
  return <div>DataTest</div>;
};

export default DataTest;
