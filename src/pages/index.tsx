import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
function Index() {
  const [nickname, setNickname] = useState('');
  useEffect(() => {
    setNickname(localStorage.getItem('nickname') ?? '');
  }, []);
  const username = localStorage.getItem('username') ?? '';
  const isLogined = username !== '';
  if (!isLogined)
    return (
      <div>
        <Typography variant="h4" sx={{ mb: 5 }}>
          欢迎使用 WALLET
        </Typography>
      </div>
    );
  return (
    <div>
      <Typography variant="h4" sx={{ mb: 5 }}>
        欢迎使用 WALLET {', ' + nickname}
      </Typography>
      <Button href="/#/profile" variant="contained">
        账户信息
      </Button>
      <Button href="/#/send" variant="contained">
        转账
      </Button>
      <Button href="/#/request" variant="contained">
        收款
      </Button>
      <Button href="/#/statement" variant="contained">
        收支统计
      </Button>
      <Button href="/#/transaction" variant="contained">
        账单查询
      </Button>
      <Button href="/#/transaction" variant="contained">
        注销账户
      </Button>
      Send money (send money to a phone number or email address) Request money
      (request money from phone numbers and email addresses) Statements (total
      amount sent and received per month) Search Transactions (based on user
      SSN, email address, phone number, type of transaction, time_date range
      etc.)
    </div>
  );
}

export default Index;
