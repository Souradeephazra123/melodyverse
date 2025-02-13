// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useFormStatus } from "react-dom";
// import { Controller, useForm, useFormState } from "react-hook-form";

// import { toast, ToastContainer } from "react-toastify";
// import Link from "next/link";
// import { createEvent, getEvents } from "@/app/dashboard/action";
// import { useRouter } from "next/navigation";
// import { FaCirclePlus } from "react-icons/fa6";
// import { DatePkr } from "./ui/date-pkr";

// interface formdata {
//   userId: string;
//   name: string;
//   description: string;
//   category: string;
//   capacity: number;
//   visibility: string;
// }

// interface event {
//   name: string;
//   description: string;
//   category: string;
//   capacity: number;
//   visibility: string;
// }

// const Event = ({ userid, events }: { userid: string; events: event[] }) => {
//   const router = useRouter();
//   const [cardOpen, setCardOpen] = useState<boolean>(false);
//   // const [events, setEvents] = useState<any>([]);

//   const { handleSubmit, setValue, watch, control } = useForm({
//     mode: "onChange",
//   });
//   const { pending } = useFormStatus();
//   const { isDirty, isValid, errors } = useFormState({ control });

//   const onSubmit = async (formdata: formdata) => {
//     const userCredential = {
//       userId: userid,
//       name: formdata.name,
//       description: formdata.description,
//       category: formdata.category,
//       capacity: formdata.capacity,
//       visibility: formdata.visibility,
//     };

//     console.log("init", userCredential);
//     try {
//       const res = await createEvent(userCredential);
//       console.log(res);

//       if (res.message === "Event created successfully") {
//         toast.success("Event created successfully");
//       } else {
//         toast.error(res.message ?? "Error in creating event");
//       }
//       //   if (res.message === "User not found") {
//       //     toast.error("User not found");
//       //   }
//       //   if (res.message === "Incorrect password") {
//       //     toast.error("Incorrect password");
//       //   }
//       //   if (res.message === "Error in login") {
//       //     toast.error("Error in login");
//       //   }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // useEffect(() => {
//   //   const GetAllEvents = async () => {
//   //     const res = await getEvents("public");
//   //     setEvents(res);
//   //     console.log("all events", res);
//   //   };
//   //   GetAllEvents();
//   // }, []);

//   return (
//     <div className=" p-10 relative min-h-screen">
//       <div className=" w-52 h-32 bg-gray-600 rounded-xl p-3 flex flex-col items-center gap-4 justify-center">
//         <p className=" text-2xl font-bold">Add Event</p>

//         <FaCirclePlus
//           color=""
//           size={40}
//           onClick={() => setCardOpen(true)}
//           className=" cursor-pointer"
//         />
//       </div>

