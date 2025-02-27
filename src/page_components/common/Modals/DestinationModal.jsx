import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useRequestUser from "../../../hooks/useRequest";
import { toast } from "sonner";

const schema = z.object({
  url: z.string().url({ message: "Please provide a valid URL" }),
  http_method: z.enum(["GET", "POST", "PUT"], {
    message: "Invalid HTTP method. Allowed values: GET, POST, PUT",
  }),
});

function DestinationModal({
  onClose,
  fetchData,
  title,
  initialValues,
  operation,
  selectedAccounts,
}) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      url: initialValues?.url || "",
      http_method: initialValues?.http_method || "",
    },
  });

  const [headers, setHeaders] = useState([{ key: "", value: "" }]);
  const addHeader = () => setHeaders([...headers, { key: "", value: "" }]);
  const removeHeader = (index) =>
    setHeaders(headers.filter((_, i) => i !== index));

  const { data, error, sendRequest } = useRequestUser();
  const url =
    operation === "updation"
      ? `/destination/${initialValues?.id}/`
      : "/destination/";
  const http_method = operation === "updation" ? "PUT" : "POST";

  const onSubmit = async (data) => {
    console.log("FORM", data);
    data.account = selectedAccounts;

    sendRequest({
      url: url,
      method: http_method,
      data: data,
      onSuccess: (data) => {
        console.log("destination ");
        onClose();
        fetchData();
        toast.success(operation === "updation" ? "Destination updated":"Destination created.");
      },
      onError: (err) => {
        console.error("Error in destination:", err);
        toast.error("Failed to create destination.");
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
                  <label className="text-sm text-gray-600">URL</label>
                  <input
                    {...register("url")}
                    placeholder="Destination URL"
                    className=" w-full px-4 py-2 rounded border-violet-400 border-2 bg-white"
                  />
                  {errors.url && (
                    <span className="text-red-400">{errors.url.message}</span>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-600">http method</label>
                  <input
                    {...register("http_method")}
                    placeholder="eg: GET, POST, PUT, DELETE"
                    className="w-full px-4 py-2 rounded border-violet-400 border-2 bg-white"
                  />
                  {errors.http_method && (
                    <span className="text-red-400">
                      {errors.http_method.message}
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

export default DestinationModal;
