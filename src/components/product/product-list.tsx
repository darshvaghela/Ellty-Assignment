import { Divider, message, Modal } from "antd";
import React, { FC, useCallback, useEffect } from "react";

interface ProductListProps {
  drawerVisible: boolean;
  closeDrawer: () => void;
}
const ProductList: FC<ProductListProps> = ({ drawerVisible, closeDrawer }) => {
  //   const [products, setProducts] = React.useState<Product[]>([]);
  const [search] = React.useState<string>("");
  const [page] = React.useState<number>(1);
  const [limit] = React.useState<number>(10);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generateQueryString = (params: Record<string, any>) => {
    const queryString = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join("&");
    return queryString;
  };

  const getProducts = useCallback(async () => {
    try {
      const query = new URLSearchParams({
        search,
        page: String(page),
        limit: String(limit),
      });

      const response = await fetch(
        `http://stageapi.monkcommerce.app/task/products/search${generateQueryString(
          query
        )}`,
        {
          method: "GET",
          headers: {
            "x-api-key": "72njgfa948d9aS7gs5",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched products:", data);
      // Use the data as needed here
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error fetching products:", error);
      message.error(
        error.message || "Something went wrong while fetching products."
      );
    }
  }, [limit, page, search]);

  useEffect(() => {
    drawerVisible && getProducts();
  }, [drawerVisible, getProducts]);
  return (
    <Modal
      title="Select Product"
      open={drawerVisible}
      closeIcon
      onCancel={closeDrawer}
      width={700}
      style={{ padding: 0 }}
    >
      <Divider style={{ width: "100%", padding: 0 }} />
    </Modal>
  );
};

export default ProductList;
