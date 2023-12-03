import { useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Button,
  Paper,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Error from '../components/error';
import * as API from '../service/api';

type contrib = {
  mailorphone: string;
  contributionAmount: number;
};

export default function Request() {
  const uid = localStorage.getItem('uid');
  if (uid === null) return <div>未登录</div>;
  const [alert, setAlert] = useState<string>('');
  const [requestMemo, setRequestMemo] = useState('');
  const [data, setData] = useState<Array<contrib>>([]);

  const handleMemoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequestMemo(e.target.value);
  };

  const handleEmailChange = (index: number, value: string) => {
    const newData = [...data];
    newData[index].mailorphone = value;
    setData(newData);
  };

  const handleAmountChange = (index: number, value: number) => {
    const newData = [...data];
    newData[index].contributionAmount = value;
    setData(newData);
  };

  const handleRequestPayment = () => {
    const contributions: contributionStruct[] = [];
    let total = 0.0;
    data.forEach((e) => {
      total += e.contributionAmount;
      if (e.mailorphone.includes('@'))
        contributions.push({
          sender_email: e.mailorphone,
          contribution_amount: e.contributionAmount,
        });
      else
        contributions.push({
          sender_phone_number: e.mailorphone,
          contribution_amount: e.contributionAmount,
        });
    });
    API.request({
      contributions: contributions,
      memo: requestMemo,
      user_id: +uid,
      total_amount: total,
    })
      .then(() => {
        setAlert('发起收款请求成功');
        setData([]);
        setRequestMemo('');
      })
      .catch((res) => setAlert(res.toString()));
  };

  return (
    <Container maxWidth="xl">
      <Error alert={alert} setAlert={setAlert} />
      <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom>
          发起收款
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: '20px' }}
          onClick={() => {
            setData([...data, { mailorphone: '', contributionAmount: 0 }]);
          }}
        >
          增加收款人
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>电话号码或邮箱地址</TableCell>
              <TableCell>收款金额</TableCell>
              <TableCell>删除</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    variant="outlined"
                    fullWidth
                    value={row.mailorphone}
                    onChange={(e) => handleEmailChange(index, e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    variant="outlined"
                    fullWidth
                    value={row.contributionAmount}
                    onChange={(e) =>
                      handleAmountChange(index, Number(e.target.value))
                    }
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    color="secondary"
                    onClick={() => {
                      const newData = [...data];
                      newData.splice(index, 1);
                      setData(newData);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TextField
          label="备注"
          variant="outlined"
          fullWidth
          value={requestMemo}
          onChange={handleMemoChange}
          style={{ marginTop: '20px' }}
        />
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: '20px' }}
          onClick={handleRequestPayment}
        >
          发起收款请求
        </Button>
      </Paper>
    </Container>
  );
}
