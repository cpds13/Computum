// Computum — Supabase client
// A Publishable Key é apropriada para uso no frontend.
// Nunca coloque aqui uma Secret Key ou Service Role Key.

window.COMPUTUM = window.COMPUTUM || {};

COMPUTUM.SUPABASE_URL = "https://tdcexflyomkpygtxynjb.supabase.co";
COMPUTUM.SUPABASE_PUBLISHABLE_KEY = "sb_publishable_dqM-ROG8Pc7OwW6F-Swcpw_-DMNn19R";

COMPUTUM.supabase = window.supabase.createClient(
  COMPUTUM.SUPABASE_URL,
  COMPUTUM.SUPABASE_PUBLISHABLE_KEY
);
