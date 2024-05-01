import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Done } from '@mui/icons-material';
import { Box, Grid, Stack } from '@mui/material';

import FormControl, { Control } from '../../../../../components/core-ui/formik/FormControl';
import { Button } from '../../../../../components/core-ui/button';
import { useAppSelector } from '../../../../../store/hooks';
import { selectModalState } from '../../../../../store/features/modalSlice';

type ModalContentProps = {
  handleAddUpdate: (arg1: any) => void,
  isLoading: boolean
}

function ModalContent({ handleAddUpdate, isLoading }: ModalContentProps) {
  const { data, type } = useAppSelector(selectModalState)

  let initialValues;
  switch (type) {
    case 'edit':
      initialValues = {
        id: data.id,
        name: data.name,
        scopes: data.scopes,
      };
      break;
    default:
      initialValues = {
        name: '',
        scopes: {
          member: false,
          it_admin: false,
          family_admin: false,
          member_admin: false,
          maker: false,
          checker: false,
          admin: false,
          editor: false,
          viewer: false
        },
      };
  }

  const validation = Yup.object({});

  const scopes: { name: string, label: string, control: Control }[] = [
    {
      name: 'scopes.admin',
      label: 'Admin',
      control: 'checkbox',
    },
    {
      name: 'scopes.editor',
      label: 'Editor',
      control: 'checkbox',
    },
    {
      name: 'scopes.viewer',
      label: 'Viewer',
      control: 'checkbox',
    },
    {
      name: 'scopes.member',
      label: 'Member',
      control: 'checkbox',
    },
    {
      name: 'scopes.it_admin',
      label: 'IT Admin',
      control: 'checkbox',
    },
    {
      name: 'scopes.family_admin',
      label: 'Family Admin',
      control: 'checkbox',
    },
    {
      name: 'scopes.member_admin',
      label: 'Member Admin',
      control: 'checkbox',
    },
    {
      name: 'scopes.maker',
      label: 'Maker',
      control: 'checkbox',
    },
    {
      name: 'scopes.checker',
      label: 'Checker',
      control: 'checkbox',
    },
  ];




  const renderForm = (
    <Formik validationSchema={validation} initialValues={initialValues} onSubmit={handleAddUpdate}>
      {() => (
        <Form className="">
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>

              <FormControl
                control={"input"}
                label={"Role"}
                name={"name"}
                type={"text"}
              />


            </Grid>
            <Grid item xs={12} md={12}>
              <Grid container>

                {scopes.map((item) => (
                  <Grid xs={12} md={6} item>
                    <FormControl control={item.control} label={item.label} name={item.name} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>

          <Stack mt={3} direction="row" justifyContent="center">
            <Button
              disabled={isLoading}
              type="submit"
              endIcon={<Done />}
              variant="outlined"
            >
              {type === 'add' ? 'Submit' : 'Update'}
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
  return <Box>{renderForm}</Box>;
}

export default ModalContent;
