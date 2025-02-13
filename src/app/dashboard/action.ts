"use server";
export async function getSongs(token: string | undefined) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/songs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return res.json();
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Error in creating Event" };
  }
}
