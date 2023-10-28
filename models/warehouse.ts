import IAddress from "./address.js";
import IInventoryTransaction from "./inventoryTransaction.js";

interface IWarehouse {
  warehouseId: number;
  productId: number;
  warehouseName: string;
  international: boolean;
  address: IAddress;
  qoh: number;
  transactions?: IInventoryTransaction[];
}

export default IWarehouse;
