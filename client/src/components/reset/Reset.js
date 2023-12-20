import React from "react";

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