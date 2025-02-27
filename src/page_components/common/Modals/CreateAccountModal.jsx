import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useRequestUser from "../../../hooks/useRequest";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().email({ message: "Please provide a valid email address" }),
  name: z.string().min(3, {
    message: "Username must be at least 3 characters long.",
  }),
  website: z.string().optional(),
});

function CreateAccountModal({
  onClose,
  fetchData,
  title,
  initialValues,
  operation,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: initialValues?.email || "",
      name: initialValues?.name || "",
      website: initialValues?.website || "",
    },
  });
  const { data, error, sendRequest } = useRequestUser();
  const url =
    operation === "updation" ? `/account/${initialValues?.id}/` : "/account/";
  const http_method = operation === "updation" ? "PUT" : "POST";

  const onSubmit = async (data) => {
    console.log(data);
    sendRequest({
      url: url,
      method: http_method,
      data: data,
      onSuccess: (data) => {
        console.log("calling logourt state");
        onClose();
        fetchData();
        toast.success(
          operation === "updation" ? "Account updated" : "Account created."
        );
      },
      onError: (err) => {
        console.error("Error in Logout:", err),
          toast.error(
            operation === "updation" ? "Failed to update" : "Failed to create."
          );
      },
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div>
        <div className="md:min-w-[500px] h-5/6 mx-3">
          <div className="w-full md:grid-cols-2 grid-cols-1 space-y-2">
            <div className="                                                                                                                                                                        flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-white">{title}</h2>
              <button
                onClick={onClose}
                className="text-white text-3xl hover:text-black"
              >
                &times;
              </button>
            </div>
          </div>

          <div className="space-y-4 py-4 ">
            <div className="space-y-6">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 text-black"
              >
                <div className="space-y-2 ">
                  <label className="text-sm text-gray-600">name</label>
                  <input
                    {...register("name")}
                    type="text"
                    className=" w-full px-4 py-2 rounded border-violet-400 border-2 bg-white"
                  />
                  {errors.name && (
                    <span className="text-red-400">{errors.name.message}</span>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-600">email</label>
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full px-4 py-2 rounded border-violet-400 border-2 bg-white"
                  />
                  {errors.email && (
                    <span className="text-red-400">{errors.email.message}</span>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-600">website</label>
                  <input
                    {...register("website")}
                    type=""
                    className="w-full px-4 py-2 rounded border-violet-400 border-2 bg-white"
                  />
                  {errors.website && (
                    <span className="text-red-400">
                      {errors.website.message}
                    </span>
                  )}
                </div>
                <div className="mt-10">
                  <button className="w-full py-2 px-4 rounded border-violet-400 bg-purple-600 hover:bg-purple-800 hover:text-white text-black">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAccountModal;
