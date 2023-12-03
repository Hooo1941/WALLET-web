import { Button, Container, Grid } from '@mui/material';
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
    <Container sx={{ maxWidth: 'md' }}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        欢迎使用 WALLET
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3} sx={{ textAlign: 'center' }}>
          <Button size="large" href="/#/profile" variant="contained">
            钱包与个人信息
          </Button>
        </Grid>
        <Grid item xs={3} sx={{ textAlign: 'center' }}>
          <Button size="large" href="/#/send" variant="contained">
            给他人转账
          </Button>
        </Grid>
        <Grid item xs={3} sx={{ textAlign: 'center' }}>
          <Button size="large" href="/#/request" variant="contained">
            发起群收款
          </Button>
        </Grid>
        <Grid item xs={3} sx={{ textAlign: 'center' }}>
          <Button size="large" href="/#/myrequest" variant="contained">
            查看发起的群收款
          </Button>
        </Grid>
        <Grid item xs={3} sx={{ textAlign: 'center' }}>
          <Button size="large" href="/#/payrequest" variant="contained">
            需要支付的群收款
          </Button>
        </Grid>
        <Grid item xs={3} sx={{ textAlign: 'center' }}>
          <Button size="large" href="/#/statement" variant="contained">
            月度收支统计
          </Button>
        </Grid>
        <Grid item xs={3} sx={{ textAlign: 'center' }}>
          <Button size="large" href="/#/transaction" variant="contained">
            详细账单查询
          </Button>
        </Grid>
        <Grid item xs={3} sx={{ textAlign: 'center' }}>
          <Button
            size="large"
            variant="contained"
            onClick={() => {
              localStorage.removeItem('uid');
              location.reload();
            }}
          >
            退出WALLET
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Index;
