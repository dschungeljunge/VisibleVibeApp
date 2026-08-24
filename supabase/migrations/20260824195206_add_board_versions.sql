create table public.board_versions (
  id uuid primary key default gen_random_uuid(),
  board_id uuid not null references public.boards(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  scene_data jsonb not null,
  reason text not null default 'autosave' check (reason in ('autosave', 'manual', 'restore')),
  created_at timestamptz not null default now()
);

alter table public.board_versions enable row level security;

create policy "Users can read their own board versions"
on public.board_versions
for select
to authenticated
using ((select auth.uid()) = owner_id);

create policy "Users can create their own board versions"
on public.board_versions
for insert
to authenticated
with check (
  (select auth.uid()) = owner_id
  and exists (
    select 1
    from public.boards
    where boards.id = board_versions.board_id
      and boards.owner_id = (select auth.uid())
  )
);

create policy "Users can delete their own board versions"
on public.board_versions
for delete
to authenticated
using ((select auth.uid()) = owner_id);

create index board_versions_board_created_idx
on public.board_versions (board_id, created_at desc);

create function public.capture_board_version()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if old.scene_data is distinct from new.scene_data
    and not exists (
      select 1
      from public.board_versions
      where board_id = old.id
        and created_at > now() - interval '5 minutes'
    )
  then
    insert into public.board_versions (board_id, owner_id, scene_data, reason)
    values (old.id, old.owner_id, old.scene_data, 'autosave');

    delete from public.board_versions
    where id in (
      select id
      from public.board_versions
      where board_id = old.id
      order by created_at desc
      offset 50
    );
  end if;

  return new;
end;
$$;

create trigger capture_board_version_before_update
before update of scene_data on public.boards
for each row
execute function public.capture_board_version();