//       {cardOpen && (
//         <div className=" absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
//           <form
//             onSubmit={handleSubmit(onSubmit)}
//             className=" flex flex-col gap-5 p-5 bg-gray-600 rounded-lg"
//           >
//             <Controller
//               name="name"
//               control={control}
//               defaultValue={""}
//               rules={{
//                 required: "Name is required",
//               }}
//               render={({ field }) => (
//                 <div className=" flex flex-col gap-2">
//                   {" "}
//                   <label>
//                     Event name <span className=" text-red-600">*</span>
//                   </label>
//                   <input
//                     {...field}
//                     type="text"
//                     placeholder="Enter Event Name"
//                     className=" w-96 bg-Black rounded-lg p-2 placeholder:text-Grey-7 border-[1px] border-[#C1C1C1]"
//                   />
//                   {errors.name && (
//                     <p className=" text-red-600">
//                       {typeof errors.name?.message === "string" &&
//                         errors.name.message}
//                     </p>
//                   )}
//                 </div>
//               )}
//             />
//             <Controller
//               name="description"
//               control={control}
//               defaultValue={""}
//               rules={{
//                 required: "description should not be more than 250 characters",
//                 maxLength: {
//                   value: 250,
//                   message: "description should not be more than 250 characters",
//                 },
//               }}
//               render={({ field }) => (
//                 <div className=" flex flex-col gap-2">
//                   {" "}
//                   <label>
//                     Description <span className=" text-red-600">*</span>
//                   </label>
//                   <input
//                     {...field}
//                     type="text"
//                     placeholder="Enter Description"
//                     className=" w-96 bg-Black rounded-lg p-2 placeholder:text-Grey-7 border-[1px] border-[#C1C1C1]"
//                   />
//                   {errors.description && (
//                     <p className=" text-red-600">
//                       {typeof errors.description?.message === "string" &&
//                         errors.description.message}
//                     </p>
//                   )}
//                 </div>
//               )}
//             />
//             <Controller
//               name="category"
//               control={control}
//               defaultValue={""}
//               render={({ field }) => (
//                 <div className=" flex flex-col gap-2">
//                   {" "}
//                   <label>
//                     Category <span className=" text-red-600">*</span>
//                   </label>
//                   <input
//                     {...field}
//                     type="text"
//                     placeholder="Enter Email ID"
//                     className=" w-96 bg-Black rounded-lg p-2 placeholder:text-Grey-7 border-[1px] border-[#C1C1C1]"
//                   />
//                 </div>
//               )}
//             />
//             <Controller
//               name="capacity"
//               control={control}
//               defaultValue={""}
//               rules={{
//                 required: "Capacity should be a number between 1 and 1000",
//                 pattern: {
//                   value: /^[0-9]*$/,
//                   message: "Capacity should be a number between 1 and 1000",
//                 },
//               }}
//               render={({ field }) => (
//                 <div className=" flex flex-col gap-2">
//                   {" "}
//                   <label>
//                     Capacity <span className=" text-red-600">*</span>
//                   </label>
//                   <input
//                     {...field}
//                     type="text"
//                     placeholder="Enter capacity"
//                     className=" w-96 bg-Black rounded-lg p-2 placeholder:text-Grey-7 border-[1px] border-[#C1C1C1]"
//                   />
//                   {errors.email && (
//                     <p className=" text-red-600">
//                       {typeof errors.email?.message === "string" &&
//                         errors.email.message}
//                     </p>
//                   )}
//                 </div>
//               )}
//             />
//             <Controller
//               name="visibility"
//               control={control}
//               defaultValue={""}
//               render={({ field }) => (
//                 <div className=" flex flex-col gap-2">
//                   {" "}
//                   <label>
//                     Visibility <span className=" text-red-600">*</span>
//                   </label>
//                   <input
//                     {...field}
//                     type="text"
//                     placeholder="Enter Email ID"
//                     className=" w-96 bg-Black rounded-lg p-2 placeholder:text-Grey-7 border-[1px] border-[#C1C1C1]"
//                   />
//                   {errors.visibility && (
//                     <p className=" text-red-600">
//                       {typeof errors.visibility?.message === "string" &&
//                         errors.visibility.message}
//                     </p>
//                   )}
//                 </div>
//               )}
//             />
//             <DatePkr name="date" label="Date" className="md:row-start-2" />

//             {/* maxValue={tod} */}

//             <button
//               disabled={!isValid}
//               type="submit"
//               className={` ${
//                 isValid ? "bg-black text-white" : " bg-gray-400 text-white"
//               }  font-semibold  rounded-md py-2`}
//             >
//               Submit
//             </button>
//           </form>
//         </div>
//       )}

//       <div className=" flex gap-4 flex-wrap">
//         {events?.length > 0 ? (
//           events.map((event, idx) => (
//             <div
//               key={idx}
//               className=" w-96  border-[1px] border-black rounded-xl p-3 flex flex-col items-center gap-4 justify-center"
//             >
//               <p className=" text-2xl font-bold">Name: {event.name}</p>
//               <p className=" text-lg">Description:{event.description}</p>
//               <p className=" text-lg">Category: {event.category}</p>
//               <p className=" text-lg">Capacity: {event.capacity}</p>
//               <p className=" text-lg">Visibility: {event.visibility}</p>
//             </div>
//           ))
//         ) : (
//           <p>No events created Yet</p>
//         )}
//       </div>

//       <ToastContainer />
//     </div>
//   );
// };

// export default Event;
