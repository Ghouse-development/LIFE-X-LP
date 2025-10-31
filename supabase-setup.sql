-- LIFE X FC Lead & Webinar Registration Tables

-- fc_leads: フランチャイズ問い合わせ
create table if not exists fc_leads (
  id uuid primary key default gen_random_uuid(),
  company text,
  name text not null,
  email text not null,
  phone text,
  prefecture text,
  message text,
  source text,
  utm jsonb,
  created_at timestamptz default now()
);

-- fc_webinar_regs: ウェビナー申込
create table if not exists fc_webinar_regs (
  id uuid primary key default gen_random_uuid(),
  company text,
  name text not null,
  email text not null,
  phone text,
  prefecture text,
  desired_date timestamptz,
  recording_ok boolean default false,
  utm jsonb,
  created_at timestamptz default now()
);

-- Indexes for better query performance
create index if not exists fc_leads_created_at_idx on fc_leads(created_at desc);
create index if not exists fc_leads_email_idx on fc_leads(email);
create index if not exists fc_webinar_regs_created_at_idx on fc_webinar_regs(created_at desc);
create index if not exists fc_webinar_regs_email_idx on fc_webinar_regs(email);
create index if not exists fc_webinar_regs_desired_date_idx on fc_webinar_regs(desired_date);

-- Enable Row Level Security (RLS)
alter table fc_leads enable row level security;
alter table fc_webinar_regs enable row level security;

-- Policies: サービスロールのみ読み書き可能、匿名は挿入のみ可能
create policy "Enable insert for anon" on fc_leads
  for insert with check (true);

create policy "Enable select for service_role" on fc_leads
  for select using (auth.role() = 'service_role');

create policy "Enable insert for anon" on fc_webinar_regs
  for insert with check (true);

create policy "Enable select for service_role" on fc_webinar_regs
  for select using (auth.role() = 'service_role');

-- Comments
comment on table fc_leads is 'フランチャイズ問い合わせデータ';
comment on table fc_webinar_regs is 'ウェビナー申込データ';
