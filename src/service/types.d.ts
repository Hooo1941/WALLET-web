type APIResponse<T> = {
  status: number;
  message?: string;
  data?: T;
};

type RegisterStruct = {
  name?: string;
  password?: string;
  ssn?: string;
  email_address?: string;
  phone?: string;
  is_phone_verified: string;
  is_email_verified: string;
};

type LoginStruct = {
  info?: string;
  password?: string;
};

type TokenResponse = APIResponse<number>; // Register and login

type updateUserInfoStruct = {
  user_id?: number;
  name?: string;
  newPassword?: string;
  oldPassword?: string;
};

type updateUserInfo = {
  userId: number;
};

type updateUserInfoResponse = APIResponse<updateUserInfo>;

type updateEmailInfoStruct = {
  user_id?: number;
  password?: string;
  email_address?: string;
  isAddEmail?: string;
  is_email_verified?: string;
  is_email_registered?: string;
};

type updateEmailInfo = {
  user_id: number;
};

type updateEmailInfoResponse = APIResponse<updateEmailInfo>;

type updatePhoneInfoStruct = {
  user_id?: number;
  password?: string;
  phone_number?: string;
  isAddPhone?: string;
  is_phone_verified?: string;
  is_phone_registered?: string;
};

type updatePhoneInfo = {
  userId: number;
};

type updatePhoneInfoResponse = APIResponse<updatePhoneInfo>;

type ProfileStruct = {
  user_id: number;
};

type user = {
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

type Profile = {
  users: Array<user>;
}; // getPersonalInfoByUserId

type ProfileResponse = APIResponse<Profile>;

type account = {
  accountId: number;
  bankId: string;
  accountNumber: string;
  userAccountId: number;
  userId: number;
  verified: boolean;
  primary: boolean;
  joint: boolean;
};

type getAccountByUserId = {
  accounts: Array<account>;
};

type getAccountByUserIdResponse = APIResponse<getAccountByUserId>;

type addBankInfoStruct = {
  user_id?: number;
  bank_id?: string;
  password?: string;
  account_number?: string;
  is_joint?: string;
  is_account_primary?: string;
  is_account_verified?: string;
};

type addBankInfo = {
  user_account_id?: number;
};

type addBankInfoResponse = APIResponse<addBankInfo>;

type removeBankInfoStruct = {
  user_id?: number;
  account_id?: number;
  password?: string;
};

type removeBankInfo = {
  user_id?: number;
};

type removeBankInfoResponse = APIResponse<removeBankInfo>;

type changePrimaryAccountStruct = {
  user_id?: number;
  primary_account_id?: number;
  password?: string;
};

type changePrimaryAccount = {
  user_id?: number;
};

type changePrimaryAccountResponse = APIResponse<changePrimaryAccount>;

type transactionStruct = {
  user_id?: number;
  email_address?: string;
  phone_number?: string;
  amount?: number;
  memo?: string;
  password?: string;
  isPayByWallet?: boolean;
};

type transaction = {
  transaction_id?: number;
};

type transactionResponse = APIResponse<transaction>;

type transactionPerMonStruct = {
  user_id?: number;
  year?: number;
  month?: number;
  password?: string;
};

type statis = {
  transactionId: number;
  senderUserId: number;
  recipientUserId?: number;
  recipientEmailId?: number;
  recipientPhoneNumber?: string;
  amount: number;
  transactionStartTime: Date;
  transctionFinishedTime: Date;
  isCancelled: boolean;
  cancelledTime?: Date;
  memo?: string;
  cancelledReason?: string;
};

type transactionPerMon = {
  year: number;
  month: number;
  maxID: Array<number>;
  maxAmount: number;
  averageAmount: number;
  totalAmount: number;
  totalTimes: number;
  monthStatisticsList: Array<statis>;
};

type transactionPerMonResponse = APIResponse<transactionPerMon>;

type transactionBySsnStruct = {
  user_id?: number;
  ssn?: string;
  password?: string;
};

type transactionBySsn = {
  SsnStatisticsList?: Array<statis>;
};

type transactionBySsnResponse = APIResponse<transactionBySsn>;

type transactionByEmailStruct = {
  user_id?: number;
  email_address?: string;
  password?: string;
};

type transactionByEmail = {
  EmailStatisticsList?: Array<statis>;
};

type transactionByEmailResponse = APIResponse<transactionByEmail>;

type transactionByPhoneStruct = {
  user_id?: number;
  phone?: string;
  password?: string;
};

type transactionByPhone = {
  EmailStatisticsList?: Array<statis>;
};

type transactionByPhoneResponse = APIResponse<transactionByPhone>;

type transactionByDateRangeStruct = {
  user_id?: number;
  start?: string;
  end?: string;
  password?: string;
};

type transactionByDateRange = {
  DateRangeStatisticsList?: Array<statis>;
};

type transactionByDateRangeResponse = APIResponse<transactionByDateRange>;

type transactionCancelledStaStruct = {
  user_id?: number;
  password?: string;
};

type transactionCancelledSta = {
  CancelledStatisticsList?: Array<statis>;
};

type transactionCancelledStaResponse = APIResponse<transactionCancelledSta>;

type transactionCancelStruct = {
  user_id: number;
  transaction_id: number;
  cancel_reason: string;
  password: string;
};

type transactionCancel = {
  transactionId: number;
  senderUserId: number;
  recipientUserId?: number;
  recipientEmailId?: number;
  recipientPhoneNumber?: string;
  amount: number;
  transactionStartTime: Date;
  transctionFinishedTime: Date;
  isCancelled: boolean;
  cancelledTime: Date;
  memo?: string;
  cancelledReason?: string;
};

type transactionCancelResponse = APIResponse<transactionCancel>;

type transactionBestSellerStruct = {
  user_id: number;
  start: string;
  end: string;
  password: string;
};

type seller = {
  transactionId: number;
  senderUserId: number;
  recipientUserId?: number;
  emailAddress?: string;
  phoneNumber?: string;
  amount: number;
};

type transactionBestSeller = {
  BestSellerList?: Array<seller>;
};

type transactionBestSellerResponse = APIResponse<transactionBestSeller>;

// TODO: 以下是群收款的接口
// 发起群收款
// 发送数据
// 一个群收款有多个contribution
type contributionStruct = {
  // 只会发送下列两个字段之一
  sender_phone_number?: string;
  sender_email?: string;
  contribution_amount: number;
};

type requestStruct = {
  user_id: number;
  total_amount: number;
  memo: string;
  contributions: Array<contributionStruct>;
};

// 若群收款成功，只需要返回空对象{}，失败返回错误信息
type requestResponse = APIResponse<object>;

// 查询我发起的所有群收款
type allRequestStruct = {
  user_id: number;
};

// 返回的数据
type searchRequest = {
  request_id: number;
  total_amount: number;
  memo?: string;
  request_time: Date;
};
type allRequestResponse = APIResponse<Array<searchRequest>>;

// 查询指定id的群收款
type queryRequestStruct = {
  request_id: number;
};

// 返回的数据
type queryRequest = {
  contribution_id: number;
  // 二选一返回给我
  sender_phone_number?: string;
  sender_email?: string;
  transaction_id: number;
  contribution_amount: number;
  is_contributed: boolean;
};

type queryRequestResponse = APIResponse<Array<queryRequest>>;

// 付款
type contributeStruct = {
  user_id: number;
  contribution_id: number;
  memo?: string;
  password?: string;
  isPayByWallet?: boolean;
};

// 成功返回空数据
type contributeResponse = APIResponse<object>;
