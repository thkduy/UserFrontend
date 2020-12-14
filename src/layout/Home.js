import {React, useEffect, useState} from "react";

import dotenv from 'dotenv';
import ListUsers from "./Home/ListUsers";
dotenv.config();
console.log(process.env.SERVER_HOST);


export default function Home() {

  return (
      <ListUsers />

  );
}

