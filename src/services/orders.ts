import { supabase } from "@/lib/supabase";

export type OrderPayload = {
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  items: any[];
  total: number;
};

function generateTrackingToken() {
  return Array.from(crypto.getRandomValues(new Uint8Array(6)))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function createOrder(data: OrderPayload) {
  const trackingToken = generateTrackingToken();

  const { error } = await supabase
    .from("orders")
    .insert([{
      ...data,
      tracking_token: trackingToken,
      payment_status: "pendiente",
      payment_method: "whatsapp",
      shipping_status: "preparando"
    }]);

  if (error) {
    console.error("Error creating order:", error);
    throw new Error("No se pudo crear la orden.");
  }

  return trackingToken;
}
