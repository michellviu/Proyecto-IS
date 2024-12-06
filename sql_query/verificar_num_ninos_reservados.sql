CREATE OR REPLACE FUNCTION verificar_num_ninos_reservados()
RETURNS TRIGGER AS $$
DECLARE
    suma_ninos INTEGER;
    max_participantes INTEGER;
BEGIN
    -- Calcular la sumatoria de niños en reservaciones confirmadas asociadas a la actividad programada
    SELECT COALESCE(SUM(r.num_ninos), 0) --Asegura que la función no devuelva NULL
    INTO suma_ninos
    FROM api_reservacion r
    WHERE r.idAP = NEW.idAP AND r.estado = 'Confirmada';

    -- Obtener el número máximo de participantes de la actividad programada
    SELECT a.num_participantes
    INTO max_participantes
    FROM api_actividad_programada ap
    INNER JOIN api_actividad a ON ap.idA = a.idA
    WHERE ap.idAP = NEW.idAP;

    -- Ajustar la suma si es una inserción o actualización
    IF TG_OP = 'INSERT' THEN
        suma_ninos := suma_ninos + NEW.num_ninos;
    ELSIF TG_OP = 'UPDATE' THEN
        -- Restar el valor anterior y sumar el nuevo
        suma_ninos := suma_ninos - OLD.num_ninos + NEW.num_ninos;
    END IF;

    -- Verificar si se excede el número máximo de participantes
    IF suma_ninos > max_participantes THEN
        RAISE EXCEPTION 'La sumatoria del número de niños (%) excede el límite permitido de participantes (%) para esta actividad programada.', suma_ninos, max_participantes;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validar_num_ninos_reservados_trigger
BEFORE INSERT OR UPDATE ON api_reservacion
FOR EACH ROW
EXECUTE FUNCTION verificar_num_ninos_reservados();
