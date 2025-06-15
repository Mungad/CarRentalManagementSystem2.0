import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import paymentRouter from "../../router/payment.router";
import * as paymentService from "../../services/payment.service";

jest.mock("../../services/payment.service");

const app = express();
app.use(bodyParser.json());
app.use("/payment", paymentRouter);

describe("Payment Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("POST /payment should create payment", async () => {
    const mockPayment = { id: 1, amount: 1000, method: "card" };

    (paymentService.createPaymentService as jest.Mock).mockResolvedValue(mockPayment);

    const response = await request(app)
      .post("/payment")
      .send({ amount: 1000, method: "card" });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: mockPayment });
  });

  test("GET /payment should return all payments", async () => {
    const mockPayments = [{ id: 1 }, { id: 2 }];

    (paymentService.getPaymentService as jest.Mock).mockResolvedValue(mockPayments);

    const response = await request(app).get("/payment");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ data: mockPayments });
  });

  test("GET /payment/:id should return payment by ID", async () => {
    const mockPayment = { id: 1, amount: 1000 };

    (paymentService.getPaymentByIdService as jest.Mock).mockResolvedValue(mockPayment);

    const response = await request(app).get("/payment/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ data: mockPayment });
  });

  test("GET /payment/:id should return 404 if not found", async () => {
    (paymentService.getPaymentByIdService as jest.Mock).mockResolvedValue(null);

    const response = await request(app).get("/payment/999");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Payment not found" });
  });

  test("PUT /payment/:id should update payment", async () => {
    (paymentService.updatePaymentService as jest.Mock).mockResolvedValue(true);

    const response = await request(app)
      .put("/payment/1")
      .send({ amount: 1500 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Payment updated successfully" });
  });

  test("PUT /payment/:id should return 400 if update fails", async () => {
    (paymentService.updatePaymentService as jest.Mock).mockResolvedValue(false);

    const response = await request(app)
      .put("/payment/1")
      .send({ amount: 1500 });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Payment not updated" });
  });

  test("GET /payment/booking/:bookingID should return payments by bookingID", async () => {
    const mockPayments = [{ id: 1, bookingID: 10 }];

    (paymentService.getPaymentsByBookingIdService as jest.Mock).mockResolvedValue(mockPayments);

    const response = await request(app).get("/payment/booking/10");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ data: mockPayments });
  });

  test("DELETE /payment/:id should delete payment", async () => {
    const mockPayment = { id: 1, amount: 1000 };

    (paymentService.getPaymentByIdService as jest.Mock).mockResolvedValue(mockPayment);
    (paymentService.deletePaymentService as jest.Mock).mockResolvedValue(true);

    const response = await request(app).delete("/payment/1");

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  test("DELETE /payment/:id should return 404 if payment not found", async () => {
    (paymentService.getPaymentByIdService as jest.Mock).mockResolvedValue(null);

    const response = await request(app).delete("/payment/999");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Payment not found" });
  });

  test("DELETE /payment/:id should return 400 if deletion fails", async () => {
    const mockPayment = { id: 1, amount: 1000 };

    (paymentService.getPaymentByIdService as jest.Mock).mockResolvedValue(mockPayment);
    (paymentService.deletePaymentService as jest.Mock).mockResolvedValue(false);

    const response = await request(app).delete("/payment/1");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Payment not deleted" });
  });
});
