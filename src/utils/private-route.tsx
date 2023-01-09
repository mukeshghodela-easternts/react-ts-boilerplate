// import React from 'react';
import { /*Route,*/ Navigate, RouteProps } from 'react-router-dom';
import { selectUser } from '../features/user/usersSlice';
// import { usePrevious } from './hooks';
import { useTypedSelector } from '../app/store';

const PrivateRoute = ({ children }: { children: RouteProps['children'] }) => {
  // const [resolved, setResolved] = useState(false);
  // const dispatch = useAppDispatch();
  const user = useTypedSelector(selectUser);
  const isAuthenticated = user.token;
  // const prevIsAuthenticated = usePrevious(isAuthenticated);

  // useEffect(() => {
  //   // const checkUser = async () => {
  //   //   await dispatch(checkSession());
  //   // };

  //   const isAuthenticatedChanged =
  //     prevIsAuthenticated !== undefined &&
  //     isAuthenticated !== prevIsAuthenticated;

  //   // handle the edge case of when a user is logged in, then 401's on the next request
  //   if (isAuthenticatedChanged && !isAuthenticated) {
  //     setResolved(false);
  //     return;
  //   }

  //   // if (!resolved) {
  //   //   if (!isAuthenticated) {
  //   //     checkUser().finally(() => {
  //   //       setResolved(true);
  //   //     });
  //   //   } else {
  //   //     setResolved(true);
  //   //   }
  //   // } Commented this code because th
  // }, [isAuthenticated, prevIsAuthenticated, resolved /**, dispatch*/]);

  return isAuthenticated ? (
    children
  ) : (
    <Navigate
      to={{
        pathname: '/login'
      }}
      state={{ from: location }}
    />
  );
};

export default PrivateRoute;
