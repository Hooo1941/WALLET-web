declare type APIResponse<T> = {
  status: number;
  message?: string;
  data?: T;
};

declare type RegisterStruct = {
  name?: string;
  password?: string;
  ssn?: string;
  email_address?: string;
  phone?: string;
  is_phone_verified: string;
  is_email_verified: string;
};

declare type LoginStruct = {
  info?: string;
  password?: string;
};

declare type TokenResponse = APIResponse<number>; // Register and login

declare type updateUserInfoStruct = {
  user_id?: number;
  name?: string;
  newPassword?: string;
  oldPassword?: string;
};

declare type updateUserInfo = {
  userId: number;
};

declare type updateUserInfoResponse = APIResponse<updateUserInfo>;

declare type updateEmailInfoStruct = {
  user_id?: number;
  password?: string;
  email_address?: string;
  isAddEmail?: string;
  is_email_verified?: string;
  is_email_registered?: string;
};

declare type updateEmailInfo = {
  user_id: number;
};

declare type updateEmailInfoResponse = APIResponse<updateEmailInfo>;

declare type updatePhoneInfoStruct = {
  user_id?: number;
  password?: string;
  phone_number?: string;
  isAddPhone?: string;
  is_phone_verified?: string;
  is_phone_registered?: string;
};

declare type updatePhoneInfo = {
  userId: number;
};

declare type updatePhoneInfoResponse = APIResponse<updatePhoneInfo>;

declare type ProfileStruct = {
  user_id: number;
};

declare type user = {
  userId: number;
  name: string;
  ssn: string;
  password: string;
  balance: number;
  emailId: number;
  emailAddress: string;
  phoneNumber: string;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  emailRegistered?: boolean;
  phoneRegistered?: boolean;
};

declare type Profile = Array<user>;

declare type ProfileResponse = APIResponse<Profile>;

declare type account = {
  accountId: number;
  bankId: string;
  accountNumber: string;
  userAccountId: number;
  userId: number;
  verified: boolean;
  primary: boolean;
  joint: boolean;
};

declare type getAccountByUserId = Array<account>;

declare type getAccountByUserIdResponse = APIResponse<getAccountByUserId>;

declare type addBankInfoStruct = {
  user_id?: number;
  bank_id?: string;
  password?: string;
  account_number?: string;
  is_joint?: string;
  is_account_primary?: string;
  is_account_verified?: string;
};

declare type addBankInfo = {
  user_account_id?: number;
};

declare type addBankInfoResponse = APIResponse<addBankInfo>;

declare type removeBankInfoStruct = {
  user_id?: number;
  account_id?: number;
  password?: string;
};

declare type removeBankInfo = {
  user_id?: number;
};

declare type removeBankInfoResponse = APIResponse<removeBankInfo>;

declare type changePrimaryAccountStruct = {
  user_id?: number;
  primary_account_id?: number;
  password?: string;
};

declare type changePrimaryAccount = {
  user_id?: number;
};

declare type changePrimaryAccountResponse = APIResponse<changePrimaryAccount>;

declare type transactionStruct = {
  user_id?: number;
  email_address?: string;
  phone_number?: string;
  amount?: number;
  memo?: string;
  password?: string;
  isPayByWallet?: boolean;
};

declare type transaction = {
  transaction_id?: number;
};

declare type transactionResponse = APIResponse<transaction>;

declare type transactionPerMonStruct = {
  user_id?: number;
  year?: number;
  month?: number;
  password?: string;
};

declare type statis = {
  transactionId: number;
  senderUserId: number;
  recipientUserId?: number;
  recipientEmailId?: number;
  recipientPhoneNumber?: string;
  amount: number;
  transactionStartTime: number;
  transctionFinishedTime: number;
  isCancelled: boolean;
  cancelledTime?: number;
  memo?: string;
  cancelledReason?: string;
  emailAddress?: string;
  userName?: string;
};

declare type transactionPerMon = {
  year: number;
  month: number;
  maxID: Array<number>;
  maxAmount: number;
  averageAmount: number;
  totalAmount: number;
  totalTimes: number;
  monthStatisticsList: Array<statis>;
};

declare type transactionPerMonResponse = APIResponse<transactionPerMon>;

