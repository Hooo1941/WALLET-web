import { useEffect, useState } from 'react';
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
  Button,
  Tooltip,
} from '@mui/material';
import Error from '../components/error';
import DeleteIcon from '@mui/icons-material/Delete';
import FlagIcon from '@mui/icons-material/Flag';

export default function Bankcard() {
  const uid = localStorage.getItem('uid');
  if (uid === null) return <div>未登录</div>;
  const [alert, setAlert] = useState<string>('');
  const [oldPassword, setOldPassword] = useState('');
  const [bankAccounts, setBankAccounts] = useState<Array<account>>([]);
  // const [emails, setEmails] = useState<Array<email>>([]);

  useEffect(() => {
    setOldPassword('123');
    API.profile({
      user_id: +uid,
    })
      .then((res) => {
        setOldPassword(res[0].password);
      })
      .catch((res) => setAlert(res.toString()));
    API.getAccountByUserId({
      user_id: +uid,
    })
      .then((res) => {
        setBankAccounts(res);
      })
      .catch((res) => setAlert(res.toString()));
  }, []);

  const handleChangePrimary = (account_id: number, index: number) => {
    API.changePrimaryAccount({
      user_id: +uid,
      primary_account_id: account_id,
      password: oldPassword,
    })
      .then((res) => {
        console.log(res);
        const updated = [...bankAccounts];
        updated.forEach((account) => (account.primary = false));
        updated[index].primary = true;
        setBankAccounts(updated);
      })
      .catch((res) => setAlert(res.toString()));
  };

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
                {bankAccounts.length > 0 &&
                  bankAccounts.map((account, index) => (
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
                        <Tooltip title={'设为主账户'} arrow>
                          <IconButton
                            color="secondary"
                            onClick={() =>
                              handleChangePrimary(account.accountId, index)
                            }
                          >
                            <FlagIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={'删除卡'} arrow>
                          <IconButton
                            color="secondary"
                            onClick={() =>
                              handleDelete(account.accountId, index)
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <Button variant="contained" color="primary" href="#/addcard">
            绑定新卡
          </Button>
        </Paper>
      </Container>
    </div>
  );
}
