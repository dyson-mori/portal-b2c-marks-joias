export function generatePaymentId() {
  const timestamp = Date.now(); // Ex: 1716258356842
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase(); // Ex: 3F5KZP
  return `PAY-${timestamp}-${randomPart}`; // Ex: PAY-1716258356842-3F5KZP
};

type OrderStatus = "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELED" | "RETURNED";

export function orderStatusNumber(status: OrderStatus): number {
  switch (status) {
    case "PENDING":
      return 1;

    case "PROCESSING":
      return 2;

    case "SHIPPED":
      return 3;

    case "DELIVERED":
      return 4;

    case "CANCELED":
      return 5;

    case "RETURNED":
      return 6;

    default:
      throw new Error("Invalid order status");
  }
}