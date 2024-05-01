import { Form, Formik } from "formik";
import { Done } from "@mui/icons-material";
import { Autocomplete, Box, Grid, Stack, TextField } from "@mui/material";

import FormControl from "../../../../../components/core-ui/formik/FormControl";
import { Button } from "../../../../../components/core-ui/button";
import { useAppSelector } from "../../../../../store/hooks";
import { selectModalState } from "../../../../../store/features/modalSlice";
import { useLocation } from "react-router-dom";
import { DocumentUpdateValidation, DocumentUploadValidation } from "../../../../../services/validation/form/document";

type ModalContentProps = {
  handleAddUpdate: (arg1: any) => void;
  isLoading: boolean;
};

function ModalContent({ handleAddUpdate, isLoading }: ModalContentProps) {
  const { data, type } = useAppSelector(selectModalState);
  const {
    state: {
      user: { id: userId },
    },
  } = useLocation();

  const { state } = useLocation();

  let initialValues;
  switch (type) {
    case "edit": {
      const { id, type, feature, document_name, document_params, category } = data;

      initialValues = {
        id,
        type, feature, document_name, document_params, category
      }
      break;
    }
    default:
      initialValues = {
        document: null,
        type: "",
        username: userId,
        feature: state.data.parent,
        document_name: "",
        document_params: [],
        category: "",
      };
  }

  const renderForm = (
    <Formik
      validationSchema={type === "add" ? DocumentUploadValidation : DocumentUpdateValidation}
      initialValues={initialValues}
      onSubmit={handleAddUpdate}
    >
      {({ values, setFieldValue, isValid }) => (
        < Form className="">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl
                control={"input"}
                label={"Document Name"}
                name={"document_name"}
                type={"text"}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                control={"input"}
                label={"Type"}
                name={"type"}
                type={"text"}
              />
            </Grid>
            <Grid xs={12} ml={2}>
              <Autocomplete
                multiple
                freeSolo
                size="small"
                value={values.document_params}
                options={[]}
                onChange={(_event: any, newValue: any) => {
                  setFieldValue('document_params', newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    margin="normal"
                    placeholder='Press Enter add'
                    {...params}
                    label="Document Params"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                control={"input"}
                label={"Category"}
                name={"category"}
                type={"text"}
              />
            </Grid>
            {type === "add" &&
              <Grid item xs={12} md={6}>
                <FormControl control={"file"} name={"document"} />
              </Grid>
            }
          </Grid>

          <Stack mt={3} direction="row" justifyContent="center">
            <Button
              disabled={isLoading || !isValid}
              type="submit"
              endIcon={<Done />}
              variant="outlined"
            >
              {type === "add" ? "Submit" : "Update"}
            </Button>
          </Stack>
        </Form>
      )
      }
    </Formik >
  );
  return <Box>{renderForm}</Box>;
}

export default ModalContent;