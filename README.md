# Backend-2024
### Alumno: Eric Gerzenstein
### Profesor: Ignacio Vigilante

### TP 01
```sql
#Tabla de Barcos:
#1) 
SELECT * FROM barcos
ORDER BY Patente;
#2)
SELECT * FROM barcos
LIMIT 2;
#3)
INSERT INTO barcos (Patente, Vela, Lugar, Tipo_Tamaño, Tipo_Color, Tipo_Marca, Marina)
VALUES ('REY0001463', 'ARG24025', 56, 9, 'ROJO', 'TROPHY', 4); 
#4)
UPDATE barcos SET Lugar = 90 WHERE Patente = 'REY0001213';
UPDATE barcos SET Lugar = 41 WHERE Patente = 'REY0001228';
#5)
DELETE FROM barcos WHERE Patente = 'REY0001228';

#Tabla de Socios:
#1)
SELECT * FROM socios
ORDER BY DNI;
#2)
SELECT * FROM socios
LIMIT 2;
#3)
INSERT INTO socios (DNI, Nombre, Apellido, Edad)
VALUES (40214942, 'Eitan', 'Trajataman', 24); 
#4)
UPDATE socios SET Edad = 30 WHERE DNI = 40214942;
UPDATE socios SET Edad = 25 WHERE DNI = 34214094;
#5)
DELETE FROM socios WHERE DNI = 40214942;

#Tabla de Marina:
#1)
SELECT * FROM marina
ORDER BY DNI_Marinero;
#2)
SELECT * FROM marina
LIMIT 2;
#3)
INSERT INTO marina (Número, Lugares, Registros, Servicios, DNI_Marinero, Nombre_Marinero, Apellido_Marniero, Horarios_Marinero)
VALUES (4, '100, 101, 102, 103', 'Hoy chocaron dos barcos a las 10 de la mañana.', 'Pintado', '20546413', 'Felipe', 'Crespo', '8-16');
#4)
UPDATE marina SET Apellido_Marinero = 'Teuly' WHERE DNI = 28531953;
UPDATE marina SET Apellido_Marinero = 'Kogan' WHERE DNI = 35583090;
#5)
DELETE FROM marina WHERE DNI_Marinero = 20546413;
```
