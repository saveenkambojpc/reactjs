import React, { useRef } from "react";
import { Field } from "formik";

interface FileUploadProps {
  name: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ name }) => {
  // const [field, meta, helpers] = useField(name);

  const fileRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    formik: any
  ) => {
    const { setFieldValue } = formik.form;
    const file = event.currentTarget.files?.[0];
    if (file) {
      // Utilize Formik's helper to set the value
      setFieldValue(name, file);
    } else {
      // Optionally clear the value if no file is selected
      setFieldValue(name, null);
    }
  };

  return (
    <div>
      <div>
        <Field name={name}>
          {(
            // { name, value, onChange, onBlur }
            form: any,
            meta:any
          ) => (
            <>
              <label htmlFor={name}>Choose a file</label>
              <input
                id={name}
                name={name}
                type="file"
                ref={fileRef}
                onChange={(e) => handleChange(e, form)}
                // This ensures the field is not directly controlled by Formik's `field` props
                // which can cause issues for file inputs
                style={meta?.touched && meta?.error ? { borderColor: "red" } : {}}
              />
            </>
          )}
        </Field>
      </div>

      {/* {meta.touched && meta.error ? (
        <div style={{ color: 'red' }}>{meta.error}</div>
      ) : null} */}
    </div>
  );
};

export default FileUpload;
