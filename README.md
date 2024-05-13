# Backend-2024
### Alumno: Eric Gerzenstein
### Profesor: Ignacio Vigilante

# Sección SQL
## TP 01
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

### TP 02
```sql
# 1)
SELECT e.dni, e.nombre, e.apellido, s.nombre AS nombre_sector
FROM empleado e
JOIN sector s ON e.id_sector = s.id;

# 2)
SELECT id, nombre, superficie 
FROM sala
ORDER BY superficie DESC
LIMIT 3;

# 3)
SELECT e.nombre, e.apellido, t.numero
FROM empleado e
LEFT JOIN telefono t ON e.dni = t.dni_duenio 
WHERE id_sector = 1

# 4)
INSERT INTO empleado (dni, nombre, apellido, email, id_sector)
VALUES (40216465, "Alfredo", "García", "alfregar@gmail.com", 4)

# 5)
SELECT z.*, s.nombre, s.apellido_jefe
FROM sala z
LEFT JOIN sector s ON id_sector = s.id

# 6)
UPDATE sector SET email_jefe = "gmedina@simuladores.com.ar" WHERE dni_jefe = 13954782;
UPDATE sector SET email_jefe = "plampone@simuladores.com.ar" WHERE dni_jefe = 13239854;
UPDATE sector SET email_jefe = "msantos@simuladores.com.ar" WHERE dni_jefe = 12893574;
UPDATE sector SET email_jefe = "eravenna@simuladores.com.ar" WHERE dni_jefe = 14539029;

# 7)
DELETE FROM telefono WHERE dni_duenio = 8578124;
DELETE FROM empleado WHERE dni = 8578124;

# 8)
UPDATE empleado SET id_sector = 3 WHERE dni = 43182902;

# 9)
SELECT e.*, s.nombre, s.apellido_jefe
FROM empleado e 
JOIN sector s ON e.id_sector = s.id #No hay número de teléfono de los jefes en la tabla
WHERE dni = 18354680

# 10)
DELETE FROM telefono WHERE dni_duenio = 18354680;
DELETE FROM empleado WHERE dni = 18354680;
INSERT INTO empleado (dni, nombre, apellido, email, id_sector)
VALUES (32463195, "Manuel", "Coppa", "manuelcoppa2@gmail.com", 2);
INSERT INTO telefono (numero, dni_duenio)
VALUES (1167568673, 32463195); 

# BONUS 1
# Esta instrucción permite crear una tabla mediante el uso de 'CREATE TABLE'
# Allí se pueden insertar emails y vincular a DNIs existentes en la tabla 'empleado'
CREATE TABLE email (
    email VARCHAR(255),
    dni_empleado INT,
    FOREIGN KEY (dni_empleado) REFERENCES empleado(dni)
);

# BONUS 2
# Averiguamos que utilizar 'SUM()' suma todos los valores de una columna, permitiendo hacer un total
SELECT SUM(superficie) AS suma_superficies
FROM sala;

```
# Sección Javascript
## TP 01
### Ejercicio 1
```js
let alumno = [
    {
        nombre: "Lewis",
        apellido: "Hamilton",
        dni: 48111111,
        anio: 4,
        curso: "A",
        nota: 8,
    },

    {
        nombre: "Rodrigo",
        apellido: "Aliendro",
        dni: 48222222,
        anio: 4,
        curso: "A",
        nota: 10,
    },

    {
        nombre: "Mauricio",
        apellido: "Macri",
        dni: 48333333,
        anio: 4,
        curso: "B",
        nota: 7,
    },

    {
        nombre: "Tomás",
        apellido: "Mondrik",
        dni: 48444444,
        anio: 4,
        curso: "B",
        nota: 10,
    },

    {
        nombre: "Martín",
        apellido: "Demichelis",
        dni: 48555555,
        anio: 5,
        curso: "A",
        nota: 8,
    },

    {
        nombre: "Diego",
        apellido: "Martinez",
        dni: 48666666,
        anio: 5,
        curso: "A",
        nota: 1,
    },

    {
        nombre: "Luis",
        apellido: "Advíncula",
        dni: 48777777,
        anio: 3,
        curso: "B",
        nota: 3,
    },

    {
        nombre: "Martín",
        apellido: "Urinovsky",
        dni: 46345678,
        anio: 3,
        curso: "B",
        nota: 5,
    }
]

```
# Ejercicio 2
```js
function capitalizar(string){
    return string.charAt(0).toUpperCase() + string.slice(1)
}

console.log(capitalizar("bobo"))
```
