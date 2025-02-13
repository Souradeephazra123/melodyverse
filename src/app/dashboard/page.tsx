import React from "react";
import { permanentRedirect } from "next/navigation";
import { cookies } from "next/headers";
// import Event from "@/components/Event";
import { getEvents } from "./action";

const page = async () => {
  const cookieStore = await cookies();
  const userCookie = cookieStore?.get("userProfile");
  const userId= cookieStore?.get("userid");
  const id= userId ? userId.value : "";
  const userData = userCookie ? userCookie.value : null;
  if (!userData) {
    return permanentRedirect("/login");
  }


  const GetAllEvents=await getEvents("public");

  
  return <div>
    {/* <Event userid={id} events={GetAllEvents}/> */}
    </div>;
};

export default page;
