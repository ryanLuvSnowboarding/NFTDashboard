import { Button, Modal, Skeleton, Table, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { InfoCircleOutlined } from "@ant-design/icons";
import { getNFTTransfers } from "../utils";

// columns 决定了table有几列 每列要怎么从data里拿数据
const columns = [
  {
    title: "Transfer DateTime",
    dataIndex: "block_timestamp",
    key: "block_timestamp",
    render: (value) => {
      return new Date(value).toLocaleString();
    },
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "From Address",
    dataIndex: "from_address",
    key: "from_address",
  },
  {
    title: "To Address",
    dataIndex: "to_address",
    key: "to_address",
  },
];

const ModalContent = ({ nft }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const { token_address, token_id } = nft;

  useEffect(() => {
    getNFTTransfers(token_address, token_id)
      .then((resp) => {
        setData(resp.result);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Skeleton active />;
  }

  return (
    <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
  );
};

const NftTransfers = ({ nft }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Tooltip是把鼠标放到Buttton上的时候会弹出文字 */}
      <Tooltip title="Transfer(s) on this NFT">
        <Button
          style={{ border: "none" }}
          size="large"
          shape="circle"
          icon={<InfoCircleOutlined />}
          onClick={() => setModalOpen(true)}
        />
      </Tooltip>
      <Modal
        width={1000}
        title="Transfer(s) List"
        destroyOnClose
        open={modalOpen}
        footer={null}
        onCancel={() => setModalOpen(false)}
      >
        <ModalContent nft={nft} />
      </Modal>
    </>
  );
};

export default NftTransfers;
