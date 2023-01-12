import { Button } from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

function DeleteAllBtn() {
  return (
    <Button
      sx={{ pl: 3 }}
      startIcon={<DeleteTwoToneIcon />}
      variant="contained"
      color="error"
    ></Button>
  );
}
export default DeleteAllBtn;
