import { FC, useCallback, useEffect, useState } from "react";
import {
  Modal,
  Divider,
  List,
  Checkbox,
  Button,
  Input,
  message,
  Typography,
} from "antd";
import { Product, SelectedItem, Variant } from "../../type/product";
import { API_KEY, API_URL } from "../../constants/common";
import debounce from "lodash.debounce";

interface ProductListProps {
  open: boolean;
  onClose: () => void;
  selectedProducts: SelectedItem[];
  setSelectedProducts: (products: SelectedItem[]) => void;
}

const ProductList: FC<ProductListProps> = ({
  open,
  onClose,
  selectedProducts,
  setSelectedProducts,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>(
    selectedProducts || []
  );
  const [search, setSearch] = useState<string>("");
  const [page] = useState<number>(1);
  const [limit] = useState<number>(5);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generateQueryString = (params: Record<string, any>) =>
    Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join("&");

  const fetchProducts = useCallback(
    async (searchValue: string, pageNum: number) => {
      try {
        setLoading(true);
        const response = await fetch(
          `${API_URL}?${generateQueryString({
            search: searchValue,
            page: pageNum,
            limit,
          })}`,
          {
            method: "GET",
            headers: {
              "x-api-key": API_KEY,
            },
            redirect: "follow" as RequestRedirect,
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setProducts(result.data || result);
      } catch (error: unknown) {
        const err = error as Error;
        message.error(
          err.message || "Something went wrong while fetching products."
        );
      } finally {
        setLoading(false);
      }
    },
    [limit]
  );

  // Debounced function for search
  const debouncedFetchProducts = useCallback(
    debounce((searchValue: string, pageNum: number) => {
      fetchProducts(searchValue, pageNum);
    }, 500),
    [fetchProducts]
  );

  useEffect(() => {
    if (open) {
      debouncedFetchProducts(search, page);
    }
    // Cleanup debounce on unmount
    return () => {
      debouncedFetchProducts.cancel();
    };
  }, [open, search, page, debouncedFetchProducts]);

  const toggleSelect = (product: Product, variant: Variant) => {
    setSelectedItems((prev) => {
      const productIndex = prev.findIndex(
        (item) => item.product.id === product.id
      );

      // If product is already in selectedItems
      if (productIndex !== -1) {
        const productEntry = prev[productIndex];
        const variantIndex = productEntry.variant.findIndex(
          (v) => v.id === variant.id
        );

        if (variantIndex !== -1) {
          // Variant is already selected — remove it
          const updatedVariants = productEntry.variant.filter(
            (v) => v.id !== variant.id
          );

          if (updatedVariants.length === 0) {
            // If no variants remain, remove the product entirely
            return prev.filter((_, index) => index !== productIndex);
          } else {
            // Otherwise, update the variants list
            const updated = [...prev];
            updated[productIndex] = { product, variant: updatedVariants };
            return updated;
          }
        } else {
          // Variant not yet selected — add it
          const updated = [...prev];
          updated[productIndex] = {
            product,
            variant: [...productEntry.variant, variant],
          };
          return updated;
        }
      } else {
        // Product not yet in selectedItems — add it with this variant
        return [...prev, { product, variant: [variant] }];
      }
    });
  };

  const toggleSelectAllVariants = (product: Product) => {
    const existingProductIndex = selectedItems.findIndex(
      (item) => item.product.id === product.id
    );

    const allVariantsSelected = product.variants.every((v) =>
      selectedItems[existingProductIndex]?.variant.some(
        (item) => item.id === v.id
      )
    );

    if (allVariantsSelected) {
      // Remove all variants of this product
      setSelectedItems((prev) =>
        prev.filter((item) => item.product.id !== product.id)
      );
    } else {
      setSelectedItems((prev) => {
        const updated = [...prev];
        if (existingProductIndex !== -1) {
          // Add only new variants
          const existingVariants = updated[existingProductIndex].variant;
          const newVariants = product.variants.filter(
            (v) => !existingVariants.some((ev) => ev.id === v.id)
          );
          updated[existingProductIndex].variant = [
            ...existingVariants,
            ...newVariants,
          ];
        } else {
          // Add new product and all its variants
          updated.push({ product, variant: product.variants });
        }
        return updated;
      });
    }
  };

  const isVariantSelected = (variantId: number) =>
    selectedItems.some((item) =>
      item.variant.some((variant) => variant.id === variantId)
    );

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const handleOnAdd = () => {
    setSelectedProducts(selectedItems);
    setSelectedItems([]);
    onClose();
  };

  useEffect(() => {
    if (open) {
      setSelectedItems(selectedProducts);
    }
  }, [open, selectedProducts]);

  return (
    <Modal
      title="Select Products"
      open={open}
      onCancel={onClose}
      footer={[
        <div
          key="footer"
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            padding: "8px 0",
          }}
        >
          <div style={{ fontSize: 14 }}>
            {selectedItems.length} product selected
          </div>
          <div>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              type="primary"
              style={{ marginLeft: 8 }}
              onClick={handleOnAdd}
            >
              Add
            </Button>
          </div>
        </div>,
      ]}
      width={700}
    >
      <Input.Search
        placeholder="Search product"
        style={{ marginBottom: 8 }}
        onSearch={handleSearch}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <Divider style={{ margin: "8px 0" }} />
      <List
        loading={loading}
        dataSource={products}
        renderItem={(product) => (
          <div
            key={product.id}
            style={{
              marginBottom: 8,
              border: "1px solid #e8e8e8",
              padding: "8px",
              borderRadius: 4,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontWeight: 500,
                fontSize: 14,
                marginBottom: 4,
              }}
            >
              <Checkbox
                checked={product.variants.every((v) => isVariantSelected(v.id))}
                onChange={() => toggleSelectAllVariants(product)}
                style={{ marginRight: 8 }}
              />
              {product.image?.src && (
                <img
                  src={product.image.src}
                  alt="product"
                  style={{
                    width: 24,
                    height: 24,
                    objectFit: "cover",
                    marginRight: 8,
                    borderRadius: 2,
                  }}
                />
              )}
              <Typography.Text>{product.title}</Typography.Text>
            </div>

            {product.variants.map((variant) => (
              <List.Item
                key={variant.id}
                style={{
                  padding: "4px 0 4px 32px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  fontSize: 13,
                }}
                onClick={() => toggleSelect(product, variant)}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Checkbox
                    checked={isVariantSelected(variant.id)}
                    style={{ marginRight: 8 }}
                  />
                  <span>{variant.title}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: 8,
                  }}
                >
                  {variant.inventory_quantity && (
                    <span style={{ marginRight: 16 }}>{`${Number(
                      variant.inventory_quantity
                    )} available`}</span>
                  )}
                  <span>${variant.price}</span>
                </div>
              </List.Item>
            ))}
          </div>
        )}
      />
    </Modal>
  );
};

export default ProductList;
