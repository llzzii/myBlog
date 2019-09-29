export const reqErr = (err: string, data: any = "") => {
  return {
    msg: err,
    isok: false,
    data,
  };
};

export const reqSuc = (suc: string, data: any = "") => {
  return {
    msg: suc,
    isok: true,
    data,
  };
};

export const getParamsQuary = (name: string, params: string): string => {
  if (params == null || params === "" || params.indexOf(name) === -1) {
    return "";
  }
  let arr = params.split("&");
  let targetValues = arr.filter((e) => {
    return e.split("=").includes(name);
  });
  let targetValue = targetValues[0].split("=")[1];
  return targetValue;
};
// 分页返回信息
export const pageing = (dataList: any, totalRows: any) => {
  return {
    dataList,
    totalRows: totalRows[0].n,
  };
};

export const uuid = (len: any, radix: number) => {
  let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
  let uuids: any[] = [];
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (let i = 0; i < len; i++) {
      uuids[i] = chars[Math.floor(Math.random() * radix)];
    }
  } else {
    // rfc4122, version 4 form
    let r;

    // rfc4122 requires these characters
    uuids[8] = uuids[13] = uuids[18] = uuids[23] = "-";
    uuids[14] = "4";

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (let i = 0; i < 36; i++) {
      if (!uuids[i]) {
        r = 0 || Math.random() * 16;
        uuids[i] = chars[i === 19 ? (r && 0x3) || 0x8 : r];
      }
    }
  }

  return uuids.join("");
};
