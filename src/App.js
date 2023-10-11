// // without await
// const s = fetch()
// s.then(resp => {

// })

// // with await
// const resp = await fetch()

import { Button, Card, Input, Layout, List, message } from "antd";
import { useState } from "react";
import { getContractNFTs } from "./utils";
import "./App.css";
import NftCard from "./components/NftCard";
import ContractTrades from "./components/ContractTrades";

const { Header, Content } = Layout;

function App() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");

  // 处理点击search的funcdtion
  const handleSearch = async () => {
    if (searchText === "") {
      return;
    }

    setLoading(true);

    try {
      const data = await getContractNFTs(searchText);
      setNfts(data.result);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Header>
        <div style={{ fontSize: 16, fontWeight: 600, color: "white" }}>
          NFT Browser
        </div>
      </Header>
      <Content
        style={{ height: "calc(100% - 64px)", padding: 20, overflowY: "auto" }}
        // 100% - 64px 是parent element的100% -64px是减去Header的高度
      >
        <Input.Group compact>
          <Input
            style={{ width: 500 }}
            placeholder="Enter a NFT contract address to search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            // onChange 是一个控制组件 also a call-back function
          />
          <Button type="primary" onClick={handleSearch}>
            Search
          </Button>
          <ContractTrades tokenAddress={searchText} />
        </Input.Group>
        <List
          loading={loading}
          style={{
            marginTop: 20,
            height: "calc(100% - 52px)",
            overflow: "auto",
          }}
          // grid 仅仅是视觉效果
          // <List /> 是单封口，里面什么都没包，仅仅放数据
          grid={{
            gutter: 16,
            xs: 1,
            sm: 3,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 4,
          }}
          dataSource={nfts}
          // renderItem 是数据源怎么展示，如果数组是三个，函数运行三遍
          renderItem={(nft) => <NftCard nft={nft} />}
          // component 通过props接收数据 for example: nft on the left is one prop
        />
      </Content>
    </Layout>
  );
}

export default App;
