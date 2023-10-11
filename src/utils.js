// const origin = protocal - domain - port (protocal(like http), domain是域名，port可以写，不写是default）
const origin = "https://deep-index.moralis.io";
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImNmMzMwYjgwLThiYzItNDNmNS04NDk5LThlZWZiY2FmMWM1YyIsIm9yZ0lkIjoiMzU4NDYzIiwidXNlcklkIjoiMzY4NDAxIiwidHlwZUlkIjoiNjg1YWQxNjctNzRhYy00ZDRkLTllM2YtNjEwM2MyZDJkZjUxIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2OTU0ODgxNDMsImV4cCI6NDg1MTI0ODE0M30.IJ3boiVJvBppzazJUTPXgorr4_4-16WI5_J4d7-3P5M";
// async 是和 await配合使用的，in replace of using .then()
export const getContractNFTs = async (tokenAddress) => {
  // 手动拼接容易出错，是用URL class拼接url
  const url = new URL(`${origin}/api/v2/nft/${tokenAddress}`);
  // below 是url上携带参数的部分
  url.searchParams.append("chain", "eth");
  url.searchParams.append("format", "decimal");
  url.searchParams.append("limit", "20");

  // above是组装一个完成的url
  // below发送url request
  //param1 是请求目的地，param2是请求头(因为我们是请求端),前端（client)提出请求
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "X-API-KEY": apiKey,
    },
  });
  //   不能直接返回response， 不然UI看不懂，得解析成json格式
  return response.json();
};

export const getContractTrades = async (tokenAddress) => {
  const url = new URL(`${origin}/api/v2/nft/${tokenAddress}/trades`);
  url.searchParams.append("chain", "eth");
  url.searchParams.append("marketplace", "opensea");
  url.searchParams.append("limit", "20");

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "X-API-KEY": apiKey,
    },
  });
  return response.json();
};

export const getNFTTransfers = async (tokenAddress, tokenId) => {
  const url = new URL(
    `${origin}/api/v2/nft/${tokenAddress}/${tokenId}/transfers`
  );
  url.searchParams.append("chain", "eth");
  url.searchParams.append("format", "decimal");
  url.searchParams.append("limit", "20");

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "X-API-KEY": apiKey,
    },
  });
  return response.json();
};
