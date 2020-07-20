import request from "@utils/request";

const BASE_URL = "/oauth";

// 获取菜单权限数据
export function reqGetVerifyCode(mobile) {
  console.log(mobile);
  return request({
    url: `${BASE_URL}/sign_in/digits`,
    method: "POST",
    data:{
        mobile
    }
  });
}
// 获取菜单权限数据 手机号码登录
export function reqMobileLogin(mobile, code) {
  return request({
    url: `${BASE_URL}/mobile`,
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}


