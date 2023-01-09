import { FC, ChangeEvent, useState, useEffect, useMemo } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
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
  CardHeader
} from '@mui/material';

import Label from '../../../components/Label';
import { CryptoOrder, CryptoOrderStatus } from '../../../models/crypto_order';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import { useAppDispatch } from '../../../app/store';
import { selectAllUsers, userActions } from '../../../features/user/usersSlice';
import { useSnackbar } from '../../../contexts/SnackbarContext';
import { useErrors } from '../../../utils/hooks';
import { AxiosResponse } from 'axios';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import type {
  ColumnFiltersState,
  PaginationState,
  SortingState
} from '@tanstack/react-table';
import { IPagination } from '../../../common';
import { useAppSelector } from '../../../app/hooks';

interface UsersTableProps {
  className?: string;
  cryptoOrders: CryptoOrder[];
}

interface Filters {
  status?: CryptoOrderStatus;
}

const getStatusLabel = (cryptoOrderStatus: CryptoOrderStatus): JSX.Element => {
  const map = {
    failed: {
      text: 'Failed',
      color: 'error'
    },
    completed: {
      text: 'Completed',
      color: 'success'
    },
    pending: {
      text: 'Pending',
      color: 'warning'
    }
  };

  const { text, color }: any = map['failed'];

  return <Label color={color}>{text}</Label>;
};

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

const applyPagination = (
  cryptoOrders: CryptoOrder[],
  page: number,
  limit: number
): CryptoOrder[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const UsersTable: FC<UsersTableProps> = ({ cryptoOrders }) => {
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>(
    []
  );
  const { setSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const { getServerErrors } = useErrors();
  const userList = useAppSelector(selectAllUsers);
  //data and fetching state
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
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
          // setUserCount(action.payload.data.total);
          setUserCount(325);
        }
      })
      .catch((e) => {
        setIsError(true);
        setIsLoading(false);
        setIsRefetching(false);
      });
  }, [pagination]);

  const selectedBulkActions = selectedCryptoOrders.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: undefined
  });

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

  const handleSelectAllCryptoOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCryptoOrders(
      event.target.checked
        ? cryptoOrders.map((cryptoOrder) => cryptoOrder.id)
        : []
    );
  };

  const handleSelectOneCryptoOrder = (
    event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: string
  ): void => {
    if (!selectedCryptoOrders.includes(cryptoOrderId)) {
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

  const filteredCryptoOrders = applyFilters(cryptoOrders, filters);
  const paginatedCryptoOrders = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );
  const selectedSomeCryptoOrders =
    selectedCryptoOrders.length > 0 &&
    selectedCryptoOrders.length < cryptoOrders.length;
  const selectedAllCryptoOrders =
    selectedCryptoOrders.length === cryptoOrders.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="Listing"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllCryptoOrders}
                  indeterminate={selectedSomeCryptoOrders}
                  onChange={handleSelectAllCryptoOrders}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((user) => {
              const isCryptoOrderSelected = selectedCryptoOrders.includes(
                user.id
              );
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
                    {/* <Typography variant="body2" color="text.secondary" noWrap>
                      {format(user.orderDate, 'MMMM dd yyyy')}
                    </Typography> */}
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
