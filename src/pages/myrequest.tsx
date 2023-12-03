import { useEffect, useState } from 'react';
import {
  Paper,
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material';
import FeedIcon from '@mui/icons-material/Feed';
import Error from '../components/error';
import * as API from '../service/api';

export default function Request() {
  const uid = localStorage.getItem('uid');
  if (uid === null) return <div>未登录</div>;
  const [alert, setAlert] = useState<string>('');
  const [requests, setRequests] = useState<allRequest>([]);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState<queryRequest | null>(
    null
  );
  const handleViewDetails = (details: searchRequest) => {
    setDetailsDialogOpen(true);
    setSelectedDetails([
      {
        contribution_id: 1,
        contribution_amount: 1,
        sender_phone_number: '123',
        is_contributed: false,
      },
      {
        contribution_id: 2,
        contribution_amount: 2,
        sender_email: '123@qq.com',
        is_contributed: true,
      },
    ]);
    // API.queryRequest({ request_id: details.request_id })
    //   .then((res) => {
    //     setSelectedDetails(res);
    //     setDetailsDialogOpen(true);
    //   })
    //   .catch((err) => {
    //     setAlert(err.toString());
    //   });
  };
  const handleDetailsDialogClose = () => {
    setDetailsDialogOpen(false);
  };

  useEffect(() => {
    // TODO: delete
    setRequests([
      {
        request_id: 1,
        total_amount: 1,
        memo: 'test',
        request_time: Number(new Date()),
      },
    ]);
    API.allRequest({ user_id: +uid })
      .then((res) => {
        setRequests(res);
      })
      .catch((err) => {
        setAlert(err.toString());
      });
  }, []);

  return (
    <Container maxWidth="xl">
      <Error alert={alert} setAlert={setAlert} />
      <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom>
          已发起的收款
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>收款ID</TableCell>
              <TableCell>总金额</TableCell>
              <TableCell>备注</TableCell>
              <TableCell>收款时间</TableCell>
              <TableCell>详细信息</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((row) => (
              <TableRow key={row.request_id}>
                <TableCell>{row.request_id}</TableCell>
                <TableCell>{row.total_amount}</TableCell>
                <TableCell>{row.memo || ''}</TableCell>
                <TableCell>
                  {new Date(row.request_time).toLocaleString()}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="secondary"
                    onClick={() => handleViewDetails(row)}
                  >
                    <FeedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {detailsDialogOpen && (
          <Dialog
            open={selectedDetails !== null}
            onClose={handleDetailsDialogClose}
          >
            <DialogTitle>详细信息</DialogTitle>
            <DialogContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>付款人</TableCell>
                    <TableCell>需支付金额</TableCell>
                    <TableCell>是否付款</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedDetails !== null &&
                    selectedDetails.map((item) => (
                      <TableRow key={item.contribution_id}>
                        <TableCell>
                          {item.sender_phone_number || item.sender_email}
                        </TableCell>
                        <TableCell>{item.contribution_amount}</TableCell>
                        <TableCell>
                          {item.is_contributed ? '是' : '否'}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </DialogContent>
          </Dialog>
        )}
      </Paper>
    </Container>
  );
}
