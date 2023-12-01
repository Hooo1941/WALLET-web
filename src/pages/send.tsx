import { useState, ChangeEvent, FormEvent } from 'react';
import {
  Container,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Paper,
} from '@mui/material';
import Error from '../components/error';
import * as API from '../service/api';

export default function Send() {
  const uid = localStorage.getItem('uid');
  if (uid === null) return <div>未登录</div>;
  const [alert, setAlert] = useState<string>('');
  const [formData, setFormData] = useState({
    to: '',
    amount: 0,
    memo: '',
    password: '',
    method: 'PayByWallet',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name as string]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    const transaction: transactionStruct = {};
    if (formData.to.includes('@')) transaction.email_address = formData.to;
    else transaction.phone_number = formData.to;
    transaction.amount = formData.amount;
    transaction.memo = formData.memo;
    transaction.password = formData.password;
    transaction.user_id = +uid;
    transaction.isPayByWallet = formData.method === 'PayByWallet';
    API.transaction(transaction)
      .then(() => {
        setAlert('转账成功');
        setFormData({
          to: '',
          amount: 0,
          memo: '',
          password: '',
          method: 'PayByWallet',
        });
      })
      .catch((res) => setAlert(res.toString()));
  };

  return (
    <Container maxWidth="md">
      <Error alert={alert} setAlert={setAlert} />
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom>
          转账
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="收款人(手机号或邮箱)"
            variant="outlined"
            fullWidth
            name="to"
            value={formData.to}
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            label="转账金额"
            variant="outlined"
            fullWidth
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            label="备注"
            variant="outlined"
            fullWidth
            name="memo"
            value={formData.memo}
            onChange={handleChange}
          />
          <br />
          <br />
          <TextField
            label="密码"
            variant="outlined"
            fullWidth
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <br />
          <br />
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="method">支付方式</InputLabel>
            <Select
              label="支付方式"
              value={formData.method}
              onChange={handleChange}
              inputProps={{ name: 'method' }}
            >
              <MenuItem value={'PayByWallet'}>钱包支付</MenuItem>
              <MenuItem value={'PayByCard'}>银行卡支付</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: '20px' }}
          >
            提交
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
