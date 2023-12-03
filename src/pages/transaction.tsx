import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Paper,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Error from '../components/error';
import * as API from '../service/api';
import { Dayjs } from 'dayjs';

type filterMonthtype = {
  year: number;
  month: number;
};

type filterRangetype = {
  start: string;
  end: string;
};

export default function Transaction() {
  const uid = localStorage.getItem('uid');
  if (uid === null) return <div>未登录</div>;
  const [alert, setAlert] = useState<string>('');
  const [filter, setFilter] = useState<string>('all');
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    number | null
  >(null);
  const [transactions, setTransactions] = useState<Array<statis>>([]);
  const [filterMonth, setFilterMonth] = useState<filterMonthtype | null>(null);
  const [filterSSN, setFilterSSN] = useState<string>('');
  const [filterEmail, setFilterEmail] = useState<string>('');
  const [filterPhone, setFilterPhone] = useState<string>('');
  const [filterRange, setFilterRange] = useState<filterRangetype>({
    start: '',
    end: '',
  });

  useEffect(() => {
    API.profile({
      user_id: +uid,
    })
      .then((res) => {
        setOldPassword(res[0].password);
        API.transactionByDateRange({
          user_id: +uid,
          start: new Date(0).toISOString().split('T')[0],
          end: new Date().toISOString().split('T')[0],
          password: res[0].password,
        })
          .then((res) => {
            setTransactions(res.data ?? []);
          })
          .catch((res) => setAlert(res.toString()));
      })
      .catch((res) => setAlert(res.toString()));
  }, []);

  const handleFilterClick = () => {
    if (filter === 'all') {
      API.transactionByDateRange({
        user_id: +uid,
        start: new Date(0).toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0],
        password: oldPassword,
      })
        .then((res) => {
          setTransactions(res.data ?? []);
        })
        .catch((res) => {
          setAlert(res.toString());
          setTransactions([]);
        });
    } else if (filter === 'permonth') {
      API.transactionPerMon({
        user_id: +uid,
        year: filterMonth?.year,
        month: filterMonth?.month,
        password: oldPassword,
      })
        .then((res) => {
          setTransactions(res.monthStatisticsList);
        })
        .catch((res) => {
          setAlert(res.toString());
          setTransactions([]);
        });
    } else if (filter === 'ssn') {
      API.transactionBySsn({
        user_id: +uid,
        ssn: filterSSN,
        password: oldPassword,
      })
        .then((res) => {
          setTransactions(res);
        })
        .catch((res) => {
          setAlert(res.toString());
          setTransactions([]);
        });
    } else if (filter === 'email') {
      API.transactionByEmail({
        user_id: +uid,
        email_address: filterEmail,
        password: oldPassword,
      })
        .then((res) => {
          setTransactions(res);
        })
        .catch((res) => {
          setAlert(res.toString());
          setTransactions([]);
        });
    } else if (filter === 'phone') {
      API.transactionByPhone({
        user_id: +uid,
        phone: filterPhone,
        password: oldPassword,
      })
        .then((res) => {
          setTransactions(res);
        })
        .catch((res) => {
          setAlert(res.toString());
          setTransactions([]);
        });
    } else if (filter === 'daterange') {
      API.transactionByDateRange({
        user_id: +uid,
        start: filterRange.start,
        end: filterRange.end,
        password: oldPassword,
      })
        .then((res) => {
          setTransactions(res.data ?? []);
        })
        .catch((res) => {
          setAlert(res.toString());
          setTransactions([]);
        });
    } else if (filter === 'cancelled') {
      API.transactionCancelledSta({
        user_id: +uid,
        password: oldPassword,
      })
        .then((res) => {
          setTransactions(res);
        })
        .catch((res) => {
          setAlert(res.toString());
          setTransactions([]);
        });
    }
  };

  const handleFilterMonth = (e: Dayjs) => {
    console.log(e);
    setFilterMonth({
      year: e.year(),
      month: e.month() + 1,
    });
  };

  const handleFilterRange = (type: number, e: Dayjs) => {
    if (type === 1) {
      setFilterRange((prevData) => ({
        ...prevData,
        start: e.format('YYYY-MM-DD'),
      }));
    } else {
      setFilterRange((prevData) => ({
        ...prevData,
        end: e.format('YYYY-MM-DD'),
      }));
    }
  };

  const handleCancelClick = (transactionId: number) => {
    setSelectedTransactionId(transactionId);
    setCancelDialogOpen(true);
  };

  const handleCancelDialogClose = () => {
    setCancelDialogOpen(false);
    setSelectedTransactionId(null);
    setCancelReason('');
  };

  const handleCancelConfirm = () => {
    console.log('Transaction Cancelled:', selectedTransactionId);
    handleCancelDialogClose();
    API.transactionCancel({
      user_id: +uid,
      transaction_id: selectedTransactionId ?? 0,
      password: password,
      cancel_reason: cancelReason,
    })
      .then(() => {
        setAlert('取消成功');
        setTransactions((prevData) => {
          const updated = [...prevData];
          const index = updated.findIndex(
            (transaction) => transaction.transactionId === selectedTransactionId
          );
          updated[index].isCancelled = true;
          updated[index].cancelledReason = cancelReason;
          return updated;
        });
      })
      .catch((res) => setAlert(res.toString()));
  };

  return (
    <Container maxWidth="xl">
      <Error alert={alert} setAlert={setAlert} />
      <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom>
          转账记录
        </Typography>
        <br />
        <Container sx={{ display: 'flex', alignItems: 'center' }}>
          <FormControl variant="outlined">
            <InputLabel htmlFor="method">筛选条件</InputLabel>
            <Select
              label="筛选条件"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              inputProps={{ name: 'method' }}
            >
              <MenuItem value={'all'}>所有记录</MenuItem>
              <MenuItem value={'permonth'}>月份</MenuItem>
              <MenuItem value={'ssn'}>SSN</MenuItem>
              <MenuItem value={'email'}>邮箱</MenuItem>
              <MenuItem value={'phone'}>手机</MenuItem>
              <MenuItem value={'daterange'}>时间范围</MenuItem>
              <MenuItem value={'cancelled'}>已取消订单</MenuItem>
            </Select>
          </FormControl>
          {filter === 'permonth' && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={'选择月份'}
                views={['month', 'year']}
                onAccept={handleFilterMonth}
              />
            </LocalizationProvider>
          )}
          {filter === 'ssn' && (
            <TextField
              label="SSN"
              variant="outlined"
              name="ssn"
              value={filterSSN}
              onChange={(e) => setFilterSSN(e.target.value)}
            />
          )}
          {filter === 'email' && (
            <TextField
              label="邮箱"
              variant="outlined"
              name="email"
              value={filterEmail}
              onChange={(e) => setFilterEmail(e.target.value)}
            />
          )}
          {filter === 'phone' && (
            <TextField
              label="手机号"
              variant="outlined"
              name="phone"
              value={filterPhone}
              onChange={(e) => setFilterPhone(e.target.value)}
            />
          )}
          {filter === 'daterange' && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label={'开始时间'}
                views={['month', 'year', 'day']}
                onAccept={(e: Dayjs) => handleFilterRange(1, e)}
              />
              <DatePicker
                label={'结束时间'}
                views={['month', 'year', 'day']}
                onAccept={(e: Dayjs) => handleFilterRange(2, e)}
              />
            </LocalizationProvider>
          )}
          <Button
            variant="contained"
            color="secondary"
            style={{ marginLeft: '20px' }}
            onClick={() => handleFilterClick()}
          >
            筛选
          </Button>
        </Container>
        <br />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>发送者昵称</TableCell>
              <TableCell>收款者邮箱/手机号</TableCell>
              <TableCell>金额</TableCell>
              <TableCell>交易时间</TableCell>
              <TableCell>是否完成</TableCell>
              <TableCell>是否取消</TableCell>
              <TableCell>取消原因</TableCell>
              <TableCell>备注</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((row) => (
              <TableRow key={row.transactionId}>
                {/* <TableCell>{row.transactionId}</TableCell> */}
                <TableCell>{row.senderUserId}</TableCell>
                <TableCell>
                  {row.recipientUserId ||
                    row.recipientEmailId ||
                    row.recipientPhoneNumber}
                </TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>
                  {new Date(row.transactionStartTime)
                    .toISOString()
                    .split('T')
                    .join(' ')}
                </TableCell>
                <TableCell>
                  {row.transactionFinishedTime !== undefined ? '是' : '否'}
                </TableCell>
                <TableCell>{row.isCancelled ? '是' : '否'}</TableCell>
                <TableCell>{row.cancelledReason}</TableCell>
                <TableCell>{row.memo}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleCancelClick(row.transactionId)}
                    disabled={row.isCancelled}
                  >
                    取消
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={cancelDialogOpen} onClose={handleCancelDialogClose}>
        <DialogTitle>取消交易</DialogTitle>
        <DialogContent>
          <DialogContentText>
            请输入取消原因和密码以确认取消交易。
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="取消原因"
            type="text"
            fullWidth
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
          />
          <TextField
            margin="dense"
            label="密码"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDialogClose} color="primary">
            返回
          </Button>
          <Button onClick={handleCancelConfirm} color="primary">
            取消交易
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
