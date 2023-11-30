import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

export default function Error(props: {
  alert: string;
  setAlert: (alert: string) => void;
}) {
  return (
    <Collapse in={props.alert !== ''}>
      <Alert
        severity="error"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              props.setAlert('');
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        {props.alert}
      </Alert>
    </Collapse>
  );
}
