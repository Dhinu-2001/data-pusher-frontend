import { useEffect, useState } from "react";
import { LinkIcon, Pencil, Trash } from "lucide-react";
import CreateAccountModal from "../../../page_components/common/Modals/CreateAccountModal";
import useRequestUser from "../../../hooks/useRequest";
import DestinationModal from "../../../page_components/common/Modals/DestinationModal";
import DestinationDisplay from "../../../page_components/common/Modals/DestinationDisplay";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function AccountDestinations() {
  const [expandedAccounts, setExpandedAccounts] = useState(new Set());
  const [openAccountCreation, setOpenAccountCreation] = useState(false);
  const [openDestinationCreation, setOpenDestinationCreation] = useState(false);
  const [openDestinationDisplay, setOpenDestinationDisplay] = useState(false);
  const [openAccountEdit, setOpenAccountEdit] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const { data, loading, error, sendRequest } = useRequestUser();

  const toggleAccount = (accountId) => {
    const newExpanded = new Set(expandedAccounts);
    if (newExpanded.has(accountId)) {
      newExpanded.delete(accountId);
    } else {
      newExpanded.add(accountId);
    }
    setExpandedAccounts(newExpanded);
  };

  const handleAccountEdit = (id) => {
    setOpenAccountEdit(true);
    const account = accounts.find((acc) => acc.id === id);
    setSelectedAccounts(account);
  };

  const handleDestinationCreation = (id) => {
    setOpenDestinationCreation(true);
    setSelectedAccounts(id);
  };

  const handleDestinationDisplay = (id) => {
    setOpenDestinationDisplay(true);
    setSelectedAccounts(id);
  };

  const handleAccountDelete = (id)=>{
    sendRequest({
      url: `/account/${id}/`,
      method: "DELETE",
      onSuccess: (data) => {
        setAccounts(data);
        fetchData()
        console.log("Accounts deleted successfully:", data);
        toast.success('Account deleted successfully.')
      },
      onError: (err) =>{ 
        console.error("Error in Accounts fetched", err)
        toast.error('Failed to delete account.')
      },
    });
  }

  const fetchData = () => {
    sendRequest({
      url: `/account/`,
      method: "GET",
      onSuccess: (data) => {
        setAccounts(data);
        console.log("Accounts fetched successfully:", data);
      },
      onError: (err) => console.error("Error in Accounts fetched", err),
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className=" container mx-auto p-4 max-w-4xl text-white">
      <h1 className="text-2xl font-bold mb-6">Account Destinations</h1>

      <div className="space-y-4">
        <div className="flex justify-end">
          <button
            onClick={() => setOpenAccountCreation(true)}
            className="w-full sm:w-auto rounded-xl border-1 border-white flex items-center gap-1 p-3 "
          >
            Add Account
          </button>
        </div>

        {accounts.length < 1 ? (
          <div className="w-full flex justify-center">
            <p className="text-3xl">No Account</p>
          </div>
        ) : (
          accounts.map((account) => (
            <div
              key={account.id}
              className="overflow-hidden rounded-2xl border-1 border-white"
            >
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <Link to={`/accounts/${account.id}/send_data`}>
                    <div className="space-y-1">
                      <h2 className="text-lg font-semibold">{account.name}</h2>
                      <p className="text-sm text-muted-foreground">
                        {account.email}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {account?.website}
                      </p>
                    </div>
                  </Link>
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAccountEdit(account.id)}
                      className="w-full sm:w-auto rounded-xl border-1 border-white flex items-center gap-1 p-3"
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit Account
                    </button>
                    <button
                      onClick={() => handleDestinationCreation(account.id)}
                      className="w-full sm:w-auto rounded-xl border-1 border-white flex items-center gap-1 p-3"
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                      Add Destination
                    </button>

                    <button
                      onClick={() => handleDestinationDisplay(account.id)}
                      className="w-full sm:w-auto rounded-xl border-1 border-white flex items-center gap-1 p-3"
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                      Show Destinations
                    </button>
                    
                    <button
                      onClick={() => handleAccountDelete(account.id)}
                      className="w-full sm:w-auto rounded-xl border-1 border-white flex items-center p-3 bg-red-500"
                    >
                      <Trash className="w-4 h-4 " />
                    </button>
                  </div>
                </div>

                {expandedAccounts.has(account.id) && (
                  <div className="mt-4 border-t pt-4">
                    <h3 className="text-sm font-medium mb-3">
                      Associated Links
                    </h3>
                    <div className="space-y-2">
                      {account.destinations.map((destination) => (
                        <a
                          key={destination.id}
                          href={destination.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 p-2 hover:bg-muted rounded-md text-sm transition-colors"
                        >
                          <LinkIcon className="w-4 h-4 text-muted-foreground" />
                          <span>{destination.name}</span>
                          <span className="text-muted-foreground text-xs truncate">
                            {destination.url}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {openAccountCreation && (
        <CreateAccountModal
          onClose={() => setOpenAccountCreation(false)}
          title="Create an account"
          operation="creation"
          fetchData={fetchData}
        />
      )}

      {openAccountEdit && (
        <CreateAccountModal
          onClose={() => setOpenAccountEdit(false)}
          fetchData={fetchData}
          title="List of Distination"
          initialValues={selectedAccounts}
          operation="updation"
        />
      )}

      {openDestinationCreation && (
        <DestinationModal
          onClose={() => setOpenDestinationCreation(false)}
          fetchData={fetchData}
          title="Create Destination"
          operation="creation"
          selectedAccounts={selectedAccounts}
        />
      )}

      {openDestinationDisplay && (
        <DestinationDisplay
          onClose={() => setOpenDestinationDisplay(false)}
          title="List all Destination"
          operation="creation"
          selectedAccounts={selectedAccounts}
        />
      )}
    </div>
  );
}
