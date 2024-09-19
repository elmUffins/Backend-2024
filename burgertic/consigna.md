# BurgerTIC

En este trabajo práctico realizaremos una REST API para un restaurant de comida rápida "**BurgerTIC**". Utilizaremos `express` ([cheatsheet](https://cheatsheets-nv.vercel.app/cheatsheet/express)), `postgres` ([cheatsheet](https://cheatsheets-nv.vercel.app/cheatsheet/postgres)), `jwt` y `bcryptjs`.

## Grupos

Los grupos serán de mínimo 2 y máximo 3 integrantes.

## Consigna

La REST API que realicen deberá seguir las pautas que se exponen a continuación. Se ruega prestar atención a que cumpla tanto con los valores correctos como con el formato específico. En este trabajo práctico se tendrá en cuenta, además, que los _status codes_ sean los adecuados para cada respuesta posible y que se haga _error handling_, es decir, la API debe ser robusta y cubrir los casos donde la _request_ sea incorrecta (ej.: pedimos un plato con un id que no existe, queremos crear un plato y mandamos menos campos de los necesarios, etc).

Ofrecemos una estructura a modo de _boilerplate_ del proyecto así no necesitan crear todo desde cero. No es necesario que la utilicen, pero sin dudas es recomendable. También brindamos el archivo `.sql` de la base de datos ya estructurada y populada.

### Base de datos

La base de datos de **BurgerTIC** consiste de las siguientes tablas:

#### Platos

| Nombre        | Tipo           | Extra                            |
| ------------- | -------------- | -------------------------------- |
| `id`          | `int`          | `PK`, `AI`                       |
| `tipo`        | `varchar(20)`  | ("principal", "combo", "postre") |
| `nombre`      | `varchar(70)`  |                                  |
| `precio`      | `int`          |                                  |
| `descripcion` | `varchar(400)` |                                  |

#### Usuarios

| Nombre     | Tipo           | Extra      |
| ---------- | -------------- | ---------- |
| `id`       | `int`          | `PK`, `AI` |
| `nombre`   | `varchar(50)`  |            |
| `apellido` | `varchar(50)`  |            |
| `email`    | `varchar(256)` |            |
| `password` | `varchar(256)` |            |
| `admin`    | `boolean`      |            |

#### Pedidos

| Nombre       | Tipo          | Extra                                               |
| ------------ | ------------- | --------------------------------------------------- |
| `id`         | `int`         | `PK`, `AI`                                          |
| `id_usuario` | `int`         | `FK`                                                |
| `fecha`      | `date`        |                                                     |
| `estado`     | `varchar(50)` | ("pendiente", "aceptado", "en camino", "entregado") |

#### PlatosXPedidos

| Nombre      | Tipo  | Extra      |
| ----------- | ----- | ---------- |
| `id`        | `int` | `PK`, `AI` |
| `id_pedido` | `int` | `FK`       |
| `id_plato`  | `int` | `FK`       |
| `cantidad`  | `int` |            |

### API

La API a realizar consistirá de 3 partes:

- Platos
- Usuarios/Autenticación
- Pedidos

#### API - Platos

| Método   | Ruta                 | Acción                                                         | Nivel de acceso |
| -------- | -------------------- | -------------------------------------------------------------- | --------------- |
| `GET`    | `/platos`            | Devuelve la lista de todos los platos                          | Público         |
| `GET`    | `/platos/:id`        | Devuelve la información del plato con el id especificado       | Público         |
| `GET`    | `/platos/tipo/:tipo` | Devuelve la información de los platos con el tipo especificado | Público         |
| `POST`   | `/platos`            | Crea un nuevo plato                                            | Admin           |
| `PUT`    | `/platos/:id`        | Modifica la información del plato con el id especificado       | Admin           |
| `DELETE` | `/platos/:id`        | Elimina el plato con el id especificado                        | Admin           |

##### Ejemplo de plato

```json
{
    "id": 1,
    "tipo": "principal",
    "nombre": "Hamburguesa",
    "precio": 300,
    "descripcion": "Hamburguesa de carne con lechuga, tomate y queso"
}
```

Esta sección de la API ya se encuentra completamente implementada en el _boilerplate_ que les ofrecemos. Pueden utilizarla como referencia para implementar las otras secciones.

#### API - Usuarios/Autenticación

| Método | Ruta             | Acción                | Nivel de acceso |
| ------ | ---------------- | --------------------- | --------------- |
| `POST` | `/auth/register` | Crea un nuevo usuario | Público         |
| `POST` | `/auth/login`    | Autentica un usuario  | Público         |

##### Ejemplo de usuario

```json
{
    "id": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "juanperez@gmail.com",
    "password": "123456"
}
```

**Obs. 1**: El campo `email` debe ser único. Si se intenta crear un usuario con un email que ya existe, se debe devolver un error.

**Obs. 2**: El campo `password` debe ser hasheado antes de ser almacenado en la base de datos. Para esto, se debe utilizar `bcrypt`. Al autenticar un usuario, se debe comparar el password enviado con el password hasheado almacenado en la base de datos. Si no coinciden, se debe devolver un error.

**Obs. 3**: Al autenticar un usuario, se debe devolver un token `jwt` de autenticación. Este token debe ser enviado en el header `Authorization` de las rutas protegidas. El token debe tener una duración de 30 minutos. Si el token expira, se debe devolver un error 401. El formato del payload token será: `{ id: <id_del_usuario> }`.

**Obs. 4**: La ruta `/register` no debe estar protegida por autenticación. La ruta `/login` tampoco, obviamente.

**Obs. 5**: Al crear un usuario, su campo admin debe ser `false`. La única forma de crear un usuario admin es desde la propia base de datos.

#### API - Pedidos

| Método   | Ruta                    | Acción                                                                                       | Nivel de acceso     |
| -------- | ----------------------- | -------------------------------------------------------------------------------------------- | ------------------- |
| `GET`    | `/pedidos`              | Devuelve la lista de todos los pedidos                                                       | Admin               |
| `GET`    | `/pedidos/usuario`      | Devuelve la información de los pedidos del usuario que realiza la request                    | Usuario autenticado |
| `GET`    | `/pedidos/:id`          | Devuelve la información del pedido con el id especificado                                    | Admin               |
| `POST`   | `/pedidos`              | Crea un nuevo pedido                                                                         | Usuario autenticado |
| `PUT`    | `/pedidos/:id/aceptar`  | Modifica la información del pedido con el id especificado, cambiando su estado a "aceptado"  | Admin               |
| `PUT`    | `/pedidos/:id/comenzar` | Modifica la información del pedido con el id especificado, cambiando su estado a "en camino" | Admin               |
| `PUT`    | `/pedidos/:id/entregar` | Modifica la información del pedido con el id especificado, cambiando su estado a "entregado" | Admin               |
| `DELETE` | `/pedidos/:id`          | Elimina el pedido con el id especificado                                                     | Admin               |

##### Ejemplo de pedido

```json
{
    "id": 1,
    "id_usuario": 1,
    "fecha": "2021-10-15",
    "estado": "pendiente",
    "platos": [
        {
            "id": 1,
            "cantidad": 2
        },
        {
            "id": 2,
            "cantidad": 1
        }
    ]
}
```

**Obs. 1**: El campo `id_usuario` debe ser el id de un usuario existente. Si se intenta crear un pedido con un id de usuario que no existe, se debe devolver un error. Además, éste debe ser el id del usuario autenticado, es decir, un usuario no puede crear un pedido para otro usuario. Para esto, se debe utilizar el `id` que se envía en el payload del token `jwt`.

**Obs. 2**: Al crear un pedido, la fecha y el estado no se envían en el body. La fecha debe ser la fecha actual y el estado debe ser "pendiente". El body consistirá únicamente de un objeto que por dentro tendrá un atributo "platos", que será un array de objetos con los campos `id` y `cantidad` de los platos que se quieren pedir.

**Obs. 3**: La acción de eliminar un pedido y las acciones para modificar su estado solo pueden ser realizadas por un usuario autenticado y con el rol de admin.

#### Cosas a tener en cuenta en la implementación

##### Mensajes de éxito y error

Los mensajes de éxito y error **NO** deben ser enviados como texto mediante `res.send()`. Deben ser enviados como objetos JSON con la siguiente estructura:

```json
{
    "message": "Mensaje de éxito o error"
}
```

Utilizar el _status code_ adecuado para cada caso.

### Entrega

El formato de entrega se definirá más adelante. La fecha límite de entrega será el día 20/09/2024 a las 23:59hs. La corrección será acompañada de una defensa oral en el caso en que el docente lo considere necesario, que se realizará en la semana posterior a la entrega.
