import React, { Fragment, useState, useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { ReactComponent as DannsourceLogo } from "../../assets/dannosource.svg";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

function Navigation() {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();

  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null);
  };

  const handleDropDown = () => {
    setOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-white border-b mb-7 mt-1 border-green-100 rounded-lg shadow hover:bg-gray-100 hover:border-green-100">
        <div className="flex justify-between items-center navigation rounded-lg px-4">
          <Link className="logo-container" to="/">
            <DannsourceLogo className="m-3 ml-7" />
          </Link>
          <div className="flex space-x-4">
            <div className="relative">
              <div className="dropdown">
                {/* Mobile Menu Button */}
                <button
                  className="text-green-700 text-xl hover:text-white hover:bg-green-800 font-large rounded-lg px-4 py-2.5 text-center inline-flex items-center md:hidden"
                  onClick={handleDropDown}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>

                {/* Dropdown menu */}
                <div
                  id="dropdown"
                  className={`absolute z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow md:hidden ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  <ul className="py-1">
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 text-lg text-green-700 hover:bg-green-800 hover:text-white"
                      >
                        blablabla
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Regular Desktop Menu Buttons */}
            <button
              className="text-green-700 text-lg hover:text-white hover:bg-green-800 font-large rounded-lg px-4 py-2.5 text-center inline-flex items-center hidden md:block"
              onClick={() => navigate("/shop")}
            >
              SHOP
            </button>
            {currentUser && (
              <button
                className="text-green-700 text-lg hover:text-white hover:bg-green-800 font-large rounded-lg px-4 py-2.5 text-center inline-flex items-center hidden md:block"
                onClick={() => navigate("/jobs")}
              >
                JOBS
              </button>
            )}
            <button
              className="text-green-700 text-lg hover:text-white hover:bg-green-800 font-large rounded-lg px-4 py-2.5 text-center inline-flex items-center hidden md:block"
              onClick={() => navigate("/workbench")}
            >
              WORKBENCH
            </button>
            {currentUser ? (
              <button
                className="text-green-700 text-lg hover:text-white hover:bg-green-800 font-large rounded-lg px-4 py-2.5 text-center inline-flex items-center hidden md:block"
                onClick={signOutHandler}
              >
                SIGN OUT
              </button>
            ) : (
              <button
                className="text-green-700 text-lg font-semibold hover:text-white hover:bg-green-800 font-large rounded-lg px-4 py-2.5 text-center inline-flex items-center hidden md:block"
                onClick={() => navigate("/signin")}
              >
                SIGN IN
              </button>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navigation;
