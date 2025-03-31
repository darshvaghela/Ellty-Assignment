import { Card, Checkbox, Button, Layout } from "antd";
import { useState } from "react";
import { Flex } from "../components/flex";

const pages = ["Page 1", "Page 2", "Page 3", "Page 4"];

const Home = () => {
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const allSelected = selectedPages.length === pages.length;

  const handleSelectAll = (checked: boolean) => {
    setSelectedPages(checked ? pages : []);
  };

  const handleSelectPage = (page: string, checked: boolean) => {
    setSelectedPages(
      checked
        ? [...selectedPages, page]
        : selectedPages.filter((p) => p !== page)
    );
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Flex
        $justifyContent="center"
        $alignItems="center"
        $flexDirection="column"
        style={{
          minHeight: "80vh",
        }}
      >
        <Card
          style={{
            width: 370,
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <div className="checkbox-container">
            <span>All pages</span>
            <Checkbox
              checked={allSelected}
              onChange={(e) => handleSelectAll(e.target.checked)}
              className="custom-checkbox"
            />
          </div>
          <hr className="custom-hr" />
          {pages.map((page) => (
            <div key={page} className="checkbox-sub-container">
              <span>{page}</span>
              <Checkbox
                checked={selectedPages.includes(page)}
                onChange={(e) => handleSelectPage(page, e.target.checked)}
                className="custom-checkbox"
              />
            </div>
          ))}
          <hr className="custom-hr" />
          <Button
            type="primary"
            block
            style={{
              marginTop: 10,
            }}
            onClick={() => console.log(selectedPages)}
          >
            Done
          </Button>
        </Card>
      </Flex>
    </Layout>
  );
};

export default Home;
