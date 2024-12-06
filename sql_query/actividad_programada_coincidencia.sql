CREATE OR REPLACE FUNCTION verificar_disponibilidad_instalacion()
RETURNS TRIGGER AS $$
DECLARE
    actividad_duracion INTERVAL;
    conflictos INTEGER;
BEGIN
    -- Calcular la duración de la actividad referenciada
    SELECT duracion INTO actividad_duracion
    FROM api_actividad
    WHERE idA = NEW.idA;

    -- Verificar si hay conflictos con otras actividades programadas en la misma instalación
    SELECT COUNT(*)
    INTO conflictos
    FROM api_actividad_programada ap
    INNER JOIN api_actividad a ON ap.idA = a.idA
    WHERE a.idI = (SELECT idI FROM api_actividad WHERE idA = NEW.idA)
      AND ap.idAP <> NEW.idAP  -- Ignorar la misma actividad programada (en caso de UPDATE)
      AND tstzrange(ap.fecha_hora, ap.fecha_hora + a.duracion) &&
          tstzrange(NEW.fecha_hora, NEW.fecha_hora + actividad_duracion);

    -- Si hay conflictos, lanzar una excepción
    IF conflictos > 0 THEN
        RAISE EXCEPTION 'El periodo de tiempo para esta actividad programada entra en conflicto con otras actividades programadas para la misma instalación.';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validar_disponibilidad_trigger
BEFORE INSERT OR UPDATE ON api_actividad_programada
FOR EACH ROW
EXECUTE FUNCTION verificar_disponibilidad_instalacion();
