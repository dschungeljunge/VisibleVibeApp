create table public.walchwil_questions (
  id uuid primary key default gen_random_uuid(),
  session_slug text not null,
  body text not null,
  author text not null,
  supporters text[] not null default '{}',
  created_at timestamptz not null default now()
);

create index walchwil_questions_session_idx
on public.walchwil_questions (session_slug, created_at);

alter table public.walchwil_questions enable row level security;

create policy "Walchwil questions are readable"
on public.walchwil_questions
for select
to anon, authenticated
using (true);

create policy "Walchwil questions can be inserted"
on public.walchwil_questions
for insert
to anon, authenticated
with check (true);

create policy "Walchwil questions can be updated"
on public.walchwil_questions
for update
to anon, authenticated
using (true)
with check (true);

grant select, insert, update on table public.walchwil_questions to anon, authenticated;

alter publication supabase_realtime add table public.walchwil_questions;
