import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ejljrbxbladcawdgtzox.supabase.co";

const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_4pNVEZ8GHaMXh_IW1IbSsw_68nXzlUx";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);
