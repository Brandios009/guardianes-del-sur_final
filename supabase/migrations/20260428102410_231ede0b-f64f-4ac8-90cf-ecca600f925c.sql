
-- Tabla de jugadores
CREATE TABLE public.players (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  username_lower TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  email_lower TEXT NOT NULL UNIQUE,
  age TEXT NOT NULL,
  city TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Trigger para mantener username_lower y email_lower sincronizados
CREATE OR REPLACE FUNCTION public.normalize_player_identifiers()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.username_lower := lower(trim(NEW.username));
  NEW.email_lower := lower(trim(NEW.email));
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_normalize_player_identifiers
BEFORE INSERT OR UPDATE ON public.players
FOR EACH ROW EXECUTE FUNCTION public.normalize_player_identifiers();

-- Tabla de progreso (un registro por lugar desbloqueado)
CREATE TABLE public.player_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
  location_key TEXT NOT NULL,
  unlocked_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (player_id, location_key)
);

CREATE INDEX idx_player_progress_player ON public.player_progress(player_id);

-- RLS
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_progress ENABLE ROW LEVEL SECURITY;

-- Players: cualquiera puede leer (para validar duplicados y login por username)
CREATE POLICY "players_select_all"
ON public.players FOR SELECT
USING (true);

-- Players: cualquiera puede registrarse
CREATE POLICY "players_insert_all"
ON public.players FOR INSERT
WITH CHECK (true);

-- Player progress: cualquiera puede leer
CREATE POLICY "player_progress_select_all"
ON public.player_progress FOR SELECT
USING (true);

-- Player progress: cualquiera puede agregar progreso
CREATE POLICY "player_progress_insert_all"
ON public.player_progress FOR INSERT
WITH CHECK (true);
