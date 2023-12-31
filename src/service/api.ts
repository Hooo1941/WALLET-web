import axios from 'axios';
axios.defaults.baseURL = '/wallet/api';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export async function register(option: RegisterStruct): Promise<number> {
  try {
    if (
      option.name === undefined ||
      option.name === '' ||
      option.password === undefined ||
      option.password === '' ||
      option.ssn === undefined ||
      option.ssn === '' ||
      option.email_address === undefined ||
      option.email_address === '' ||
      option.phone === undefined ||
      option.phone === ''
    )
      return Promise.reject('参数不可为空');
    const response = await axios.post<TokenResponse>('/register', option);
    console.log(response);
    if (response.data === undefined) return Promise.reject('服务器错误');
    if (response.data.status !== 0 || response.data.data === undefined)
      return Promise.reject(response.data.message ?? '服务器错误');
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function loginByPhone(option: LoginStruct): Promise<number> {
  try {
    if (option.info === undefined) return Promise.reject('请输入手机号');
    if (option.password === undefined) return Promise.reject('请输入密码');
    const response = await axios.post<TokenResponse>('/loginByPhone', option);
    if (response.data === undefined) return Promise.reject('服务器错误');
    if (response.data.status !== 0 || response.data.data === undefined)
      return Promise.reject(response.data.message ?? '服务器错误');
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function loginByEmail(option: LoginStruct): Promise<number> {
  try {
    if (option.info === undefined) return Promise.reject('请输入邮箱');
    if (option.password === undefined) return Promise.reject('请输入密码');
    const response = await axios.post<TokenResponse>('/loginByEmail', option);
    if (response.data === undefined) return Promise.reject('服务器错误');
    if (response.data.status !== 0 || response.data.data === undefined)
      return Promise.reject(response.data.message ?? '服务器错误');
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function updateUserInfo(
  option: updateUserInfoStruct
): Promise<updateUserInfo> {
  try {
    if (option.user_id === undefined)
      return Promise.reject('登录状态失效，请重新登录');
    if (option.oldPassword === undefined) return Promise.reject('请输入旧密码');
    const response = await axios.post<updateUserInfoResponse>(
      '/updateUserInfo',
      option
    );
    if (response.data === undefined) return Promise.reject('服务器错误');
    if (response.data.status !== 0 || response.data.data === undefined)
      return Promise.reject(response.data.message ?? '服务器错误');
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function updateEmailInfo(
  option: updateEmailInfoStruct
): Promise<updateEmailInfo> {
  try {
    if (option.user_id === undefined)
      return Promise.reject('登录状态失效，请重新登录');
    if (option.password === undefined) return Promise.reject('请输入密码');
    if (option.email_address === undefined) return Promise.reject('请输入邮箱');
    const response = await axios.post<updateEmailInfoResponse>(
      '/updateEmailInfo',
      option
    );
    if (response.data === undefined) return Promise.reject('服务器错误');
    if (response.data.status !== 0 || response.data.data === undefined)
      return Promise.reject(response.data.message ?? '服务器错误');
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function updatePhoneInfo(
  option: updatePhoneInfoStruct
): Promise<updatePhoneInfo> {
  try {
    if (option.user_id === undefined)
      return Promise.reject('登录状态失效，请重新登录');
    if (option.password === undefined) return Promise.reject('请输入密码');
    if (option.phone_number === undefined)
      return Promise.reject('请输入手机号');
    if (option.isAddPhone === undefined) return Promise.reject('系统错误');
    const response = await axios.post<updatePhoneInfoResponse>(
      '/updatePhoneInfo',
      option
    );
    if (response.data === undefined) return Promise.reject('服务器错误');
    if (response.data.status !== 0 || response.data.data === undefined)
      return Promise.reject(response.data.message ?? '服务器错误');
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function profile(option: ProfileStruct): Promise<Profile> {
  try {
    if (option.user_id === undefined)
      return Promise.reject('登录状态失效，请重新登录');
    const response = await axios.post<ProfileResponse>(
      '/getPersonalInfoByUserId',
      option
    );
    if (response.data === undefined) return Promise.reject('服务器错误');
    if (response.data.status !== 0 || response.data.data === undefined)
      return Promise.reject(response.data.message ?? '服务器错误');
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function addBankInfo(
  option: addBankInfoStruct
): Promise<addBankInfo> {
  try {
    if (option.user_id === undefined)
      return Promise.reject('登录状态失效，请重新登录');
    const response = await axios.post<addBankInfoResponse>(
      '/addBankInfo',
      option
    );
    if (response.data === undefined) return Promise.reject('服务器错误');
    if (response.data.status !== 0 || response.data.data === undefined)
      return Promise.reject(response.data.message ?? '服务器错误');
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function removeBankInfo(
  option: removeBankInfoStruct
): Promise<removeBankInfo> {
  try {
    if (option.user_id === undefined)
      return Promise.reject('登录状态失效，请重新登录');
    const response = await axios.post<removeBankInfoResponse>(
      '/removeBankInfo',
      option
    );
    if (response.data === undefined) return Promise.reject('服务器错误');
    if (response.data.status !== 0 || response.data.data === undefined)
      return Promise.reject(response.data.message ?? '服务器错误');
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getAccountByUserId(
  option: ProfileStruct
): Promise<getAccountByUserId> {
  try {
    if (option.user_id === undefined)
      return Promise.reject('登录状态失效，请重新登录');
    const response = await axios.post<getAccountByUserIdResponse>(
      '/getAccountByUserId',
      option
    );
    if (response.data === undefined) return Promise.reject('服务器错误');
    if (response.data.status !== 0 || response.data.data === undefined)
      return Promise.reject(response.data.message ?? '服务器错误');
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function changePrimaryAccount(
  option: changePrimaryAccountStruct
): Promise<changePrimaryAccount> {
  try {
    if (option.user_id === undefined)
      return Promise.reject('登录状态失效，请重新登录');
    const response = await axios.post<changePrimaryAccountResponse>(
      '/changePrimaryAccount',
      option
    );
    if (response.data === undefined) return Promise.reject('服务器错误');
    if (response.data.status !== 0 || response.data.data === undefined)
      return Promise.reject(response.data.message ?? '服务器错误');
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function transaction(
  option: transactionStruct
): Promise<transaction> {
  try {
    if (option.user_id === undefined)
      return Promise.reject('登录状态失效，请重新登录');
    const response = await axios.post<transactionResponse>(
      '/transaction',
      option
    );
    if (response.data === undefined) return Promise.reject('服务器错误');
    if (response.data.status !== 0 || response.data.data === undefined)
      return Promise.reject(response.data.message ?? '服务器错误');
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function transactionPerMon(
  option: transactionPerMonStruct
): Promise<transactionPerMon> {
  try {
    if (option.user_id === undefined)
      return Promise.reject('登录状态失效，请重新登录');
    const response = await axios.post<transactionPerMonResponse>(
      '/searchTransactionPerMonth',
      option
    );
    if (response.data === undefined) return Promise.reject('服务器错误');
    if (response.data.status !== 0 || response.data.data === undefined)
      return Promise.reject(response.data.message ?? '服务器错误');
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function transactionBySsn(
  option: transactionBySsnStruct
): Promise<transactionBySsn> {
  try {
    if (option.user_id === undefined)
      return Promise.reject('登录状态失效，请重新登录');
    const response = await axios.post<transactionBySsnResponse>(
      '/searchTransactionBySSN',
      option
    );
    if (response.data === undefined) return Promise.reject('服务器错误');
    if (response.data.status !== 0 || response.data.data === undefined)
      return Promise.reject(response.data.message ?? '服务器错误');
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function transactionByEmail(
  option: transactionByEmailStruct
): Promise<transactionByEmail> {
  try {
    if (option.user_id === undefined)
      return Promise.reject('登录状态失效，请重新登录');
    const response = await axios.post<transactionByEmailResponse>(
      '/searchTransactionByEmail',
      option
    );
    if (response.data === undefined) return Promise.reject('服务器错误');
    if (response.data.status !== 0 || response.data.data === undefined)
      return Promise.reject(response.data.message ?? '服务器错误');
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function transactionByPhone(
  option: transactionByPhoneStruct
): Promise<transactionByPhone> {
  try {
    if (option.user_id === undefined)
      return Promise.reject('登录状态失效，请重新登录');
    const response = await axios.post<transactionByPhoneResponse>(
      '/searchTransactionByPhone',
      option
    );
    if (response.data === undefined) return Promise.reject('服务器错误');
    if (response.data.status !== 0 || response.data.data === undefined)
      return Promise.reject(response.data.message ?? '服务器错误');
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function transactionByDateRange(
  option: transactionByDateRangeStruct
): Promise<transactionByDateRange> {
  try {
    if (option.user_id === undefined)
      return Promise.reject('登录状态失效，请重新登录');
    const response = await axios.post<transactionByDateRangeResponse>(
      '/searchTransactionByDateRange',
      option
    );
    if (response.data === undefined) return Promise.reject('服务器错误');
    if (response.data.status !== 0 || response.data.data === undefined)
      return Promise.reject(response.data.message ?? '服务器错误');
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function transactionCancelledStaStruct(
  option: transactionCancelledStaStruct
): Promise<transactionCancelledSta> {
  try {
    if (option.user_id === undefined)
      return Promise.reject('登录状态失效，请重新登录');
    const response = await axios.post<transactionCancelledStaResponse>(
      '/', // TODO
      option
    );
    if (response.data === undefined) return Promise.reject('服务器错误');
    if (response.data.status !== 0 || response.data.data === undefined)
      return Promise.reject(response.data.message ?? '服务器错误');
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function transactionCancelledSta(
  option: transactionCancelledStaStruct
): Promise<transactionCancelledSta> {
  try {
    if (option.user_id === undefined)
      return Promise.reject('登录状态失效，请重新登录');
    const response = await axios.post<transactionCancelledStaResponse>(
      '/searchTransactionCancelled',
      option
    );
    if (response.data === undefined) return Promise.reject('服务器错误');
    if (response.data.status !== 0 || response.data.data === undefined)
      return Promise.reject(response.data.message ?? '服务器错误');
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function transactionCancel(
  option: transactionCancelStruct
): Promise<transactionCancel> {
  try {
    if (option.user_id === undefined)
      return Promise.reject('登录状态失效，请重新登录');
    const response = await axios.post<transactionCancelResponse>(
      '/CancelTransaction',
      option
    );
    if (response.data === undefined) return Promise.reject('服务器错误');
    if (response.data.status !== 0 || response.data.data === undefined)
      return Promise.reject(response.data.message ?? '服务器错误');
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function transactionBestSeller(
  option: transactionBestSellerStruct
): Promise<transactionBestSeller> {
  try {
    if (option.user_id === undefined)
      return Promise.reject('登录状态失效，请重新登录');
    const response = await axios.post<transactionBestSellerResponse>(
      '/searchBestSeller',
      option
    );
    if (response.data === undefined) return Promise.reject('服务器错误');
    if (response.data.status !== 0 || response.data.data === undefined)
      return Promise.reject(response.data.message ?? '服务器错误');
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function request(option: requestStruct): Promise<void> {
  try {
    if (option.user_id === undefined)
      return Promise.reject('登录状态失效，请重新登录');
    const response = await axios.post<requestResponse>(
      '/requestFromGroup',
      option
    );
    if (response.data === undefined) return Promise.reject('服务器错误');
    if (response.data.status !== 0)
      return Promise.reject(response.data.message ?? '服务器错误');
    return;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function allRequest(
  option: allRequestStruct
): Promise<allRequest> {
  try {
    if (option.user_id === undefined)
      return Promise.reject('登录状态失效，请重新登录');
    const response = await axios.post<allRequestResponse>(
      '/searchGroupRequestByUserId',
      option
    );
    if (response.data === undefined) return Promise.reject('服务器错误');
    if (response.data.status !== 0 || response.data.data === undefined)
      return Promise.reject(response.data.message ?? '服务器错误');
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function queryRequest(
  option: queryRequestStruct
): Promise<queryRequest> {
  try {
    const response = await axios.post<queryRequestResponse>(
      '/searchGroupContributionByRequestId',
      option
    );
    if (response.data === undefined) return Promise.reject('服务器错误');
    if (response.data.status !== 0 || response.data.data === undefined)
      return Promise.reject(response.data.message ?? '服务器错误');
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function needRequest(
  option: needRequestStruct
): Promise<needRequest> {
  try {
    if (option.user_id === undefined)
      return Promise.reject('登录状态失效，请重新登录');
    const response = await axios.post<needRequestResponse>(
      '/searchGroupRequestBySenderId',
      option
    );
    if (response.data === undefined) return Promise.reject('服务器错误');
    if (response.data.status !== 0 || response.data.data === undefined)
      return Promise.reject(response.data.message ?? '服务器错误');
    return response.data.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function contribute(option: contributeStruct): Promise<void> {
  try {
    if (option.user_id === undefined)
      return Promise.reject('登录状态失效，请重新登录');
    const response = await axios.post<contributeResponse>(
      '/sendForGroup',
      option
    );
    if (response.data === undefined) return Promise.reject('服务器错误');
    if (response.data.status !== 0)
      return Promise.reject(response.data.message ?? '服务器错误');
    return;
  } catch (error) {
    return Promise.reject(error);
  }
}
