-- Create stores table for franchise locations
CREATE TABLE IF NOT EXISTS public.stores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  prefecture TEXT NOT NULL,
  city TEXT NOT NULL,
  address TEXT NOT NULL,
  full_address TEXT NOT NULL,
  latitude DECIMAL(10, 7),
  longitude DECIMAL(10, 7),
  joined_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on prefecture and city for faster queries
CREATE INDEX IF NOT EXISTS idx_stores_prefecture ON public.stores(prefecture);
CREATE INDEX IF NOT EXISTS idx_stores_city ON public.stores(city);
CREATE INDEX IF NOT EXISTS idx_stores_joined_date ON public.stores(joined_date);

-- Enable Row Level Security (RLS)
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to read stores (for the public map)
CREATE POLICY "Allow public read access to stores"
  ON public.stores
  FOR SELECT
  USING (true);

-- Allow authenticated users with service role to insert/update/delete
-- (This will be used by admin scripts or authenticated API routes)
CREATE POLICY "Allow service role full access to stores"
  ON public.stores
  FOR ALL
  USING (auth.role() = 'service_role');

COMMENT ON TABLE public.stores IS 'Franchise store locations for the LIFE X franchise map';
