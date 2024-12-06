CREATE OR REPLACE FUNCTION verificar_fecha_calificacion()
RETURNS TRIGGER AS $$
DECLARE
    fecha_fin TIMESTAMP;
BEGIN
    -- Obtener el límite superior del periodo de la actividad programada
    SELECT ap.fecha_hora + a.duracion
    INTO fecha_fin
    FROM api_actividad_programada ap
    INNER JOIN api_actividad a ON ap.idA = a.idA
    WHERE ap.idAP = NEW.idAP;

    -- Verificar que la fecha de la calificación sea posterior al límite superior
    IF NEW.fecha <= fecha_fin THEN
        RAISE EXCEPTION 'La fecha de la calificación debe ser posterior al límite superior del periodo de la actividad programada. Fecha calificación: %, Fecha fin actividad: %', NEW.fecha, fecha_fin;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validar_fecha_calificacion_trigger
BEFORE INSERT OR UPDATE ON api_calificacion
FOR EACH ROW
EXECUTE FUNCTION verificar_fecha_calificacion();
