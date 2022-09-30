import { Button, Container, Grid, Typography, Box } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled } from '@mui/material/styles';
import { Formik, FormikHelpers, FormikProps, Form, Field } from 'formik';
import { MUITextField } from '../../../../../components/MUITextField';
import {
  merge,
  requiredEmailSchema,
  requiredStringSchema
} from '../../../../../utils/schema-helpers';
import { useCallback } from 'react';
import { useAppDispatch } from '../../../../../app/store'; //RootState
// import { userActions } from '../../../../../features/users/usersSlice';
import {
  LoginFormData,
  userActions
} from '../../../../../features/user/usersSlice';

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(30)};
`
);

const MuiAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(6)};
    height: ${theme.spacing(6)};
    border-radius: 100%;
    background-color: ${theme.colors.primary.main};
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);
const MuiLockOutlinedIcon = styled(Box)(
  ({ theme }) => `
    color: ${theme.colors.alpha.white[100]};
`
);

interface FormValues {
  email: string;
  password: string;
}

const validationSchema = merge(
  requiredStringSchema('password', 'Please enter your password'),
  requiredEmailSchema()
);

// Ref Link : https://codesandbox.io/s/formik-v2-tutorial-final-ge1pt?file=/src/index.js
const LoginForm = () => {
  const dispatch = useAppDispatch();
  const handleLogin = useCallback(
    (values: LoginFormData, formikHelpers: FormikHelpers<FormValues>) =>
      dispatch(
        userActions.userLoginThunk({
          email: values.email,
          password: values.password
        })
      ).then((action) => {
        if (userActions.userLoginThunk.rejected.match(action)) {
          formikHelpers.setFieldError('email', 'Wrong email or password');
          formikHelpers.setFieldError('password', 'Wrong email or password');
        } else {
          // onLoginSuccess();
        }
      }),
    [dispatch]
  );
  const handleSubmit = (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => {
    handleLogin(values, formikHelpers);
    formikHelpers.setSubmitting(false);
  };
  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
      <Grid justifyContent="center" alignItems="center" container>
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Grid item md={10} lg={8} mx="auto">
            <MuiAvatar>
              <MuiLockOutlinedIcon component={LockOutlinedIcon} />
            </MuiAvatar>
            <TypographyH1 sx={{ mb: 4 }} variant="h1">
              Sign In
            </TypographyH1>
            <Formik
              initialValues={{
                email: '',
                password: ''
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {(formikProps: FormikProps<FormValues>) => (
                <Form noValidate autoComplete="off">
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Field
                        fullWidth
                        name="email"
                        label="Email"
                        size="small"
                        component={MUITextField}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        size="small"
                        component={MUITextField}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={formikProps.isSubmitting}
                      >
                        SIGN IN
                      </Button>
                    </Grid>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Grid>
        </Box>
      </Grid>
    </Container>
  );
};

export default LoginForm;
