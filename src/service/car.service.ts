import db from "../Drizzle/db"
import { CarTable } from "../Drizzle/schema";
import { eq } from "drizzle-orm";

export const createCarService = async (car: any) => {
  return await db.insert(CarTable).values(car).returning();
};

export const getAllCarsService = async () => {
  return await db.select().from(CarTable);
};

export const getCarByIdService = async (id: number) => {
  const result = await db.select().from(CarTable).where(eq(CarTable.carID, id));
  return result[0];
};

export const updateCarService = async (id: number, car: any) => {
  return await db.update(CarTable).set(car).where(eq(CarTable.carID, id)).returning();
};

export const deleteCarService = async (id: number) => {
  return await db.delete(CarTable).where(eq(CarTable.carID, id));
};
