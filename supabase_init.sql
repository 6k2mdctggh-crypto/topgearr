-- Run this SQL in Supabase SQL editor (Project -> SQL Editor) to create the vehicles table

create extension if not exists "uuid-ossp";

create table if not exists public.vehicles (
  id uuid default uuid_generate_v4() primary key,
  type text,
  make text,
  model text,
  colour text,
  bought text,
  price text,
  image text,
  link text,
  notes text,
  created_at timestamptz default now()
);