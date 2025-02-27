import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useRequestUser from "../../../hooks/useRequest";
import { useParams } from "react-router-dom";
import { LinkIcon } from "lucide-react";
import { toast } from "sonner";

const schema = z.object({
  message: z.string().min(1, {
    message: "Message must be at least 1 characters long.",
  }),
});

function SendData() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { data, error, sendRequest } = useRequestUser();
  const { id: accountId } = useParams();
  const [account, setAccount] = useState();
  const [destinations, setDestinations] = useState([]);

  const onSubmit = async (data) => {
    console.log(data);
    sendRequest({
      url: "/server/incoming_data/",
      method: "POST",
      data: data,
      headers: {'CL-X-TOKEN': account.app_secret_token},
      onSuccess: (data) => {
        toast.success("Data sended successfully.");
      },
      onError: (err) => {
        console.error("Error in data sending:", err);
        toast.error("Failed to send the data");
      },
    });
  };

  const fetchData = () => {
    sendRequest({
      url: `/account/${accountId}`,
      method: "GET",
      onSuccess: (data) => {
        setAccount(data);
        console.log("Account fetched successfully:", data);
      },
      onError: (err) => console.error("Error in Account fetched", err),
    });

    sendRequest({
      url: `/fetch_destination/${accountId}/`,
      method: "GET", 
      onSuccess: (data) => {
        console.log("destinationS", data);
        setDestinations(data);
      },
      onError: (err) => {
        console.error("Error in destination:", err);
        toast.error("Failed to fetch destinations.");
      },
    });
  };

  useEffect(() => {
    if (accountId) {
      fetchData();
    }
  }, []);

  return (
    <div className=" container mx-auto p-4 max-w-4xl text-white">
      <h1 className="text-2xl font-bold mb-6">Send data</h1>

      <div className="space-y-4">
        <div className="flex-col ">
          <p className="text-2xl font-bold">{account?.name}</p>
          <p>{account?.email}</p>
        </div>

        <div className="overflow-hidden rounded-2xl border-1 border-white">
          <div className="p-4 sm:p-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 text-black"
            >
              <div className="space-y-2 ">
                <label className="text-sm text-gray-600">Enter the data</label>
                <textarea
                  {...register("message")}
                  type="text"
                  className=" w-full px-4 py-2 rounded border-violet-400 border-2 bg-white"
                />
                {errors.message && (
                  <span className="text-red-400">{errors.message.message}</span>
                )}
              </div>
              <div className="mt-10">
                <button className="w-1/2 py-2 px-4 rounded border-violet-400 bg-purple-600 hover:bg-purple-800 hover:text-white text-black">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="space-y-4">
        <p className="text-2xl font-bold">Destinations</p>
          {destinations.length < 1 ? (
            <div>
              <p className="text-white text-xl">No destination</p>
            </div>
          ) : (
            <div className="space-y-2 text-white">
              {destinations.map((destination) => (
                <div>
                  <a
                    key={destination.id}
                    href={destination.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 hover:bg-muted rounded-md text-sm transition-colors"
                  >
                    <LinkIcon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground text-xs truncate">
                      {destination.url}
                    </span>
                    <span className="font-bold">
                      {" "}
                      - {destination.http_method}
                    </span>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SendData;
