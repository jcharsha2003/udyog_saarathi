import { loginContext } from "../../context/loginContext";
import { imgDB } from "../config/firebase.config";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import "./Public.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ProgressBar from "react-bootstrap/ProgressBar";
import axios from "axios";
import { MdOutlineEventSeat } from "react-icons/md";
import React, { createContext, useContext, useEffect, useState } from "react";
import styled from "styled-components";

const RatingContext = React.createContext();

const StyledPost = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
`;

const StyledRatingContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StyledRating = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 12px;
  }

  &.post-rating-selected > .post-rating-button,
  &.post-rating-selected > .post-rating-count {
    color: #009578;
  }
`;

const StyledRatingButton = styled.span`
  margin-right: 6px;
  cursor: pointer;
  color: #555555;

  &:not(.post-rating-selected):hover {
    color: #000000;
  }
`;

const Public = () => {
  let [currentUser, error, userLoginStatus, loginUser, logoutUser, role] =
    useContext(loginContext);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [data, setData] = useState([]);
  let [errorr, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  const watchedFields = watch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue(name, value);
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (!file) return; // Handle if no file is selected

    // Replace with your Firebase storage reference

    const imgs = ref(imgDB, `Imgs/${v4()}`);
    const uploadTask = uploadBytesResumable(imgs, file);

    // Listen to the upload progress
    uploadTask.on("state_changed", (snapshot) => {
      // Calculate progress percentage
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadProgress(progress);
    });

    try {
      // Wait for the upload to complete
      await uploadTask;

      // Retrieve the download URL
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      console.log(downloadURL);
      // Update your state or perform other actions
      setValue("img", downloadURL);
    } catch (error) {
      // Handle errors
      console.error("Error uploading image:", error);
    }
  };
  const [selectedRating, setSelectedRating] = useState(null);

  const modifiedFormData = {
    img: watchedFields.img,
    organisation: watchedFields.organisation,
    post: watchedFields.post,
    method: watchedFields.method,
    lastDate: watchedFields.lastDate,
    vacancies: Number(watchedFields.vacancies),
    appLink: watchedFields.appLink,
    link: watchedFields.link,
    role: watchedFields.role,
  };

  let formSubmit = async () => {
    try {
      const formData = getValues(); // Get the entire form data

      // You can access the form data directly, no need for modifiedFormData
      axios
        .post(`/job-api/add-public`, formData)
        .then((response) => {
          if (response.status === 201) {
            console.log("Successfully added");
            getJobs();
          } else {
            setError(response.data.message);
          }
        })
        .catch((err) => {
          setError(err.message);
        });

      reset(); // Reset the form after submission
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const getJobs = () => {
    axios
      .get(`/job-api/get-job/public`)
      .then((response) => {
        if (response.status === 200) {
          setData(response.data.payload);
        } else {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  useEffect(() => {
    getJobs();
  }, []);
  const textOnlyRegex = /^[A-Za-z\s]+$/;

  return (
    <div className="container">
       {/* input for jobs */}
       {userLoginStatus && role === "admin" && (
        <div className="container spider-man mb-4 w-50 px-5" py-3>
          <form onSubmit={handleSubmit(formSubmit)} action="" className="mt-5">
            <div className="inputbox2 form-floating">
              <div className="input-group">
                <div className="custom-file w-75">
                  <label className="custom-file-label" htmlFor="inputGroupFile">
                    Choose file for image uploading
                  </label>
                  <input
                    type="file"
                    className="custom-file-input"
                    name="img"
                    id="inputGroupFile"
                    onChange={(e) => handleUpload(e)}
                    // {...register("img", { required: true })}
                  />
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="progress-container">
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: `${uploadProgress}%` }}
                          aria-valuenow={uploadProgress}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          {`${uploadProgress.toFixed(2)}%`}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {errors.img && <p className="text-danger">* Image is required</p>}
            </div>


            <div className="inputbox2 form-floating">
        <i className="fa-solid fa-sitemap"></i>
        <input
          type="text"
          id="organisation"
          name="organisation"
          className="form-control"
          placeholder="xyz"
          {...register("organisation", {
            required: true,
            pattern: {
              value: textOnlyRegex,
              message: "Only letters and spaces are allowed",
            },
          })}
          onChange={handleChange}
        />
        <label htmlFor="organisation" className="text-dark">
          Organisation
        </label>
        {errors.organisation && (
          <p className="text-danger">{errors.organisation.message}</p>
        )}
      </div>

      <div className="inputbox2 form-floating">
        <i className="fa-solid fa-signs-post"></i>
        <input
          type="text"
          id="post"
          name="post"
          className="form-control"
          placeholder="xyz"
          {...register("post", {
            required: true,
            pattern: {
              value: textOnlyRegex,
              message: "Only letters and spaces are allowed",
            },
          })}
          onChange={handleChange}
        />
        <label htmlFor="post" className="text-dark">
          Post
        </label>
        {errors.post && <p className="text-danger">{errors.post.message}</p>}
      </div>
            <div className="inputbox2 form-floating">
              <i className="fa-solid fa-calendar-check"></i>
              <input
                type="text"
                id="method"
                className="form-control "
                placeholder="xyz"
                name="method"
                value={watchedFields.method}
                onChange={(e) => setValue("method", e.target.value)}
                {...register("method", { required: true })}
              />
              <label htmlFor="method" className="text-dark">
                Job type
              </label>
              {errors.method && (
                <p className="text-danger">* Job type is required</p>
              )}
            </div>

            <div className="inputbox2 form-floating">
              <i className="fa-solid fa-calendar-days"></i>
              <input
                type="date"
                id="lastDate"
                className="form-control "
                placeholder="xyz"
                name="lastDate"
                value={watchedFields.lastDate}
                onChange={(e) => setValue("lastDate", e.target.value)}
                {...register("lastDate", { required: true })}
              />
              <label htmlFor="lastDate" className="text-dark">
                Last Date
              </label>
              {errors.lastDate && (
                <p className="text-danger">* Last Date is required</p>
              )}
            </div>

            <div className="inputbox2 form-floating">
              <i className="fa-solid fa-percent"></i>
              <input
                type="number"
                id="vacancies"
                className="form-control "
                placeholder="xyz"
                name="vacancies"
                value={watchedFields.vacancies}
                onChange={(e) => setValue("vacancies", e.target.value)}
                {...register("vacancies", { required: true })}
              />
              <label htmlFor="vacancies" className="text-dark">
                Vacancies
              </label>
              {errors.vacancies && (
                <p className="text-danger">* Vacancies is required</p>
              )}
            </div>

            <div className="inputbox2 form-floating">
              <i className="fa-solid fa-link"></i>
              <input
                type="text"
                id="link"
                className="form-control "
                placeholder="xyz"
                name="link"
                value={watchedFields.link}
                onChange={(e) => setValue("link", e.target.value)}
                {...register("link", { required: true })}
              />
              <label htmlFor="link" className="text-dark">
                Details Doc Link
              </label>
              {errors.link && (
                <p className="text-danger">* Details Doc Link is required</p>
              )}
            </div>

            <div className="inputbox2 form-floating">
              <i className="fa-solid fa-link"></i>
              <input
                type="text"
                id="appLink"
                className="form-control "
                placeholder="xyz"
                name="appLink"
                value={watchedFields.appLink}
                onChange={(e) => setValue("appLink", e.target.value)}
                {...register("appLink", { required: true })}
              />
              <label htmlFor="appLink" className="text-dark">
                Apply Link
              </label>
              {errors.appLink && (
                <p className="text-danger">* Apply Link is required</p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary d-block m-auto my-4"
            >
              Update
            </button>
          </form>
        </div>
      )}
      <div className="tab-content">
        <div id="tab-1" className="tab-pane fade show p-0 active">
          {/* job apply cards */}
          {data?.map((job, index) => (
            <div
              className="job-item p-4 mb-4 card shadow-lg p-3 mb-5 bg-white rounded"
              key={index}
            >
              <div className="card-body">
                <div className="row g-4">
                  <div className="col-sm-12 col-md-8 d-flex align-items-center">
                    <img
                      className="flex-shrink-0 img-fluid border rounded"
                      src={job.img}
                      alt=""
                      style={{ width: "80px", height: "80px" }}
                    />
                    <div className="text-start ps-4">
                      <h3 className="mb-3 font-weight-bold">
                        {job.organisation}
                      </h3>
                      <p className="lead">{job.post}</p>
                      <span className="text-truncate me-3">
                        <i className="far fa-clock text-primary me-2"></i>
                        {job.method}
                      </span>
                      <span className="text-truncate me-3">
                        <MdOutlineEventSeat className="me-2" />
                        {job.vacancies} Vacancies
                      </span>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                    <div className="d-flex mb-3">
                      <RatingContext.Provider
                        value={{ selectedRating, setSelectedRating }}
                      >
                        <StyledPost className="post" data-post-id="7712">
                          <StyledRatingContainer className="post-ratings-container">
                            {/* Adjust icons as needed */}
                            <RatingButton icon="thumb_up" />
                            <RatingButton icon="thumb_down" />
                          </StyledRatingContainer>
                        </StyledPost>
                      </RatingContext.Provider>
                      <a className="btn btn-success m-2" href={job.link}>
                        Get Details
                      </a>
                      <a className="btn btn-danger m-2" href={job.appLink}>
                        Apply link
                      </a>
                    </div>
                    <small className="text-truncate">
                      <i className="far fa-calendar-alt text-primary me-2"></i>
                      Last Date: {job.lastDate.split("-").reverse().join("-")}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const RatingButton = ({ icon }) => {
  const { selectedRating, setSelectedRating } = useContext(RatingContext);

  const handleRatingClick = async () => {
    if (selectedRating === icon) {
      return;
    }

    setSelectedRating(icon);

    const postId = document.querySelector(".post").dataset.postId;

    const likeOrDislike = icon === "thumb_up" ? "like" : "dislike";
    // Your API call logic goes here
    // const response = await fetch(`/posts/${postId}/${likeOrDislike}`);
    // const body = await response.json();
    // console.log(body);
  };

  return (
    <StyledRating
      className={`post-rating ${
        selectedRating === icon ? "post-rating-selected" : ""
      }`}
    >
      <StyledRatingButton
        className="post-rating-button material-icons"
        onClick={handleRatingClick}
      >
        {icon}
      </StyledRatingButton>
    </StyledRating>
  );
};

export default Public;
