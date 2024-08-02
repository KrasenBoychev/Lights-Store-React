import { useEffect, useState } from 'react';

export function useForm(initialValues, submitCallback, setErrors) {
    const [values, setValues] = useState(initialValues);

    useEffect(() => {
      setValues(initialValues);
    }, [initialValues]);
   
    const changeHandler = async (e) => {
        setValues((state) => ({
          ...state,
          [e.target.name]: e.target.type === 'file'
        ? e.target.files[0]
        : e.target.value,
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