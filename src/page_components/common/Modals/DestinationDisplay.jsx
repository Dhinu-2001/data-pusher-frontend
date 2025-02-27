import React, { useEffect, useState } from "react";
import useRequestUser from "../../../hooks/useRequest";
import { toast } from "sonner";
import { LinkIcon, Pencil, Trash } from "lucide-react";
import DestinationModal from "./DestinationModal";

function DestinationDisplay({
  onClose,
  title,
  initialValues,
  operation,
  selectedAccounts,
}) {
  const { data, error, sendRequest } = useRequestUser();
  const [destinations, setDestinations] = useState([]);
  const [selectedDestination, setSeletedDestination] = useState(null);
  const [openDestinationCreation, setOpenDestinationCreation] = useState(null);

  function handleDestinationEdit(id) {
    const dest = destinations.find((destination) => destination.id === id);
    setSeletedDestination(dest);
    setOpenDestinationCreation(true);
  }

  const handleDestinationDelete = (id) => {
    sendRequest({
      url: `/destination/${id}/`,
      method: "DELETE",
      onSuccess: (data) => {
        setDestinations(data);
        fetchData();
        console.log("Destination deleted successfully:", data);
        toast.success("Destination deleted successfully.");
      },
      onError: (err) => {
        console.error("Error in destination fetched", err);
        toast.error("Failed to delete destination.");
      },
    });
  };

  const fetchData = () => {
    console.log("typeof", typeof selectedAccounts);
    sendRequest({
      url: `/fetch_destination/${selectedAccounts}/`,
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
    fetchData();
  }, []);

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
              <div className="space-y-4 text-black">
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
                        <div className="flex items-center gap-2">
                          <div className="flex gap-3">
                            <button
                              onClick={() =>
                                handleDestinationEdit(destination.id)
                              }
                              className="w-full sm:w-auto rounded-xl border-1 border-white flex items-center gap-1 p-1"
                            >
                              <Pencil className="w- h-4 mr-2" />
                              Edit destination
                            </button>
                          </div>

                          <button
                            onClick={() =>
                              handleDestinationDelete(destination.id)
                            }
                            className="w-full sm:w-auto rounded-xl border-1 border-white flex items-center p-2 bg-red-500"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {openDestinationCreation && (
        <DestinationModal
          onClose={() => setOpenDestinationCreation(false)}
          fetchData={fetchData}
          title="Edit Destination"
          operation="updation"
          selectedAccounts={selectedAccounts}
          initialValues={selectedDestination}
        />
      )}
    </div>
  );
}

export default DestinationDisplay;
