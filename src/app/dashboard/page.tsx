import React from "react";
import { permanentRedirect } from "next/navigation";
import { cookies } from "next/headers";
import Event from "@/components/Event";
import { getSongs } from "./action";

const page = async () => {
  const cookieStore = await cookies();
  const userCookie = cookieStore?.get("userProfile");
  const userId = cookieStore?.get("userid");
  const id = userId ? userId.value : "";
  const userData = userCookie ? userCookie.value : null;
  const access_token: string | undefined = cookieStore?.get("token")?.value;
  if (!userData) {
    return permanentRedirect("/login");
  }

  const GetAllEvents = await getSongs(access_token);

  return (
    <div>
      <Event events={GetAllEvents} />
    </div>
  );
};

export default page;
