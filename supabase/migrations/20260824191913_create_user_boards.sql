create table public.boards (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  kind text not null check (kind in ('method', 'project')),
  context_slug text not null,
  title text not null,
  scene_data jsonb not null default '{"elements":[],"appState":{},"files":{}}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (owner_id, kind, context_slug)
);

alter table public.boards enable row level security;

create policy "Users can read their own boards"
on public.boards
for select
to authenticated
using ((select auth.uid()) = owner_id);

create policy "Users can create their own boards"
on public.boards
for insert
to authenticated
with check ((select auth.uid()) = owner_id);

create policy "Users can update their own boards"
on public.boards
for update
to authenticated
using ((select auth.uid()) = owner_id)
with check ((select auth.uid()) = owner_id);

create policy "Users can delete their own boards"
on public.boards
for delete
to authenticated
using ((select auth.uid()) = owner_id);

create index boards_owner_updated_idx
on public.boards (owner_id, updated_at desc);
