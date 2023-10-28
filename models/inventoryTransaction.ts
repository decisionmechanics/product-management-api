import TransactionType from "./transactionType.js";

interface IInventoryTransaction {
  transactionId: number;
  productId: number;
  warehouseId: number;
  transactionType: TransactionType;
  amount: number;
}

export default IInventoryTransaction;
