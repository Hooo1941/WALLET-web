import { useState, useEffect } from 'react';
import * as API from '../service/api';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

type baseUser = {
  name?: string;
  ssn?: string;
  balance?: number;
  phoneNumber?: string;
  password?: string;
};

function Profile() {
  const uid = localStorage.getItem('uid');
  const [result, setResult] = useState<baseUser>();
  const [oldPassword, setOldPassword] = useState<string>('');
  useEffect(() => {
    setResult({ name: 'test', ssn: '123', balance: 100.0, phoneNumber: '1' });
    // API.profile({
    //   token: token == null ? '' : token,
    // })
    //   .then((res) => {
    //     setResult(res);
    //   })
    //   .catch((res) => console.log(res));
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === 'ssn' || name === 'balance') return;
    setResult((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSumbit = () => {
    API.updateUserInfo({
      user_id: +uid!,
      name: result?.name,
      oldPassword: oldPassword,
      newPassword: result?.password,
    })
      .then((res) => console.log(res))
      .catch((res) => console.log(res));
  };

  return (
    <div>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom>
          用户信息
        </Typography>
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
                value={result?.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Button type="submit" variant="contained" color="primary">
                修改信息
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}

export default Profile;
