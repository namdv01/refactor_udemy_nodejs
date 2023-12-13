drop table if exists public.users;
CREATE TABLE public.users (
  id serial PRIMARY KEY,
  mail VARCHAR(64) UNIQUE NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  "token" VARCHAR(1000) NULL
)