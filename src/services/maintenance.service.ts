import db from "../Drizzle/db";
import { MaintenanceTable } from "../Drizzle/schema";
import { eq } from "drizzle-orm";

export const createMaintenanceService = async (data: any) => {
  return await db.insert(MaintenanceTable).values(data).returning();
};

export const getAllMaintenanceService = async () => {
  return await db.select().from(MaintenanceTable);
};

export const getMaintenanceByIdService = async (id: number) => {
  const result = await db.select().from(MaintenanceTable).where(eq(MaintenanceTable.maintenanceID, id));
  return result[0];
};

export const updateMaintenanceService = async (id: number, data: any) => {
  return await db.update(MaintenanceTable).set(data).where(eq(MaintenanceTable.maintenanceID, id)).returning();
};

export const deleteMaintenanceService = async (id: number) => {
  return await db.delete(MaintenanceTable).where(eq(MaintenanceTable.maintenanceID, id));
};
