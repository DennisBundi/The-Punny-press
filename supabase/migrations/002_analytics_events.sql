-- Analytics events table for tracking WhatsApp inquiries, product views, and social clicks
create table if not exists analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  product_id uuid references products(id) on delete set null,
  metadata jsonb default '{}',
  page_path text,
  created_at timestamptz default now()
);

-- Indexes for efficient querying
create index idx_analytics_event_type on analytics_events(event_type);
create index idx_analytics_created_at on analytics_events(created_at);
create index idx_analytics_product_id on analytics_events(product_id);
create index idx_analytics_type_created on analytics_events(event_type, created_at);

-- RLS: anonymous users can insert (tracking), only authenticated can read (admin)
alter table analytics_events enable row level security;

create policy "Anyone can insert analytics events"
  on analytics_events for insert
  with check (true);

create policy "Only authenticated users can read analytics events"
  on analytics_events for select
  using (auth.role() = 'authenticated');
