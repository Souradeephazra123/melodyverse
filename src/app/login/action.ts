"use server";
interface UserCredential {
  email: string;
  password: string;
}

export async function UserLogin(userCredential: UserCredential) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredential),
    });

    return res.json();
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Error in login" };
  }
}
