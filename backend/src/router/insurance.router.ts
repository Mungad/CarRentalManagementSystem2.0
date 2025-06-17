import { Express } from "express";
import {
  registerInsuranceController,
  getInsuranceController,
  getInsuranceByIdController,
  updateInsuranceController,
  deleteInsuranceController
} from '../controllers/insurance.controller';
import { adminRoleAuth } from "../middleware/bearerAuth";

const insurance = (app: Express) => {
  app.route("/insurance/register").post(
    adminRoleAuth,
    async (req, res, next) => {
      try {
        await registerInsuranceController(req, res);
      } catch (error: any) {
        next(error);
      }
    }
  );

  app.route("/insurances").get(
    adminRoleAuth,
    async (req, res, next) => {
      try {
        await getInsuranceController(req, res);
      } catch (error: any) {
        next(error);
      }
    }
  );

  app.route("/insurance/:id").get(
    adminRoleAuth,
    async (req, res, next) => {
      try {
        await getInsuranceByIdController(req, res);
      } catch (error: any) {
        next(error);
      }
    }
  );

  app.route("/insurance/:id").put(
    adminRoleAuth,
    async (req, res, next) => {
      try {
        await updateInsuranceController(req, res);
      } catch (error: any) {
        next(error);
      }
    }
  );

  app.route("/insurance/:id").delete(
    adminRoleAuth,
    async (req, res, next) => {
      try {
        await deleteInsuranceController(req, res);
      } catch (error: any) {
        next(error);
      }
    }
  );
};

export default insurance;
