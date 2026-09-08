import { supabase } from "./supabase";

export type OrderPayload = {
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  items: any[];
  total: number;
};

export async function createOrder(data: OrderPayload) {
  const { data: order, error } = await supabase
    .from("orders")
    .insert([{
      ...data,
      payment_status: "pendiente",
      payment_method: "whatsapp",
      shipping_status: "preparando"
    }])
    .select("tracking_token")
    .single();

  if (error) {
    console.error("Error creating order:", error);
    throw new Error("No se pudo crear la orden.");
  }

  return order.tracking_token;
}
