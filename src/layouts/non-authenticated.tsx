import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { FC, PropsWithChildren } from "react";
import { Flex } from "../components/flex";

export const NonAuthenticatedLayout: FC<PropsWithChildren> = ({ children }) => (
  <Layout style={{ minHeight: "100vh" }}>
    <Header
      style={{
        background: "#fff",
        padding: "0 24px",
        borderBottom: "1px solid #D1D1D1",
      }}
    >
      <Flex
        $justifyContent="space-between"
        $alignItems="center"
        $flexDirection="row"
      >
        <Flex $alignItems="center" $flexDirection="row">
          <img src="/logo.png" alt="Logo" style={{ height: 40 }} />
          <span style={{ fontSize: 16, fontWeight: 600, marginLeft: 8 }}>
            Monk Upsell & Cross-sell
          </span>
        </Flex>
      </Flex>
    </Header>

    <Content style={{ position: "relative", backgroundColor: "#fff" }}>
      <Flex
        $alignItems="center"
        $flexDirection="column"
        style={{ minHeight: "80vh" }}
      >
        {children}
      </Flex>
    </Content>
  </Layout>
);
