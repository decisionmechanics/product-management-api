import IWarehouse from "../models/warehouse.js";
import {
  removeWarehouse as removeProductWarehouses,
  updateWarehouse as updateProductWarehouses,
} from "./productRepository.js";

const warehouses: IWarehouse[] = [
  {
    warehouseId: 1,
    productId: 109,
    warehouseName: "Eastern US",
    international: false,
    address: {
      street: "63 Overlea",
      city: "Pittsburgh",
      country: "USA",
    },
    qoh: 15,
  },
  {
    warehouseId: 2,
    productId: 387,
    warehouseName: "Central US",
    international: false,
    address: {
      street: "500 Ridout St.",
      city: "Cincinnatti",
      country: "USA",
    },
    qoh: 5,
  },
  {
    warehouseId: 3,
    productId: 109,
    warehouseName: "Central Canada",
    international: true,
    address: {
      street: "3341 Rae St.",
      city: "Regina",
      country: "Canada",
    },
    qoh: 5,
  },
  {
    warehouseId: 4,
    productId: 387,
    warehouseName: "Great Britain",
    international: true,
    address: {
      street: "424 Overlea",
      city: "Manchester",
      country: "UK",
    },
    qoh: 15,
  },
  {
    warehouseId: 5,
    productId: 387,
    warehouseName: "Scandinavia",
    international: true,
    address: {
      street: "408 Durand",
      city: "Stockholm",
      country: "Sweden",
    },
    qoh: 213,
  },
  {
    warehouseId: 6,
    productId: 423,
    warehouseName: "South America",
    international: true,
    address: {
      street: "53 St. Patrick",
      city: "Rio de Janeiro",
      country: "Brazil",
    },
    qoh: 112,
  },
  {
    warehouseId: 7,
    productId: 387,
    warehouseName: "East Asia",
    international: true,
    address: {
      street: "2322 Colborne",
      city: "Hong Kong",
      country: "China",
    },
    qoh: 5,
  },
];

export const fetchWarehouses = (): Promise<IWarehouse[]> =>
  Promise.resolve(warehouses);

export const fetchWarehouseByWarehouseId = (
  warehouseId: number
): Promise<IWarehouse | undefined> =>
  Promise.resolve(warehouses.find(({ warehouseId: id }) => id === warehouseId));

export const fetchWarehousesByProductId = (
  productId: number
): Promise<IWarehouse[]> =>
  Promise.resolve(warehouses.filter(({ productId: id }) => id === productId));

export const addWarehouse = (warehouse: IWarehouse): Promise<IWarehouse> => {
  warehouses.push(warehouse);

  return Promise.resolve(warehouse);
};

export const updateWarehouse = (warehouse: IWarehouse): Promise<IWarehouse> => {
  const index = warehouses.findIndex(
    ({ warehouseId }) => warehouseId === warehouse.warehouseId
  );

  warehouses[index] = warehouse;

  updateProductWarehouses(warehouse);

  return Promise.resolve(warehouse);
};

export const deleteWarehouse = (warehouseId: number): Promise<IWarehouse> => {
  const index = warehouses.findIndex(
    ({ warehouseId: id }) => id === warehouseId
  );

  const warehouse = warehouses[index];

  warehouses.splice(index, 1);

  removeProductWarehouses(warehouseId);

  return Promise.resolve(warehouse);
};
