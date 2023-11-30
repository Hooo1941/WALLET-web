import React, { useEffect, useState } from 'react';
import * as API from '../service/api';
import {
  Container,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Paper,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import Error from '../components/error';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Bankcard() {
  const uid = localStorage.getItem('uid');
  if (uid === null) return <div>未登录</div>;
  const [alert, setAlert] = useState<string>('');
  const [oldPassword, setOldPassword] = useState('');
  const [bankAccounts, setBankAccounts] = useState<Array<account>>([
    {
      accountId: 1,
      bankId: 'abc',
      accountNumber: '123456',
      userAccountId: 1,
      userId: 1,
      verified: true,
      primary: true,
      joint: true,
    },
  ]);
  // const [emails, setEmails] = useState<Array<email>>([]);

  useEffect(() => {
    setOldPassword('123');
    API.profile({
      user_id: +uid,
    })
      .then((res) => {
        setOldPassword(res.users[0].password);
      })
      .catch((res) => setAlert(res.toString()));
  }, []);

  const handleDelete = (account_id: number, index: number) => {
    API.removeBankInfo({
      user_id: +uid,
      account_id: account_id,
      password: oldPassword,
    })
      .then((res) => {
        console.log(res);
        const updated = [...bankAccounts];
        updated.splice(index, 1);
        setBankAccounts(updated);
      })
      .catch((res) => setAlert(res.toString()));
  };

  return (
    <div>
      <Container maxWidth="md">
        <Error alert={alert} setAlert={setAlert} />
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h5" gutterBottom>
            所有银行卡
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ textAlign: 'center' }}>银行</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>账号</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>已验证</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>主账户</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>联合账户</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>操作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bankAccounts.map((account, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ textAlign: 'center' }}>
                      {account.bankId}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      {account.accountNumber}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      {account.verified ? '是' : '否'}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      {account.primary ? '是' : '否'}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      {account.joint ? '是' : '否'}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDelete(account.accountId, index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <Button variant="contained" color="primary" href="#/addcard">
            {' '}
            绑定新卡{' '}
          </Button>
        </Paper>
      </Container>
    </div>
  );
}
