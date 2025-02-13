"use server";
interface SignUpFormData {
  email: string;
  name: string;
  password: string;
}

export async function signUp(formData: SignUpFormData) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
  return response.json();
}

export async function sendWelcomeMessage(receipient: string, name: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sendEmail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ receipient, name }),
  });
  return response.json();
}
