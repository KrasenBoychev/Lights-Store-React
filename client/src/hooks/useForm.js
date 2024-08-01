import { useState } from 'react';

export function useForm(initialValues, submitCallback, setErrors) {
    const [values, setValues] = useState(initialValues);
    //TODO: add support for checkbox
    const changeHandler = async (e) => {
        setValues((state) => ({
          ...state,
          [e.target.name]: e.target.value,
        }));

        setErrors({});
      };

      const submitHandler = (e) => {
        e.preventDefault();
        submitCallback(values);

       // setValues(initialValues);
      };

      return {
        values,
        changeHandler,
        submitHandler,
    };
}