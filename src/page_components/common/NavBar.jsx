import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LogOut, CircleUser } from "lucide-react";
import useRequestUser from "../../hooks/useRequest";
import { toast } from "sonner";
import { clearAuthData } from "../../redux/auth/AuthSlice";

function NavBar() {
  const store = useSelector((state) => state);
  const dispatch = useDispatch()
  const { data, error, sendRequest } = useRequestUser()
  const navigate = useNavigate()

  const handleLogout = () => {
    sendRequest({
      url: '/logout/',
      method: "POST",
      onSuccess: (data) => {
        console.log('calling logourt state')
        dispatch(clearAuthData())
        toast.success('Logout!')
        navigate('/login')
      },
      onError: (err) =>
        console.error("Error in Logout:", err),
    });
  };
  console.log("store", store);

  return (
    <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M7 7h10M7 12h10M7 17h10" />
          </svg>
        </div>
        <span className="text-white text-xl font-semibold">Data-Pusher</span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-gray-300">
        <Link to="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <Link to="/accounts" className="hover:text-white transition-colors">
          Accounts
        </Link>
        
      </div>

      <div className="flex items-center gap-4">
        {store?.isAuthenticated ? (
          <>
            <div className="flex items-center gap-1">
              <CircleUser className="w-4 text-white" />
              <p className="text-white hidden md:inline-flex">
                {store.username}
              </p>
            </div>

            <button onClick={handleLogout} className="p-2 rounded bg-purple-600 hover:bg-purple-700 hover:text-white flex items-center gap-1">
              <LogOut className="w-4" />
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button
                variant="ghost"
                className="text-white hidden md:inline-flex"
              >
                Sign In
              </button>
            </Link>
            <Link to="/register">
              <button className="p-2 rounded bg-purple-600 hover:bg-purple-700 hover:text-white">
                Get Started
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
