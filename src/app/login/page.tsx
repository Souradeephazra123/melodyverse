import Login from "@/components/Login";
import { cookies } from "next/headers";
import React from "react";

const page = async () => {
  const cookieStore = await cookies();
  const userCredential = cookieStore.get("userProfile")?.value ? JSON.parse(cookieStore.get("userProfile")?.value || '{}') : undefined;

  const Remeberme = cookieStore.get("remeberme")?.value ? JSON.parse(cookieStore.get("remeberme")?.value || 'false') : false;

  return (
    <div>
      <Login defaultValue={userCredential} isRemember={Remeberme} />
    </div>
  );
};

export default page;
