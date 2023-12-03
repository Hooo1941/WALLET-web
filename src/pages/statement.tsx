import { useEffect, useState } from 'react';
import { Container, Typography, Button, Paper } from '@mui/material';
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

const empty = {
  year: 0,
  month: 0,
  maxID: [],
  maxAmount: 0,
  averageAmount: 0,
  totalAmount: 0,
  totalTimes: 0,
  monthStatisticsList: [],
};

export default function Transaction() {
  const uid = localStorage.getItem('uid');
  if (uid === null) return <div>未登录</div>;
  const [alert, setAlert] = useState<string>('');
  const [oldPassword, setOldPassword] = useState('');
  const [transactions, setTransactions] = useState<transactionPerMon>(empty);
  const [filterMonth, setFilterMonth] = useState<filterMonthtype>({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });
  const [best, setBest] = useState({
    recipientUserId: 0,
    name: '',
    totalAmount: 0,
  });

  useEffect(() => {
    API.profile({
      user_id: +uid,
    })
      .then((res) => {
        setOldPassword(res[0].password);
        API.transactionPerMon({
          user_id: +uid,
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1,
          password: res[0].password,
        })
          .then((res) => {
            setTransactions(res);
          })
          .catch((res) => {
            setAlert(res.toString());
            setTransactions(empty);
          });
        API.transactionBestSeller({
          user_id: +uid,
          password: res[0].password,
          start:
            new Date().getFullYear() +
            '-' +
            (new Date().getMonth() + 1) +
            '-' +
            '01',
          end:
            new Date().getFullYear() +
            '-' +
            (new Date().getMonth() + 1) +
            '-' +
            '31',
        })
          .then((res) => {
            console.log(res);
            setBest(res);
          })
          .catch((res) => setAlert(res.toString()));
      })
      .catch((res) => setAlert(res.toString()));
  }, []);

  const handleFilterClick = () => {
    API.transactionPerMon({
      user_id: +uid,
      year: filterMonth?.year,
      month: filterMonth?.month,
      password: oldPassword,
    })
      .then((res) => {
        setTransactions(res);
      })
      .catch((res) => {
        setAlert(res.toString());
        setTransactions(empty);
      });
    API.transactionBestSeller({
      user_id: +uid,
      password: oldPassword,
      start: filterMonth?.year + '-' + filterMonth?.month + '-' + '01',
      end: filterMonth?.year + '-' + filterMonth?.month + '-' + '31',
    })
      .then((res) => {
        console.log(res);
        setBest(res);
      })
      .catch((res) => {
        setAlert(res.toString());
        setBest({
          recipientUserId: 0,
          name: '',
          totalAmount: 0,
        });
      });
  };

  const handleFilterMonth = (e: Dayjs) => {
    console.log(e);
    setFilterMonth({
      year: e.year(),
      month: e.month() + 1,
    });
  };

  return (
    <Container maxWidth="xl">
      <Error alert={alert} setAlert={setAlert} />
      <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom>
          月度收支统计
        </Typography>
        <br />
        <Container sx={{ display: 'flex', alignItems: 'center' }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={'选择月份'}
              views={['month', 'year']}
              onAccept={handleFilterMonth}
            />
          </LocalizationProvider>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginLeft: '20px' }}
            onClick={() => handleFilterClick()}
          >
            统计
          </Button>
        </Container>
        <p>
          本月支付{transactions.totalTimes}次，总支出：
          {transactions.totalAmount}
          元。
        </p>
        <p>本月平均支出：{transactions.averageAmount}元。</p>
        <p>
          本月最大交易ID为：{transactions.maxID.join(',')}，金额：
          {transactions.maxAmount}元。
        </p>
        {best.recipientUserId !== 0 && (
          <p>
            本月交易金额最多的用户为：{best.name}，交易金额：{best.totalAmount}
          </p>
        )}
      </Paper>
    </Container>
  );
}
