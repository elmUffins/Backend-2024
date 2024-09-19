import pedidosService from "../services/pedidos.service.js";
import PedidosService from "../services/pedidos.service.js";

const getPedidos = async (req, res) => {
    // --------------- COMPLETAR ---------------
    try {
        const pedidos = await PedidosService.getPedidos();
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener todos los pedidos
            2. Devolver un json con los pedidos (status 200)
            3. Devolver un mensaje de error si algo falló (status 500)
        
    */
};

const getPedidosByUser = async (req, res) => {
    // --------------- COMPLETAR ---------------
    const { user } = req.body;

    if (!user) return res.status(400).json({ message: "Se necesita un usuario" });

    try {
        const pedidos = await PedidosService.getPedidoByUser(user);
        if (!pedidos) {
            res.json([]);
        }
        else {
            res.json(pedidos);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener los pedidos del usuario
            2. Si el usuario no tiene pedidos, devolver una lista vacía
            3. Si el usuario tiene pedidos, devolver un json con los pedidos (status 200)
            4. Devolver un mensaje de error si algo falló (status 500)
        
    */
};

const getPedidoById = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "Se necesita un ID" });

    try {
        const pedidos = await PedidosService.getPedidoById(id);
        if (!pedidos)
            return res.status(404).json({ message: "Pedido no encontrado" });
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, devolver un json con el pedido (status 200)
            4. Devolver un mensaje de error si algo falló (status 500)
        
    */
};

const createPedido = async (req, res) => {
    // --------------- COMPLETAR ---------------
    try {
        const { platos } = req.body;

        if (!platos) {
            return res.status(400).json({ message: "Falta el campo 'platos'" });
        }

        if (!Array.isArray(platos)) {
            return res.status(400).json({ message: "El campo 'platos' debe ser un array" });
        }

        if (platos.length < 1) {
            return res.status(400).json({ message: "El array de 'platos' debe tener al menos un plato" });
        }

        for (let plato of platos) {
            if (!plato.id || !plato.cantidad) {
                return res.status(400).json({ 
                    message: "Todos los platos deben tener un id y una cantidad" 
                });
            }
        }
        const idUsuario = req.user.id;
        const pedido = await PedidosService.createPedido(idUsuario, platos);

        return res.status(201).json({
            message: "Pedido creado exitosamente",
            pedido: pedido
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error al crear el pedido",
            error: error.message
        });
    }
     /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el body de la request tenga el campo platos
            2. Verificar que el campo productos sea un array
            3. Verificar que el array de productos tenga al menos un producto
            4. Verificar que todos los productos tengan un id y una cantidad
            5. Si algo de lo anterior no se cumple, devolver un mensaje de error (status 400)
            6. Crear un pedido con los productos recibidos y el id del usuario (utilizando el servicio de pedidos)
            7. Devolver un mensaje de éxito (status 201)
            8. Devolver un mensaje de error si algo falló (status 500)
        
    */
};

const aceptarPedido = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "Se necesita un ID" });

    try {
        const pedido = await PedidosService.getPedidoById(id);
        if (!pedido) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }

        if (pedido.estado !== "pendiente") {
            return res.status(400).json({ message: "El pedido no está en estado pendiente" });
        }

        pedido.estado = "aceptado";
        await PedidosService.updatePedido(pedido);

        res.status(200).json({ message: "Pedido aceptado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    // --------------- COMPLETAR ---------------

    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, verificar que el pedido esté en estado "pendiente"
            4. Si el pedido no está en estado "pendiente", devolver un mensaje de error (status 400)
            5. Si el pedido está en estado "pendiente", actualizar el estado del pedido a "aceptado"
            6. Devolver un mensaje de éxito (status 200)
            7. Devolver un mensaje de error si algo falló (status 500)
        
    */
};

const comenzarPedido = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "Se necesita un ID" });

    try {
        const pedido = await PedidosService.getPedidoById(id);
        if (!pedido) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }

        if (pedido.estado !== "aceptado") {
            return res.status(400).json({ message: "El pedido no está en estado aceptado" });
        }

        else {
            pedido.estado = "en camino";
            await PedidosService.updatePedido(pedido);
            res.status(200).json({ message: "Pedido en camino" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, verificar que el pedido esté en estado "aceptado"
            4. Si el pedido no está en estado "aceptado", devolver un mensaje de error (status 400)
            5. Si el pedido está en estado "aceptado", actualizar el estado del pedido a "en camino"
            6. Devolver un mensaje de éxito (status 200)
            7. Devolver un mensaje de error si algo falló (status 500)
        
    */
};

const entregarPedido = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "Se necesita un ID" });

    try {
        const pedido = await PedidosService.getPedidoById(id);
        if (!pedido) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }

        if (pedido.estado !== "en camino") {
            return res.status(400).json({ message: "El pedido no está en estado en camino" });
        }

        else {
            pedido.estado = "entregado";
            await PedidosService.updatePedido(pedido);
            res.status(200).json({ message: "Pedido entregado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, verificar que el pedido esté en estado "en camino"
            4. Si el pedido no está en estado "en camino", devolver un mensaje de error (status 400)
            5. Si el pedido está en estado "en camino", actualizar el estado del pedido a "entregado"
            6. Devolver un mensaje de éxito (status 200)
            7. Devolver un mensaje de error si algo falló (status 500)
        
    */
};

const deletePedido = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "Se necesita un ID" });

    try {
        const pedido = await PedidosService.getPedidoById(id);
        if (!pedido) {
            return res.status(404).json({message: "Pedido no encontrado"});
        }
        else {
            await PedidosService.deletePedido(id);
            res.status(200).json({ message: "Pedido eliminado" });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, eliminar el pedido
            4. Devolver un mensaje de éxito (status 200)
            5. Devolver un mensaje de error si algo falló (status 500)
        
    */
};

export default {
    getPedidos,
    getPedidosByUser,
    getPedidoById,
    createPedido,
    aceptarPedido,
    comenzarPedido,
    entregarPedido,
    deletePedido,
};
