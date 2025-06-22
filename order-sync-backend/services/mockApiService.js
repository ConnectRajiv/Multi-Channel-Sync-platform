// services/mockApiService.js
export const mockFetchOrders = (platform) => {
  const fakeData = {
    Shopify: [
      { orderId: "S1001", items: ["shirt", "jeans"] },
      { orderId: "S1002", items: ["cap"] },
    ],
    Amazon: [
      { orderId: "A2001", items: ["phone"] },
      { orderId: "A2002", items: ["book", "pen"] },
    ],
  };

  return fakeData[platform] || [];
};

export const mockSyncOrder = async (order) => {
  const success = Math.random() > 0.3;
  return success ? "success" : "failure";
};
