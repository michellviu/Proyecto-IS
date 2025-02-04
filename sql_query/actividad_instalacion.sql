-- Paso 1: Crear la función de validación
CREATE OR REPLACE FUNCTION verificar_capacidad()
RETURNS TRIGGER AS $$
BEGIN
    -- Verifica que el número de participantes no supere la capacidad de la instalación
    IF NEW.num_participantes > (SELECT capacidad FROM api_instalacion WHERE idI = NEW.idI) THEN
        RAISE EXCEPTION 'El número de participantes (%), supera la capacidad de la instalación (%)',
        NEW.num_participantes, (SELECT capacidad FROM api_instalacion WHERE idI = NEW.idI);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Paso 2: Crear el trigger
CREATE TRIGGER validar_capacidad_trigger
BEFORE INSERT OR UPDATE ON api_actividad
FOR EACH ROW
EXECUTE FUNCTION verificar_capacidad();