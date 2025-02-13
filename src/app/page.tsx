'use server';
import { permanentRedirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore =await cookies();
  const userCookie = cookieStore?.get("userProfile");
  const userData = userCookie ? userCookie.value : null;
  if (userData) {
    return permanentRedirect("/dashboard"); // Redirect to the home page
  } else {
    return permanentRedirect("/login");
  }

  
}
