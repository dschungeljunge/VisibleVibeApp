-- PostgreSQL Database Schema for Learning App Design Skilltree
-- Compatible with Supabase

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles Table (Linked to Supabase Auth Users)
create table public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    email text not null,
    display_name text,
    role text not null default 'public' check (role in ('public', 'superuser', 'admin')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on Profiles
alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone" 
on public.profiles for select using (true);

create policy "Users can update their own profile" 
on public.profiles for update using (auth.uid() = id);

-- 2. Nodes Table (Skill Nodes)
create table public.nodes (
    id uuid primary key default gen_random_uuid(),
    slug text not null unique,
    title text not null,
    summary text not null,
    category text not null check (category in ('Learning Design', 'UX Design', 'AI Design', 'Data Design', 'Product Design')),
    level integer not null default 1,
    status text not null default 'draft' check (status in ('draft', 'reviewed', 'stable', 'archived')),
    content_markdown text,
    practice_task text,
    quality_criteria text,
    resources_markdown text,
    position_x integer not null default 0,
    position_y integer not null default 0,
    created_by uuid references public.profiles(id) on delete set null,
    updated_by uuid references public.profiles(id) on delete set null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on Nodes
alter table public.nodes enable row level security;

create policy "Public read access for reviewed or stable nodes" 
on public.nodes for select using (status in ('reviewed', 'stable'));

create policy "Superusers can do all operations on nodes" 
on public.nodes for all using (
    exists (
        select 1 from public.profiles 
        where id = auth.uid() and role in ('superuser', 'admin')
    )
);

-- 3. Edges Table (Connections between nodes)
create table public.edges (
    id uuid primary key default gen_random_uuid(),
    source_node_id uuid not null references public.nodes(id) on delete cascade,
    target_node_id uuid not null references public.nodes(id) on delete cascade,
    relation_type text not null default 'prerequisite' check (relation_type in ('prerequisite', 'leads_to', 'related', 'required_for_project', 'optional_extension')),
    label text,
    created_by uuid references public.profiles(id) on delete set null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    constraint unique_edge_connection unique (source_node_id, target_node_id)
);

-- Enable RLS on Edges
alter table public.edges enable row level security;

create policy "Public read access for edges between public nodes" 
on public.edges for select using (
    exists (
        select 1 from public.nodes n1 where n1.id = source_node_id and n1.status in ('reviewed', 'stable')
    ) and exists (
        select 1 from public.nodes n2 where n2.id = target_node_id and n2.status in ('reviewed', 'stable')
    )
);

create policy "Superusers can do all operations on edges" 
on public.edges for all using (
    exists (
        select 1 from public.profiles 
        where id = auth.uid() and role in ('superuser', 'admin')
    )
);

-- 4. Projects Table (Project paths)
create table public.projects (
    id uuid primary key default gen_random_uuid(),
    slug text not null unique,
    title text not null,
    summary text not null,
    artifact_description text,
    learning_strategy text,
    technology_principle text,
    ux_principle text,
    definition_of_done text,
    content_markdown text,
    status text not null default 'draft' check (status in ('draft', 'reviewed', 'stable', 'archived')),
    created_by uuid references public.profiles(id) on delete set null,
    updated_by uuid references public.profiles(id) on delete set null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on Projects
alter table public.projects enable row level security;

create policy "Public read access for reviewed or stable projects" 
on public.projects for select using (status in ('reviewed', 'stable'));

create policy "Superusers can do all operations on projects" 
on public.projects for all using (
    exists (
        select 1 from public.profiles 
        where id = auth.uid() and role in ('superuser', 'admin')
    )
);

-- 5. Project Nodes Junction Table (Link projects to nodes)
create table public.project_nodes (
    id uuid primary key default gen_random_uuid(),
    project_id uuid not null references public.projects(id) on delete cascade,
    node_id uuid not null references public.nodes(id) on delete cascade,
    importance text not null default 'required' check (importance in ('required', 'recommended', 'optional')),
    sequence_order integer not null default 0,
    constraint unique_project_node unique (project_id, node_id)
);

-- Enable RLS on Project Nodes
alter table public.project_nodes enable row level security;

create policy "Public read access for project nodes" 
on public.project_nodes for select using (true);

create policy "Superusers can do all operations on project nodes" 
on public.project_nodes for all using (
    exists (
        select 1 from public.profiles 
        where id = auth.uid() and role in ('superuser', 'admin')
    )
);

-- 6. Node Versions Table (Snapshots for Node editing history)
create table public.node_versions (
    id uuid primary key default gen_random_uuid(),
    node_id uuid not null references public.nodes(id) on delete cascade,
    snapshot jsonb not null,
    change_note text,
    created_by uuid references public.profiles(id) on delete set null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on Node Versions (Admin only)
alter table public.node_versions enable row level security;

create policy "Superusers can view and create node versions" 
on public.node_versions for all using (
    exists (
        select 1 from public.profiles 
        where id = auth.uid() and role in ('superuser', 'admin')
    )
);

-- 7. Project Versions Table (Snapshots for Project editing history)
create table public.project_versions (
    id uuid primary key default gen_random_uuid(),
    project_id uuid not null references public.projects(id) on delete cascade,
    snapshot jsonb not null,
    change_note text,
    created_by uuid references public.profiles(id) on delete set null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on Project Versions (Admin only)
alter table public.project_versions enable row level security;

create policy "Superusers can view and create project versions" 
on public.project_versions for all using (
    exists (
        select 1 from public.profiles 
        where id = auth.uid() and role in ('superuser', 'admin')
    )
);

-- TRIGGER FUNCTION TO KEEP updated_at UPDATED
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger set_nodes_updated_at before update on public.nodes for each row execute procedure public.handle_updated_at();
create trigger set_projects_updated_at before update on public.projects for each row execute procedure public.handle_updated_at();
create trigger set_profiles_updated_at before update on public.profiles for each row execute procedure public.handle_updated_at();
