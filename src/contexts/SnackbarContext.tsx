import { Alert, Snackbar, AlertColor } from '@mui/material';
import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';

type SnackbarContext = {
  snackbarOptions: { message: string; show: boolean; color: AlertColor };
  unsetSnackbar(): void;
  setSnackbar: Dispatch<
    SetStateAction<{ message: string; show: boolean; color: AlertColor }>
  >;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
const SnackbarContext = React.createContext<SnackbarContext>(
  {} as SnackbarContext
);

const SnackbarComp: React.FC<{
  snackbarOptions: SnackbarContext['snackbarOptions'];
  unsetSnackbar(): void;
}> = ({ snackbarOptions, unsetSnackbar }) => {
  return (
    <Snackbar
      open={snackbarOptions.show}
      autoHideDuration={6000}
      onClose={unsetSnackbar}
    >
      <Alert
        onClose={unsetSnackbar}
        severity={snackbarOptions.color}
        sx={{ width: '100%' }}
      >
        {snackbarOptions.message}
      </Alert>
    </Snackbar>
  );
};

const SnackbarProvider = (props: any) => {
  const [snackbarOptions, setSnackbar] = useState<
    SnackbarContext['snackbarOptions']
  >({
    message: '',
    show: false,
    color: 'info'
  });
  const unsetSnackbar = useCallback(() => {
    setSnackbar({ message: '', show: false, color: 'info' });
  }, [setSnackbar]);

  return (
    <SnackbarContext.Provider
      value={{ snackbarOptions, unsetSnackbar, setSnackbar }}
    >
      {props.children}
      {snackbarOptions.show && (
        <SnackbarComp
          snackbarOptions={snackbarOptions}
          unsetSnackbar={unsetSnackbar}
        />
      )}
    </SnackbarContext.Provider>
  );
};

const useSnackbar = () => {
  const context = React.useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a UserProvider');
  }

  return context;
};

export { SnackbarProvider, useSnackbar };
