import React from "react";
import { useContext } from "react";
import { RecoveryContext } from "../../App";

const Reset = () => {
  const { setPage } = useContext(RecoveryContext);
  function changePassword() {
    setPage("recovered");
  }

<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
const Reset = () => {
  const navigate = useNavigate();

  function changePassword() {
    navigate("/login");
  }

  return (
    <div>
      <section class="bg-gray-50 w-screen">
  <div class="d-flex flex-column align-items-center justify-content-center px-3 py-4 mx-auto h-100">
    <div class="w-full p-4 bg-white rounded-lg shadow-md border md:mt-0 sm:max-w-md">
      <h2 class="mb-1 text-xl font-bold leading-tight text-gray-900">
        Change Password
      </h2>
      <form class="mt-4 space-y-4">
        <div class="mb-3">
          <label for="password" class="form-label text-sm font-medium text-gray-900">
            New Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            class="form-control"
            required
          />
=======
  return (
    <div>
      <section className="bg-gray-50 w-screen dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
            </h2>
            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                ></input>
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                ></input>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="newsletter"
                    aria-describedby="newsletter"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required=""
                  ></input>
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="newsletter"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
            </form>
            <button
              onClick={() => changePassword()}
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Reset passwod
            </button>
          </div>
>>>>>>> af189c0c38ce2e368b62ba792a0b3d9409a5da1b
        </div>
        <div class="mb-3">
          <label for="confirm-password" class="form-label text-sm font-medium text-gray-900">
            Confirm password
          </label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            placeholder="••••••••"
            class="form-control"
            required
          />
        </div>
        <div class="form-check mb-3">
          <input
            id="newsletter"
            aria-describedby="newsletter"
            type="checkbox"
            class="form-check-input"
            required
          />
          <label for="newsletter" class="form-check-label text-sm text-gray-500">
            I accept the
            <a
              href="#"
              class="font-medium text-primary-600 hover-underline"
            >
              Terms and Conditions
            </a>
          </label>
        </div>
      </form>
      <button
        onClick={() => changePassword()}
        class="btn btn-primary w-100 rounded-lg text-sm px-4 py-2.5"
      >
        Reset Password
      </button>
    </div>
  </div>
</section>

    </div>
  );
}

export default Reset