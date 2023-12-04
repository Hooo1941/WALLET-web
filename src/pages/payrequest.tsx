import { useEffect, useState, ChangeEvent } from 'react';
import {
  Paper,
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  DialogActions,
} from '@mui/material';
import Error from '../components/error';
import * as API from '../service/api';

export default function Payrequest() {
  const uid = localStorage.getItem('uid');
  if (uid === null) return <div>未登录</div>;
  const [alert, setAlert] = useState<string>('');
  const [requests, setRequests] = useState<needRequest>([]);
  const [selectedRequest, setSelectedRequest] =
    useState<requestContribution | null>(null);
  const [payDialogOpen, setPayDialogOpen] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const [password, setPassword] = useState('');
  const [memo, setMemo] = useState('');

  const handlePaymentMethodChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleMemoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMemo(e.target.value);
  };

  const handlePay = () => {
    API.contribute({
      user_id: +uid,
      password: password,
      contribution_id: selectedRequest?.contribution_id || 0,
      isPayByWallet: paymentMethod === 'wallet',
      memo: memo,
    })
      .then(() => setAlert('支付成功'))
      .catch((res) => setAlert(res.toString()));
    setPassword('');
    setPayDialogOpen(false);
  };

  const handlePayClick = (request: requestContribution) => {
    setSelectedRequest(request);
    setPayDialogOpen(true);
  };

  const handlePayDialogClose = () => {
    setPayDialogOpen(false);
  };

  useEffect(() => {
    // TODO: delete
    setRequests([
      {
        request_id: 1,
        contribution_id: 1,
        contribution_amount: 1,
        name: 'test',
        memo: 'testmemo',
        request_time: Number(new Date()),
      },
    ]);
    API.needRequest({ user_id: +uid })
      .then((res) => {
        setRequests(res);
      })
      .catch((err) => {
        setAlert(err.toString());
      });
  }, []);

  return (
    <Container maxWidth="xl">
      <Error alert={alert} setAlert={setAlert} />
      <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom>
          需要支付的收款
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>收款人</TableCell>
              <TableCell>收款金额</TableCell>
              <TableCell>收款备注</TableCell>
              <TableCell>收款时间</TableCell>
              <TableCell>支付</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((row) => (
              <TableRow key={row.request_id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.contribution_amount}</TableCell>
                <TableCell>{row.memo || '-'}</TableCell>
                <TableCell>
                  {new Date(row.request_time).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handlePayClick(row)}
                  >
                    支付
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog open={payDialogOpen} onClose={handlePayDialogClose}>
          <DialogTitle>支付收款</DialogTitle>
          <DialogContent>
            <FormControl fullWidth variant="outlined" sx={{ mt: '10px' }}>
              <InputLabel htmlFor="method">支付方式</InputLabel>
              <Select
                fullWidth
                label="支付方式"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
                inputProps={{ name: 'method' }}
              >
                <MenuItem value="wallet">钱包支付</MenuItem>
                <MenuItem value="bank">银行卡支付</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="支付密码"
              type="password"
              fullWidth
              value={password}
              onChange={handlePasswordChange}
              margin="normal"
            />
            <TextField
              label="支付备注"
              type="memo"
              fullWidth
              value={memo}
              onChange={handleMemoChange}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handlePay} color="primary">
              确认支付
            </Button>
            <Button onClick={handlePayDialogClose} color="primary">
              取消
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
}
