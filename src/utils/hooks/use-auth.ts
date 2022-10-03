import * as React from 'react';

export default function useAuth() {
  const [authed, setAuthed] = React.useState(false);

  return {
    authed,
    login() {
      return new Promise((res) => {
        setAuthed(true);
        res(true);
      });
    },
    logout() {
      return new Promise((res) => {
        setAuthed(false);
        res(true);
      });
    }
  };
}
// Note: not using this code now
