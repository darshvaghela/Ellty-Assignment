import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "../constants/routes";
import { Flex } from "../components/flex";

const PageNotFound = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate(ROUTES.root);
  };

  return (
    <Flex style={{ width: "100%" }} $justifyContent="center">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, page not found :("
        extra={
          <Button type="primary" onClick={goToHome}>
            Back to Home
          </Button>
        }
      />
    </Flex>
  );
};

export default PageNotFound;
