import { Button, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
function Index() {
  const isLogined = localStorage.getItem('uid') ?? '' !== '';
  if (!isLogined)
    return (
      <div>
        <Typography variant="h4" sx={{ mb: 5 }}>
          欢迎使用 WALLET，请先登录或注册
        </Typography>
      </div>
    );
  return (
    <div>
      <Typography variant="h4" sx={{ mb: 5 }}>
        欢迎使用 WALLET
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4} sx={{ textAlign: 'center' }}>
          <Button size="large" href="/#/profile" variant="contained">
            钱包信息
          </Button>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'center' }}>
          <Button size="large" href="/#/send" variant="contained">
            转账
          </Button>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'center' }}>
          <Button size="large" href="/#/request" variant="contained">
            收款
          </Button>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'center' }}>
          <Button size="large" href="/#/statement" variant="contained">
            收支统计
          </Button>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'center' }}>
          <Button size="large" href="/#/transaction" variant="contained">
            账单查询
          </Button>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'center' }}>
          <Button size="large" href="/#/transaction" variant="contained">
            账单查询
          </Button>
        </Grid>
        {/* <Grid item xs={4} sx={{'textAlign': 'center'}}>
          <Button size="large" href="/#/transaction" variant="contained">
            注销账户
          </Button>
        </Grid> */}
      </Grid>
    </div>
  );
}

export default Index;
