import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
function Index() {
  const [nickname, setNickname] = useState('');
  useEffect(() => {
    setNickname(localStorage.getItem('nickname') ?? '');
  }, []);

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 5 }}>
        欢迎使用 WALLET {nickname !== '' ? ', ' + nickname : ''}
      </Typography>
    </div>
  );
}

export default Index;
