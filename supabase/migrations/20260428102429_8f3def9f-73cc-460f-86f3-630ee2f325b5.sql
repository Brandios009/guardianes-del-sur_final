
CREATE OR REPLACE FUNCTION public.normalize_player_identifiers()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.username_lower := lower(trim(NEW.username));
  NEW.email_lower := lower(trim(NEW.email));
  RETURN NEW;
END;
$$;
