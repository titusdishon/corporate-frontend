import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};

export const usePost = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (values) => {
    setValues(values);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
  };
};
