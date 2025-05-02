import { Button, Form, Input, Row, Space, Typography } from "antd";
import { Flex } from "../components/flex";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import ProductList from "../components/product/product-list";

const Home = () => {
  const [open, setOpen] = useState(false);
  return (
    <Flex $flexDirection="column">
      <Typography.Title level={2}>Add Products</Typography.Title>
      <Row>
        <Form layout="vertical">
          <Space align="end" size="large" style={{ flexWrap: "wrap" }}>
            <Form.Item label="Product">
              <Input
                readOnly
                addonBefore={<>1</>}
                suffix={<EditOutlined />}
                onFocus={(e) => {
                  e.target.blur();
                  setOpen(true);
                }}
              />
            </Form.Item>
            <Form.Item label="Discount">
              <Button type="primary">Add Discount</Button>
            </Form.Item>
          </Space>
        </Form>
        <ProductList open={open} onClose={() => setOpen(false)} />
      </Row>
      <Flex $justifyContent="flex-end" $alignItems="center">
        <Button type="default" size="large">
          Add Product
        </Button>
      </Flex>
    </Flex>
  );
};

export default Home;
