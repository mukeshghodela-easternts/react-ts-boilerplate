import { FC, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material';
import { DataGrid, GridSelectionModel, GridSortModel } from '@mui/x-data-grid';

import { CryptoOrder, CryptoOrderStatus } from '../../../models/crypto_order';
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

const UsersTable: FC<UsersTableProps> = () => {
  const { setSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const { getServerErrors } = useErrors();
  const { getDateFormat } = useDateTimes();
  const userList = useAppSelector(selectAllUsers);

  //data and fetching state
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<any[]>([]);
  const [userCount, setUserCount] = useState(0);
  const [pagination, setPagination] = useState<IPagination>({
    query: '',
    page: 1,
    limit: 5,
    orderBy: '',
    orderType: '',
    filter: '',
    isLight: false
  });

  const getUsers = () => {
    setIsLoading(true);
    dispatch(
      userActions.userListThunk({
        pagination: pagination
      })
    )
      .then((action: any) => {
        setIsLoading(false);
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
        setSnackbar({
          show: true,
          message: getServerErrors(e.response).errors,
          color: 'error'
        });
        setIsError(true);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getUsers();
  }, [pagination]);

  const handleSortModelChange = useCallback((sortModel: GridSortModel) => {
    if (sortModel.length > 0) {
      setPagination({
        ...pagination,
        orderBy: sortModel[0].field,
        orderType: sortModel[0].sort as string
      });
    }
  }, []);

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'dob', headerName: 'Dob', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'status_text', headerName: 'Status', width: 200 }
  ];

  return (
    <>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          autoHeight
          paginationMode="server"
          sortingMode="server"
          rows={userList}
          columns={columns}
          pageSize={pagination.limit}
          rowsPerPageOptions={[5, 10, 15, 20]}
          rowCount={userCount}
          loading={isLoading}
          checkboxSelection
          selectionModel={selectionModel}
          onPageSizeChange={(newPageSize) =>
            setPagination({ ...pagination, limit: newPageSize })
          }
          onPageChange={(newPage) =>
            setPagination({ ...pagination, page: newPage + 1 })
          }
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          onSortModelChange={handleSortModelChange}
        />
      </div>
    </>
  );
};

UsersTable.propTypes = {
  cryptoOrders: PropTypes.array.isRequired
};

export default UsersTable;
