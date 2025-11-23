import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const BookingForm = (props) => {
  // Validation schema using Yup
  const validationSchema = Yup.object({
    date: Yup.date()
      .required("Date is required")
      .min(new Date(), "Date cannot be in the past"),
    times: Yup.string()
      .required("Time is required"),
    guests: Yup.number()
      .required("Number of guests is required")
      .min(1, "Must have at least 1 guest")
      .max(10, "Cannot have more than 10 guests")
      .integer("Number of guests must be a whole number"),
    occasion: Yup.string()
      .required("Occasion is required")
  });

  // Formik hook
  const formik = useFormik({
    initialValues: {
      date: "",
      times: "",
      guests: "",
      occasion: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      // Handle form submission
      props.submitForm(values);
      setSubmitting(false);
    }
  });

  // Handle date change to trigger available times update
  const handleDateChange = (e) => {
    formik.handleChange(e); // Update Formik state
    props.dispatch(e.target.value); // Trigger available times update
  };

  return (
    <header>
      <section>
        <form onSubmit={formik.handleSubmit}>
          <fieldset className="formField">
            {/* Date Field */}
            <div>
              <label htmlFor="date">Choose Date:</label>
              <input
                id="date"
                name="date"
                value={formik.values.date}
                onChange={handleDateChange}
                onBlur={formik.handleBlur}
                type="date"
                required
              />
              {formik.touched.date && formik.errors.date ? (
                <div className="error">{formik.errors.date}</div>
              ) : null}
            </div>

            {/* Time Field */}
            <div>
              <label htmlFor="times">Choose Time:</label>
              <select
                id="times"
                name="times"
                value={formik.values.times}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              >
                <option value="">Select a Time</option>
                {props.availableTimes.availableTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {formik.touched.times && formik.errors.times ? (
                <div className="error">{formik.errors.times}</div>
              ) : null}
            </div>

            {/* Guests Field */}
            <div>
              <label htmlFor="guests">Number of Guests:</label>
              <input
                id="guests"
                name="guests"
                min="1"
                max="10"
                value={formik.values.guests}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="number"
                placeholder="0"
                required
              />
              {formik.touched.guests && formik.errors.guests ? (
                <div className="error">{formik.errors.guests}</div>
              ) : null}
            </div>

            {/* Occasion Field */}
            <div>
              <label htmlFor="occasion">Occasion:</label>
              <select
                id="occasion"
                name="occasion"
                value={formik.values.occasion}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              >
                <option value="">Select an Option</option>
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
              </select>
              {formik.touched.occasion && formik.errors.occasion ? (
                <div className="error">{formik.errors.occasion}</div>
              ) : null}
            </div>

            {/* Submit Button */}
            <div className="btnReceive">
              <input
                aria-label="On Click"
                type="submit"
                value={"Make Your Reservation"}
                disabled={formik.isSubmitting}
              />
            </div>
          </fieldset>
        </form>
      </section>
    </header>
  );
};

export default BookingForm;