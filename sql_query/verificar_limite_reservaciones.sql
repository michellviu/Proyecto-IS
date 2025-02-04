CREATE OR REPLACE FUNCTION verificar_limite_reservaciones()
RETURNS TRIGGER AS $$
BEGIN
    -- Contar las reservaciones existentes para el mismo padre, actividad programada y día
    IF (
        SELECT COUNT(*)
        FROM api_reservacion r
        WHERE r.idP = NEW.idP
          AND r.idAP = NEW.idAP
          AND DATE(r.fecha_hora) = DATE(NEW.fecha_hora)
    ) >= 3 THEN
        -- Lanzar una excepción si ya existen 3 o más reservaciones
        RAISE EXCEPTION 'Un padre no puede realizar más de 3 reservaciones para la misma actividad programada en un día.';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_limite_reservaciones
BEFORE INSERT ON api_reservacion
FOR EACH ROW
EXECUTE FUNCTION verificar_limite_reservaciones();