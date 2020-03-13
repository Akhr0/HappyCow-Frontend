import React, { useState } from "react";
import "./ReviewForm.css";
import Axios from "axios";
import SimpleButton from "../../Basics/SimpleButton/SimpleButton";

const ReviewForm = ({ user, restoId }) => {
  const [title, setTitle] = useState("");
  const [reviewWritten, setReviewWritten] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = event => {
    event.preventDefault();
    const sendDatas = async () => {
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("text", reviewWritten);
        formData.append("restaurant", restoId);
        await Axios.post(
          "https://happy-cow.herokuapp.com/restaurant/review/post",
          formData,
          {
            headers: {
              Authorization: "Bearer " + user
            }
          }
        );

        setMessage({
          status: true,
          text: "Your review has been published"
        });
        setTitle("");
        setReviewWritten("");
      } catch (error) {
        setMessage({
          status: false,
          text: "A server error has occured, please refresh and try again"
        });
      }
    };

    const titleChecked = title.length >= 4 && title.length <= 30 ? true : false;
    const reviewChecked =
      reviewWritten.length >= 4 && reviewWritten.length <= 10000 ? true : false;

    if (titleChecked) {
      if (reviewChecked) {
        sendDatas();
      } else {
        setMessage({
          status: false,
          text: "Your review must have between 4 and 10K characters"
        });
      }
    } else {
      setMessage({
        status: false,
        text: "The Title must have between 4 and 30 characters"
      });
    }
  };

  return (
    <div className="review-form">
      <form className="d-flex fdc aic w100 jss" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          name="review"
          id="review-to-fill"
          cols="30"
          rows="10"
          placeholder="Write your review here ..."
          value={reviewWritten}
          onChange={e => {
            setReviewWritten(e.target.value);
          }}
        />
        {message && (
          <div
            className={
              message.status === true
                ? "good-txt d-flex jcc"
                : "wrong-txt d-flex jcc"
            }
          >
            {message.text}
          </div>
        )}
        <SimpleButton name="Send my review" />
      </form>
    </div>
  );
};

export default ReviewForm;
