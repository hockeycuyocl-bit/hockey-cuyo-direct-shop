import { supabase } from "@/lib/supabase";

export type OrderItem = {
  name: string;
  qty: number;
  price: number;
  variant?: string;
  [key: string]: unknown;
};

export type OrderPayload = {
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  items: OrderItem[];
  total: number;
  payment_method?: "whatsapp" | "nave" | "mercadopago";
};

export type CreatedOrder = {
  id: string;
  tracking_token: string;
};

function generateTrackingToken() {
  return Array.from(crypto.getRandomValues(new Uint8Array(6)))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function createOrder(data: OrderPayload): Promise<CreatedOrder> {
  const trackingToken = generateTrackingToken();
  const paymentMethod = data.payment_method || "whatsapp";

  const { data: inserted, error } = await supabase
    .from("orders")
    .insert([{
      customer_name: data.customer_name,
      customer_phone: data.customer_phone,
      customer_email: data.customer_email || null,
      items: data.items,
      total: data.total,
      tracking_token: trackingToken,
      payment_status: "pendiente",
      payment_method: paymentMethod,
      shipping_status: "preparando"
    }])
    .select("id, tracking_token")
    .single();

  if (error || !inserted) {
    // Si falla select por RLS anónimo, generamos el ID client-side si es posible o relanzamos
    console.error("Error creating order:", error);
    throw new Error("No se pudo crear la orden en la base de datos.");
  }

  return {
    id: inserted.id,
    tracking_token: inserted.tracking_token || trackingToken,
  };
}
