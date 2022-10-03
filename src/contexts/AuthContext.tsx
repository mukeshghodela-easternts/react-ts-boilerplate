import * as React from 'react';
import { useAuth } from '../utils/hooks';
type AuthContext = {
  authed: boolean;
  login(): Promise<unknown>;
  logout(): Promise<unknown>;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
const AuthContext = React.createContext<AuthContext>({} as AuthContext);
interface Props {
  children: React.ReactNode;
}
export const AuthProvider: React.FC<Props> = ({ children }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default function AuthConsumer() {
  return React.useContext(AuthContext);
}

// Note: not using this code now