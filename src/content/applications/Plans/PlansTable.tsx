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
import { userActions } from '../../../features/user/usersSlice';
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

interface PlansTableProps {
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

  const { text, color }: any = map[cryptoOrderStatus];

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

const PlansTable: FC<PlansTableProps> = ({ cryptoOrders }) => {
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>(
    []
  );
  const { setSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const { getServerErrors } = useErrors();
  const [pageData, setPageData] = useState<IPagination>({
    query: '',
    page: 1,
    limit: 5,
    orderBy: '',
    descending: false,
    filter: '',
    isLight: false
  });
  //data and fetching state
  const [data, setData] = useState<any>([]); // Need to type here after finishing server table
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  //table state
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5
  });

  useEffect(() => {
    setPageData({ page: pagination.pageIndex + 1, limit: pagination.pageSize });
    if (!data.length) {
      setIsLoading(true);
    } else {
      setIsRefetching(true);
    }
    dispatch(userActions.planListThunk({ pagination: pageData }))
      .then((action: any) => {
        setIsLoading(false);
        setIsRefetching(false);
        if (userActions.planListThunk.rejected.match(action)) {
          setSnackbar({
            show: true,
            message: getServerErrors(action.payload as AxiosResponse).errors,
            color: 'error'
          });
        } else {
          setData(action.payload.data);
          setRowCount(action.payload.total);
        }
      })
      .catch((e) => {
        setIsError(true);
        setIsLoading(false);
        setIsRefetching(false);
      });
  }, [
    columnFilters,
    globalFilter,
    pagination.pageIndex,
    pagination.pageSize,
    sorting
  ]);
  const columns = useMemo<MRT_ColumnDef<any>[]>( // Need to fix type here later
    () => [
      {
        accessorKey: 'name',
        header: 'Plan Name'
      },
      {
        accessorKey: 'price',
        header: 'Price'
      },
      {
        accessorKey: 'introductory_text',
        header: 'Plan Description'
      },
      {
        accessorKey: 'status',
        header: 'Plan Description'
      }
    ],
    []
  );
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

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
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
    // <Card>
    //   {selectedBulkActions && (
    //     <Box flex={1} p={2}>
    //       <BulkActions />
    //     </Box>
    //   )}
    //   {!selectedBulkActions && (
    //     <CardHeader
    //       action={
    //         <Box width={150}>
    //           <FormControl fullWidth variant="outlined">
    //             <InputLabel>Status</InputLabel>
    //             <Select
    //               value={filters.status || 'all'}
    //               onChange={handleStatusChange}
    //               label="Status"
    //               autoWidth
    //             >
    //               {statusOptions.map((statusOption) => (
    //                 <MenuItem key={statusOption.id} value={statusOption.id}>
    //                   {statusOption.name}
    //                 </MenuItem>
    //               ))}
    //             </Select>
    //           </FormControl>
    //         </Box>
    //       }
    //       title="Recent Orders"
    //     />
    //   )}
    //   <Divider />
    //   <TableContainer>
    //     <Table>
    //       <TableHead>
    //         <TableRow>
    //           <TableCell padding="checkbox">
    //             <Checkbox
    //               color="primary"
    //               checked={selectedAllCryptoOrders}
    //               indeterminate={selectedSomeCryptoOrders}
    //               onChange={handleSelectAllCryptoOrders}
    //             />
    //           </TableCell>
    //           <TableCell>Order Details</TableCell>
    //           <TableCell>Order ID</TableCell>
    //           <TableCell>Source</TableCell>
    //           <TableCell align="right">Amount</TableCell>
    //           <TableCell align="right">Status</TableCell>
    //           <TableCell align="right">Actions</TableCell>
    //         </TableRow>
    //       </TableHead>
    //       <TableBody>
    //         {paginatedCryptoOrders.map((cryptoOrder) => {
    //           const isCryptoOrderSelected = selectedCryptoOrders.includes(
    //             cryptoOrder.id
    //           );
    //           return (
    //             <TableRow
    //               hover
    //               key={cryptoOrder.id}
    //               selected={isCryptoOrderSelected}
    //             >
    //               <TableCell padding="checkbox">
    //                 <Checkbox
    //                   color="primary"
    //                   checked={isCryptoOrderSelected}
    //                   onChange={(event: ChangeEvent<HTMLInputElement>) =>
    //                     handleSelectOneCryptoOrder(event, cryptoOrder.id)
    //                   }
    //                   value={isCryptoOrderSelected}
    //                 />
    //               </TableCell>
    //               <TableCell>
    //                 <Typography
    //                   variant="body1"
    //                   fontWeight="bold"
    //                   color="text.primary"
    //                   gutterBottom
    //                   noWrap
    //                 >
    //                   {cryptoOrder.orderDetails}
    //                 </Typography>
    //                 <Typography variant="body2" color="text.secondary" noWrap>
    //                   {format(cryptoOrder.orderDate, 'MMMM dd yyyy')}
    //                 </Typography>
    //               </TableCell>
    //               <TableCell>
    //                 <Typography
    //                   variant="body1"
    //                   fontWeight="bold"
    //                   color="text.primary"
    //                   gutterBottom
    //                   noWrap
    //                 >
    //                   {cryptoOrder.orderID}
    //                 </Typography>
    //               </TableCell>
    //               <TableCell>
    //                 <Typography
    //                   variant="body1"
    //                   fontWeight="bold"
    //                   color="text.primary"
    //                   gutterBottom
    //                   noWrap
    //                 >
    //                   {cryptoOrder.sourceName}
    //                 </Typography>
    //                 <Typography variant="body2" color="text.secondary" noWrap>
    //                   {cryptoOrder.sourceDesc}
    //                 </Typography>
    //               </TableCell>
    //               <TableCell align="right">
    //                 <Typography
    //                   variant="body1"
    //                   fontWeight="bold"
    //                   color="text.primary"
    //                   gutterBottom
    //                   noWrap
    //                 >
    //                   {cryptoOrder.amountCrypto}
    //                   {cryptoOrder.cryptoCurrency}
    //                 </Typography>
    //                 <Typography variant="body2" color="text.secondary" noWrap>
    //                   {numeral(cryptoOrder.amount).format(
    //                     `${cryptoOrder.currency}0,0.00`
    //                   )}
    //                 </Typography>
    //               </TableCell>
    //               <TableCell align="right">
    //                 {getStatusLabel(cryptoOrder.status)}
    //               </TableCell>
    //               <TableCell align="right">
    //                 <Tooltip title="Edit Order" arrow>
    //                   <IconButton
    //                     sx={{
    //                       '&:hover': {
    //                         background: theme.colors.primary.lighter
    //                       },
    //                       color: theme.palette.primary.main
    //                     }}
    //                     color="inherit"
    //                     size="small"
    //                   >
    //                     <EditTwoToneIcon fontSize="small" />
    //                   </IconButton>
    //                 </Tooltip>
    //                 <Tooltip title="Delete Order" arrow>
    //                   <IconButton
    //                     sx={{
    //                       '&:hover': { background: theme.colors.error.lighter },
    //                       color: theme.palette.error.main
    //                     }}
    //                     color="inherit"
    //                     size="small"
    //                   >
    //                     <DeleteTwoToneIcon fontSize="small" />
    //                   </IconButton>
    //                 </Tooltip>
    //               </TableCell>
    //             </TableRow>
    //           );
    //         })}
    //       </TableBody>
    //     </Table>
    //   </TableContainer>
    <TableContainer>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableRowSelection
        getRowId={(row) => row.id}
        initialState={{
          showColumnFilters: false,
          globalFilter: true,
          showProgressBars: true
        }}
        manualFiltering
        manualPagination
        manualSorting
        muiToolbarAlertBannerProps={
          isError
            ? {
                color: 'error',
                children: 'Error loading data'
              }
            : undefined
        }
        onColumnFiltersChange={setColumnFilters}
        onGlobalFilterChange={setGlobalFilter}
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        rowCount={rowCount}
        state={{
          columnFilters,
          globalFilter,
          isLoading,
          pagination,
          showAlertBanner: isError,
          showProgressBars: isRefetching,
          sorting
        }}
      />
    </TableContainer>
    //   <Box p={2}>
    //     <TablePagination
    //       component="div"
    //       count={filteredCryptoOrders.length}
    //       onPageChange={handlePageChange}
    //       onRowsPerPageChange={handleLimitChange}
    //       page={page}
    //       rowsPerPage={limit}
    //       rowsPerPageOptions={[5, 10, 25, 30]}
    //     />
    //   </Box>
    // </Card>
  );
};

PlansTable.propTypes = {
  cryptoOrders: PropTypes.array.isRequired
};

export default PlansTable;
