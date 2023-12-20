import React from "react";
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
const Reset = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  // function changePassword() {
  //   navigate("/login");
    
  // }
  const changePassword = (data) => {
    // Implement your logic for password change here
    // The form data is available in the `data` object
    console.log('Form Data:', data);

    // Add your logic for password change or API call here
  };

  return (
    <div>
      <section class="bg-gray-50 w-screen">
  <div class="d-flex flex-column align-items-center justify-content-center px-3 py-4 mx-auto h-100">
    <div class="w-full p-4 bg-white rounded-lg shadow-md border md:mt-0 sm:max-w-md">
      <h2 class="mb-1 text-xl font-bold leading-tight text-gray-900">
        Change Password
      </h2>
      <form onSubmit={handleSubmit(changePassword)} className="mt-4 space-y-4">
      <div className="mb-3">
        <label htmlFor="password" className="form-label text-sm font-medium text-gray-900">
          New Password
        </label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              required
              {...field}
            />
          )}
          rules={{ required: 'New password is required' }}
        />
        {errors.password && <p className="text-danger">{errors.password.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="confirm-password" className="form-label text-sm font-medium text-gray-900">
          Confirm password
        </label>
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <input
              type="password"
              id="confirm-password"
              placeholder="••••••••"
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
              required
              {...field}
            />
          )}
          rules={{
            required: 'Confirm password is required',
            validate: (value) => value === control.fieldsRef.current.password.value || 'Passwords do not match',
          }}
        />
        {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
      </div>
      <div className="form-check mb-3">
        <Controller
          name="acceptTerms"
          control={control}
          render={({ field }) => (
            <input
              id="newsletter"
              aria-describedby="newsletter"
              type="checkbox"
              className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : ''}`}
              required
              {...field}
            />
          )}
          rules={{ required: 'You must accept the terms and conditions' }}
        />
        <label htmlFor="newsletter" className="form-check-label text-sm text-gray-500">
          I accept the{' '}
          <a href="#" className="font-medium text-primary-600 hover-underline">
            Terms and Conditions
          </a>
        </label>
        {errors.acceptTerms && <p className="text-danger">{errors.acceptTerms.message}</p>}
      </div>
      <button type="submit" className="btn btn-primary w-100 rounded-lg text-sm px-4 py-2.5">
        Reset Password
      </button>
    </form>
    
    </div>
  </div>
</section>

    </div>
  );
}

export default Reset