import IWarehouse from "./warehouse.js";

interface IProduct {
  productId: number;
  productName: string;
  inStock: boolean;
  lastDelivery: Date;
  totalQuantity?: number;
  warehouses?: IWarehouse[];
}

export default IProduct;
