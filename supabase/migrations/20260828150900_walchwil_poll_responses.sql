create table public.walchwil_poll_responses (
  id uuid primary key default gen_random_uuid(),
  poll_id text not null,
  participant text not null,
  slots text[] not null default '{}',
  updated_at timestamptz not null default now(),
  unique (poll_id, participant)
);

alter table public.walchwil_poll_responses enable row level security;

create policy "Walchwil poll is readable"
on public.walchwil_poll_responses
for select
to anon, authenticated
using (true);

create policy "Walchwil poll can be inserted"
on public.walchwil_poll_responses
for insert
to anon, authenticated
with check (true);

create policy "Walchwil poll can be updated"
on public.walchwil_poll_responses
for update
to anon, authenticated
using (true)
with check (true);

grant select, insert, update on table public.walchwil_poll_responses to anon, authenticated;

alter publication supabase_realtime add table public.walchwil_poll_responses;
