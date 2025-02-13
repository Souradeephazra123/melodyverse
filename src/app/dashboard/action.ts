"use server";
interface formdata {
  name: string;
  description: string;
  category: string;
  capacity: number;
  visibility: string;
}
export async function createEvent(formdata: formdata) {
  try {
    console.log(formdata);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/create-event`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      }
    );

    console.log("login res", res);

    return res.json();
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Error in creating Event" };
  }
}

export async function getEvents(visibility: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/get-events-by-visibility?visibility=${visibility}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.json();
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Error in fetching Events" };
  }
}
