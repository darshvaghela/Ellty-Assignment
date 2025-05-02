import { Button, Form, Input, Row, Select, Space, Typography } from "antd";
import { Flex } from "../components/flex";
import { EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import ProductList from "../components/product/product-list";
import { SelectedItem } from "../type/product";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<SelectedItem[]>([]);
  const [variantsVisibility, setVariantsVisibility] = useState<boolean[]>([]); 

  const toggleVariantsVisibility = (index: number) => {
    const updatedVisibility = [...variantsVisibility];
    updatedVisibility[index] = !updatedVisibility[index]; 
    setVariantsVisibility(updatedVisibility);
  };

  const handleDiscountChange = (
    productIndex: number,
    variantIndex: number | null,
    amount: string,
    type: "percent" | "flat"
  ) => {
    const updatedProducts = [...selectedProducts];

    if (variantIndex === null) {
      // Update discount inside the product
      updatedProducts[productIndex].product.discount = { amount, type };
    } else {
      // Update discount inside the specific variant
      updatedProducts[productIndex].variant[variantIndex].discount = {
        amount,
        type,
      };
    }

    setSelectedProducts(updatedProducts);
  };

  return (
    <Flex $flexDirection="column">
      <Typography.Title level={2}>Add Products</Typography.Title>
      <Row style={{ display: "flex", flexDirection: "column" }}>
        {selectedProducts.length > 0 ? (
          <>
            {selectedProducts.map((item, index) => (
              <Form
                layout="vertical"
                key={index}
                style={{ marginBottom: "24px", width: "100%" }}
              >
                {/* Product and its Discount */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "16px",
                  }}
                >
                  <Form.Item
                    label={index === 0 ? "Product" : ""}
                    style={{ flex: 3 }}
                  >
                    <Input
                      readOnly
                      addonBefore={index + 1}
                      value={item.product.title}
                      suffix={<EditOutlined />}
                      placeholder="Select product"
                      onFocus={(e) => {
                        e.target.blur();
                        setOpen(true);
                      }}
                    />
                  </Form.Item>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Form.Item
                      label={index === 0 ? "Discount" : ""}
                      style={{ flex: 1 }}
                    >
                      <Input.Group compact style={{ display: "flex" }}>
                        <Form.Item
                          name={["discounts", index, "amount"]}
                          noStyle
                        >
                          <Input
                            style={{ width: "100px" }}
                            placeholder="Amount"
                            value={item?.product.discount?.amount || 0}
                            onChange={(e) =>
                              handleDiscountChange(
                                index,
                                null,
                                e.target.value,
                                item?.product?.discount?.type || "percent"
                              )
                            }
                          />
                        </Form.Item>
                        <Form.Item name={["discounts", index, "type"]} noStyle>
                          <Select
                            style={{ width: "100px" }}
                            placeholder="Type"
                            value={item?.product.discount?.type || "percent"}
                            onChange={(value) =>
                              handleDiscountChange(
                                index,
                                null,
                                item?.product.discount?.amount || "0",
                                value
                              )
                            }
                          >
                            <Select.Option value="percent">% Off</Select.Option>
                            <Select.Option value="flat">Flat</Select.Option>
                          </Select>
                        </Form.Item>
                      </Input.Group>
                    </Form.Item>
                  </div>
                </div>

                {/* Button to toggle visibility of variants */}
                <Flex $justifyContent="flex-end" $alignItems="center">
                  <Button
                    type="link"
                    onClick={() => toggleVariantsVisibility(index)}
                  >
                    {variantsVisibility[index]
                      ? "Hide Variants"
                      : "Show Variants"}
                  </Button>
                </Flex>

                {/* Variants with their own discounts */}
                {variantsVisibility[index] && (
                  <div
                    style={{ marginTop: 16, paddingLeft: 24, paddingRight: 24 }}
                  >
                    {item.variant.map((variant, variantIndex) => (
                      <div
                        key={variant.id}
                        style={{
                          display: "flex",
                          gap: "16px",
                          marginBottom: 12,
                        }}
                      >
                        <Form.Item style={{ flex: 1 }}>
                          <Input
                            readOnly
                            value={variant.title}
                            placeholder="Select variant"
                          />
                        </Form.Item>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Form.Item style={{ flex: 1 }}>
                            <Input.Group compact style={{ display: "flex" }}>
                              <Form.Item
                                name={[
                                  "variantDiscounts",
                                  index,
                                  variantIndex,
                                  "amount",
                                ]}
                                noStyle
                              >
                                <Input
                                  style={{ width: "100px" }}
                                  placeholder="Amount"
                                  value={variant?.discount?.amount || 0}
                                  onChange={(e) =>
                                    handleDiscountChange(
                                      index,
                                      variantIndex,
                                      e.target.value,
                                      variant?.discount?.type || "percent"
                                    )
                                  }
                                />
                              </Form.Item>
                              <Form.Item
                                name={[
                                  "variantDiscounts",
                                  index,
                                  variantIndex,
                                  "type",
                                ]}
                                noStyle
                              >
                                <Select
                                  style={{ width: "100px" }}
                                  placeholder="Type"
                                  value={variant?.discount?.type || "percent"}
                                  onChange={(value) =>
                                    handleDiscountChange(
                                      index,
                                      variantIndex,
                                      variant?.discount?.amount || "0",
                                      value
                                    )
                                  }
                                >
                                  <Select.Option value="percent">
                                    % Off
                                  </Select.Option>
                                  <Select.Option value="flat">
                                    Flat
                                  </Select.Option>
                                </Select>
                              </Form.Item>
                            </Input.Group>
                          </Form.Item>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Form>
            ))}
          </>
        ) : (
          <Form layout="vertical">
            <Space align="end" size="large" style={{ flexWrap: "wrap" }}>
              <Form.Item label="Product">
                <Input
                  readOnly
                  suffix={<EditOutlined />}
                  placeholder="Select product"
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
        )}
        <ProductList
          open={open}
          onClose={() => setOpen(false)}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
        />
      </Row>
      <Flex $justifyContent="flex-end" $alignItems="center">
        <Button
          type="default"
          size="large"
          onClick={() => console.log(selectedProducts)}
        >
          Add Product
        </Button>
      </Flex>
    </Flex>
  );
};

export default Home;
