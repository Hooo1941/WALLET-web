import { useEffect, useState } from 'react';
import * as API from '../service/api';
import {
  Container,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Paper,
} from '@mui/material';
import Error from '../components/error';

export default function BankAccountForm() {
  const uid = localStorage.getItem('uid');
  if (uid === null) return <div>未登录</div>;
  const [alert, setAlert] = useState<string>('');
  const [oldPassword, setOldPassword] = useState('');

  const [bankAccount, setBankAccount] = useState({
    bankId: '',
    accountNumber: '',
    primary: true,
    joint: true,
  });

  useEffect(() => {
    setOldPassword('123');
    API.profile({
      user_id: +uid,
    })
      .then((res) => {
        setOldPassword(res[0].password);
      })
      .catch((res) => setAlert(res.toString()));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setBankAccount((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted Data:', bankAccount);
    API.addBankInfo({
      user_id: +uid,
      bank_id: bankAccount.bankId,
      password: oldPassword,
      account_number: bankAccount.accountNumber,
      is_joint: bankAccount.joint.toString(),
      is_account_primary: bankAccount.primary.toString(),
      is_account_verified: 'true',
    })
      .then((res) => {
        console.log(res);
        location.href = '/#/bankcard';
      })
      .catch((res) => setAlert(res.toString()));
  };

  return (
    <Container maxWidth="md">
      <Error alert={alert} setAlert={setAlert} />
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom>
          绑定新卡
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="银行"
            variant="outlined"
            fullWidth
            name="bankId"
            value={bankAccount.bankId}
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            label="账号"
            variant="outlined"
            fullWidth
            name="accountNumber"
            value={bankAccount.accountNumber}
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                name="primary"
                checked={bankAccount.primary}
                onChange={handleChange}
              />
            }
            label="主账户"
            style={{ marginTop: '20px' }}
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                name="joint"
                checked={bankAccount.joint}
                onChange={handleChange}
              />
            }
            label="联合账户"
            style={{ marginTop: '20px' }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: '20px' }}
          >
            绑定
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