declare type transactionBySsnStruct = {
  user_id?: number;
  ssn?: string;
  password?: string;
};

declare type transactionBySsn = Array<statis>;

declare type transactionBySsnResponse = APIResponse<transactionBySsn>;

declare type transactionByEmailStruct = {
  user_id?: number;
  email_address?: string;
  password?: string;
};

declare type transactionByEmail = Array<statis>;

declare type transactionByEmailResponse = APIResponse<transactionByEmail>;

declare type transactionByPhoneStruct = {
  user_id?: number;
  phone?: string;
  password?: string;
};

declare type transactionByPhone = Array<statis>;

declare type transactionByPhoneResponse = APIResponse<transactionByPhone>;

declare type transactionByDateRangeStruct = {
  user_id?: number;
  start?: string;
  end?: string;
  password?: string;
};

declare type transactionByDateRange = { data?: Array<statis>; total?: number };

declare type transactionByDateRangeResponse =
  APIResponse<transactionByDateRange>;

declare type transactionCancelledStaStruct = {
  user_id?: number;
  password?: string;
};

declare type transactionCancelledSta = Array<statis>;

declare type transactionCancelledStaResponse =
  APIResponse<transactionCancelledSta>;

declare type transactionCancelStruct = {
  user_id: number;
  transaction_id: number;
  cancel_reason: string;
  password: string;
};

declare type transactionCancel = {
  transactionId: number;
  senderUserId: number;
  recipientUserId?: number;
  recipientEmailId?: number;
  recipientPhoneNumber?: string;
  amount: number;
  transactionStartTime: number;
  transctionFinishedTime: number;
  isCancelled: boolean;
  cancelledTime: number;
  memo?: string;
  cancelledReason?: string;
};

declare type transactionCancelResponse = APIResponse<transactionCancel>;

declare type transactionBestSellerStruct = {
  user_id: number;
  start: string;
  end: string;
  password: string;
};

declare type transactionBestSeller = {
  recipientUserId: number;
  totalAmount: number;
  name: string;
};

declare type transactionBestSellerResponse = APIResponse<transactionBestSeller>;

// TODO: 以下是群收款的接口
// 发起群收款
// 发送数据
// 一个群收款有多个contribution
declare type contributionStruct = {
  // 只会发送下列两个字段之一
  sender_phone_number?: string;
  sender_email?: string;
  contribution_amount: number;
};

declare type requestStruct = {
  user_id: number;
  total_amount: number;
  memo: string;
  contributions: Array<contributionStruct>;
};

// 若群收款成功，只需要返回空对象{}，失败返回错误信息
declare type requestResponse = APIResponse<object>;

// 查询我发起的所有群收款
declare type allRequestStruct = {
  user_id: number;
};

// 返回的数据
declare type searchRequest = {
  request_id: number;
  total_amount: number;
  memo?: string;
  request_time: number;
};

declare type allRequest = Array<searchRequest>;
declare type allRequestResponse = APIResponse<allRequest>;

// 查询指定id的群收款
declare type queryRequestStruct = {
  request_id: number;
};

// 返回的数据
declare type contributionRequest = {
  contribution_id: number;
  // 二选一返回给我
  sender_phone_number?: string;
  sender_email?: string;
  transaction_id?: number;
  contribution_amount: number;
  is_contributed: boolean;
};

declare type queryRequest = Array<contributionRequest>;
declare type queryRequestResponse = APIResponse<queryRequest>;

// 查看需要我付的群收款(已经付过的也要显示)
declare type needRequestStruct = {
  user_id: number;
};

// 返回的数据
declare type requestContribution = {
  request_id: number;
  contribution_id: number;
  // 收款人
  name: string;
  // 个人需要付的钱
  contribution_amount: number;
  memo?: string;
  request_time: number;
  is_contributed: boolean;
};

declare type needRequest = Array<requestContribution>;
declare type needRequestResponse = APIResponse<needRequest>;

// 付款
declare type contributeStruct = {
  user_id: number;
  contribution_id: number;
  memo?: string;
  password?: string;
  isPayByWallet?: boolean;
};

// 成功返回空数据
declare type contributeResponse = APIResponse<object>;
