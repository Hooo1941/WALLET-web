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

type email = {
  emailAddress: string;
  emailVerified: boolean;
};

export default function Email() {
  const uid = localStorage.getItem('uid');
  if (uid === null) return <div>未登录</div>;
  const [alert, setAlert] = useState<string>('');
  const [newEmail, setNewEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [emails, setEmails] = useState<email[]>([]);
  // const [emails, setEmails] = useState<Array<email>>([]);

  useEffect(() => {
    setOldPassword('123');
    API.profile({
      user_id: +uid,
    })
      .then((res) => {
        const retemails: email[] = [];
        setOldPassword(res[0].password);
        res.forEach((e) => {
          retemails.push({
            emailAddress: e.emailAddress,
            emailVerified: e.emailVerified ?? false,
          });
        });
        setEmails(retemails);
      })
      .catch((res) => setAlert(res.toString()));
  }, []);

  const handleDelete = (address: string, index: number) => {
    API.updateEmailInfo({
      user_id: +uid,
      password: oldPassword,
      email_address: address,
      isAddEmail: 'false',
      is_email_registered: 'true',
      is_email_verified: 'true',
    })
      .then((res) => {
        console.log(res);
        const updatedEmails = [...emails];
        updatedEmails.splice(index, 1);
        setEmails(updatedEmails);
      })
      .catch((res) => setAlert(res.toString()));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
  };

  const handleClick = () => {
    if (newEmail === '') return;
    API.updateEmailInfo({
      user_id: +uid,
      password: oldPassword,
      email_address: newEmail,
      isAddEmail: 'true',
      is_email_registered: 'true',
      is_email_verified: 'true',
    })
      .then((res) => {
        console.log(res);
        const updatedEmails = [...emails];
        updatedEmails.push({ emailAddress: newEmail, emailVerified: true });
        setEmails(updatedEmails);
        setNewEmail('');
      })
      .catch((res) => setAlert(res.toString()));
  };

  return (
    <div>
      <Container maxWidth="md">
        <Error alert={alert} setAlert={setAlert} />
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
          <Typography variant="h5" gutterBottom>
            所有邮箱
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ textAlign: 'center' }}>邮箱地址</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>是否验证</TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>删除</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {emails.map((email, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ textAlign: 'center' }}>
                      {email.emailAddress}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      {email.emailVerified ? '是' : '否'}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDelete(email.emailAddress, index)}
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
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="新邮箱"
                variant="outlined"
                fullWidth
                name="newemail"
                value={newEmail}
                onChange={handleChange}
              />
            </Grid>
            <Grid
              item
              xs={6}
              sx={{ alignSelf: 'center', alignContent: 'center' }}
            >
              <Button variant="contained" color="primary" onClick={handleClick}>
                添加邮箱
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}
