import IProduct from "../models/product.js";
import IWarehouse from "../models/warehouse.js";
import { addDays, addYears } from "../utilities.js";

const products: IProduct[] = [
  {
    productId: 109,
    productName: "Widget",
    inStock: true,
    lastDelivery: addDays(new Date(), -2),
  },
  {
    productId: 423,
    productName: "Sprocket",
    inStock: true,
    lastDelivery: addYears(new Date(), -12),
  },
  {
    productId: 387,
    productName: "Doodad",
    inStock: true,
    lastDelivery: new Date(),
  },
];

export const updateWarehouse = (warehouse: IWarehouse): void => {
  for (const product of products) {
    const index =
      product.warehouses?.findIndex(
        ({ warehouseId }) => warehouseId === warehouse.warehouseId
      ) ?? -1;

    if (index > -1) {
      product.warehouses?.splice(index, 1, warehouse);
    }
  }
};

export const removeWarehouse = (warehouseId: number): void => {
  for (const product of products) {
    const index =
      product.warehouses?.findIndex(
        (warehouse) => warehouse.warehouseId === warehouseId
      ) ?? -1;

    if (index > -1) {
      product.warehouses?.splice(index, 1);
    }
  }
};

export const fetchProducts = (): Promise<IProduct[]> =>
  Promise.resolve(products);

export const fetchProductByProductId = (
  productId: number
): Promise<IProduct | undefined> =>
  Promise.resolve(products.find(({ productId: id }) => id === productId));

export const addProduct = (product: IProduct): Promise<IProduct> => {
  products.push(product);

  return Promise.resolve(product);
};

export const updateProduct = (product: IProduct): Promise<IProduct> => {
  const index = products.findIndex(
    ({ productId }) => productId === product.productId
  );

  products[index] = product;

  return Promise.resolve(product);
};

export const deleteProduct = (productId: number): Promise<IProduct> => {
  const index = products.findIndex(({ productId: id }) => id === productId);

  const product = products[index];

  products.splice(index, 1);

  return Promise.resolve(product);
};
