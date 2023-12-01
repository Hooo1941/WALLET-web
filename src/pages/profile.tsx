import { useState, useEffect } from 'react';
import * as API from '../service/api';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Error from '../components/error';
import Container from '@mui/material/Container';

type baseUser = {
  name?: string;
  ssn?: string;
  balance?: number;
  phoneNumber?: string;
  password?: string;
};

function Profile() {
  const uid = localStorage.getItem('uid');
  if (uid === null) return <div>未登录</div>;
  const [alert, setAlert] = useState<string>('');
  const [result, setResult] = useState<baseUser>();
  const [oldPassword, setOldPassword] = useState<string>('');
  const [oldPhone, setOldPhone] = useState<string>('');
  useEffect(() => {
    setResult({ name: 'test', ssn: '123', balance: 100.0, phoneNumber: '1' });
    setOldPassword('123');
    API.profile({
      user_id: +uid,
    })
      .then((res) => {
        setOldPassword(res.users[0].password);
        setResult({
          name: res.users[0].name,
          ssn: res.users[0].ssn,
          balance: res.users[0].balance,
          phoneNumber: res.users[0].phoneNumber,
        });
        setOldPhone(res.users[0].phoneNumber);
      })
      .catch((res) => setAlert(res.toString()));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'ssn' || name === 'balance') return;
    setResult((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSumbit = () => {
    API.updateUserInfo({
      user_id: +(uid ?? '0'),
      name: result?.name,
      oldPassword: oldPassword,
      newPassword: result?.password,
    })
      .then((res) => {
        console.log(res);
        API.updatePhoneInfo({
          user_id: +(uid ?? '0'),
          phone_number: oldPhone,
          password: result?.password,
          isAddPhone: 'false',
          is_phone_verified: 'true',
          is_phone_registered: 'true',
        });
      })
      .then((res) => {
        console.log(res);
        setAlert('修改成功');
        API.updatePhoneInfo({
          user_id: +(uid ?? '0'),
          phone_number: result?.phoneNumber,
          password: result?.password,
          isAddPhone: 'true',
          is_phone_verified: 'true',
          is_phone_registered: 'true',
        });
      })
      .catch((res) => setAlert(res.toString()));
  };

  return (
    <Container maxWidth="md">
      <Error alert={alert} setAlert={setAlert} />
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom>
          钱包信息
        </Typography>
        <br />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSumbit();
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="姓名"
                variant="outlined"
                fullWidth
                name="name"
                value={result?.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="SSN"
                variant="outlined"
                fullWidth
                name="ssn"
                value={result?.ssn}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="余额"
                variant="outlined"
                fullWidth
                name="balance"
                value={result?.balance}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="手机号"
                variant="outlined"
                fullWidth
                name="phoneNumber"
                value={result?.phoneNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="新密码"
                variant="outlined"
                fullWidth
                name="password"
                type="password"
                value={result?.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid
              item
              xs={6}
              sx={{ alignSelf: 'center', alignContent: 'center' }}
            >
              <Button type="submit" variant="contained" color="primary">
                修改信息
              </Button>
            </Grid>
          </Grid>
        </form>
        <br />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          href="/#/email"
        >
          查看邮箱
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          type="submit"
          variant="contained"
          color="primary"
          href="/#/bankcard"
        >
          查看银行卡
        </Button>
      </Paper>
    </Container>
  );
}

export default Profile;
