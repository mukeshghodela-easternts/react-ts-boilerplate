import { FC, ChangeEvent, useState, useEffect } from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
  Toolbar
} from '@mui/material';

import { CryptoOrder, CryptoOrderStatus } from '../../../models/crypto_order';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import DeleteAllBtn from './DeleteAllBtn';
import { useAppDispatch } from '../../../app/store';
import { selectAllUsers, userActions } from '../../../features/user/usersSlice';
import { useSnackbar } from '../../../contexts/SnackbarContext';
import { useDateTimes, useErrors } from '../../../utils/hooks';
import { AxiosResponse } from 'axios';
import { IPagination } from '../../../common';
import { useAppSelector } from '../../../app/hooks';

interface UsersTableProps {
  className?: string;
  cryptoOrders: CryptoOrder[];
}

interface Filters {
  status?: CryptoOrderStatus;
}

const applyFilters = (
  cryptoOrders: CryptoOrder[],
  filters: Filters
): CryptoOrder[] => {
  return cryptoOrders.filter((cryptoOrder) => {
    let matches = true;

    if (filters.status && cryptoOrder.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const UsersTable: FC<UsersTableProps> = () => {
  const [selectedIds, setSelectedCryptoOrders] = useState<string[]>([]);
  const { setSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const { getServerErrors } = useErrors();
  const { getDateFormat } = useDateTimes();
  const userList = useAppSelector(selectAllUsers);

  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: undefined
  });

  //data and fetching state
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<any[]>([]);
  const [userCount, setUserCount] = useState(0);
  const [pagination, setPagination] = useState<IPagination>({
    query: '',
    page: 0,
    limit: 5,
    orderBy: '',
    descending: false,
    filter: '',
    isLight: false
  });

  useEffect(() => {
    if (!userList.length) {
      setIsLoading(true);
    } else {
      setIsRefetching(true);
    }
    dispatch(
      userActions.userListThunk({
        pagination: { ...pagination, page: Number(pagination.page) + 1 }
      })
    )
      .then((action: any) => {
        setIsLoading(false);
        setIsRefetching(false);
        if (userActions.userListThunk.rejected.match(action)) {
          setSnackbar({
            show: true,
            message: getServerErrors(action.payload as AxiosResponse).errors,
            color: 'error'
          });
        } else {
          setUserCount(action.payload.data.total);
        }
      })
      .catch((e) => {
        setIsError(true);
        setIsLoading(false);
        setIsRefetching(false);
      });
  }, [pagination]);

  const selectedBulkActions = selectedIds.length > 0;

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'completed',
      name: 'Completed'
    },
    {
      id: 'pending',
      name: 'Pending'
    },
    {
      id: 'failed',
      name: 'Failed'
    }
  ];

  const handleStatusChange = (e: any): void => {
    let value: string | null = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters: any) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAll = (event: ChangeEvent<HTMLInputElement>): void => {
    setSelectedCryptoOrders(
      event.target.checked ? userList.map((userId) => userId.id) : []
    );
  };

  const handleSelectOneCryptoOrder = (
    event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: string
  ): void => {
    if (!selectedIds.includes(cryptoOrderId)) {
      setSelectedCryptoOrders((prevSelected) => [
        ...prevSelected,
        cryptoOrderId
      ]);
    } else {
      setSelectedCryptoOrders((prevSelected) =>
        prevSelected.filter((id) => id !== cryptoOrderId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: any) => {
    setPagination({
      ...pagination,
      page: newPage
    });
  };

  const handleChangeRowsPerPage = (event: { target: { value: string } }) => {
    setPagination({
      ...pagination,
      limit: parseInt(event.target.value, 10),
      page: 0
    });
  };

  const selectedSome =
    selectedIds.length > 0 && selectedIds.length < userList.length;
  const selectedAllIds = selectedIds.length === userList.length;
  const theme = useTheme();

  return (
    <Card>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 }
        }}
      >
        {selectedIds.length > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%', pl: 1 }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {selectedIds.length} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%', pl: 1 }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {selectedIds.length} selected
          </Typography>
        )}
        {selectedIds.length > 0 && (
          <Tooltip title="Multiple Delete">
            <IconButton>
              <DeleteAllBtn />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllIds}
                  indeterminate={selectedSome}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Dob</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((user) => {
              const isCryptoOrderSelected = selectedIds.includes(user.id);
              return (
                <TableRow hover key={user.id} selected={isCryptoOrderSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCryptoOrderSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoOrder(event, user.id)
                      }
                      value={isCryptoOrderSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {user.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {user.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {user.dob ? getDateFormat(user.dob) : '-'}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">{user.status_text}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={userCount as number}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleChangeRowsPerPage}
          page={pagination.page as number}
          rowsPerPage={pagination.limit as number}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

UsersTable.propTypes = {
  cryptoOrders: PropTypes.array.isRequired
};

export default UsersTable;
