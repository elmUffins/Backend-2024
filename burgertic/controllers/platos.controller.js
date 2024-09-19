import PlatosService from "../services/platos.service.js";

const getPlatos = async (req, res) => {
    try {
        const platos = await PlatosService.getPlatos();
        res.json(platos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPlatoById = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "Se necesita un ID" });

    try {
        const plato = await PlatosService.getPlatoById(id);
        if (!plato)
            return res.status(404).json({ message: "Plato no encontrado" });
        res.json(plato);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createPlato = async (req, res) => {
    const plato = req.body;

    if (!plato)
        return res.status(400).json({ message: "Se necesita un plato" });

    if (!plato.tipo || !plato.nombre || !plato.precio || !plato.descripcion)
        return res.status(400).json({ message: "Faltan campos por llenar" });

    try {
        await PlatosService.createPlato(plato);
        res.json({ message: "Plato creado con éxito" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updatePlato = async (req, res) => {
    const { id } = req.params;
    const plato = req.body;

    if (!id || !plato)
        return res
            .status(400)
            .json({ message: "Se necesita un ID y un plato" });

    if (!plato.tipo || !plato.nombre || !plato.precio || !plato.descripcion)
        return res.status(400).json({ message: "Faltan campos por llenar" });

    try {
        await PlatosService.updatePlato(id, plato);
        res.json({ message: "Plato actualizado con éxito" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deletePlato = async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "Se necesita un ID" });

    try {
        await PlatosService.deletePlato(id);
        res.json({ message: "Plato eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPlatosByTipo = async (req, res) => {
    const { tipo } = req.params;

    if (!tipo) return res.status(400).json({ message: "Se necesita un tipo" });

    if (tipo !== "principal" && tipo !== "combo" && tipo !== "postre")
        return res.status(400).json({ message: "Tipo no válido" });

    try {
        const platos = await PlatosService.getPlatosByTipo(tipo);
        res.json(platos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default {
    getPlatos,
    getPlatoById,
    createPlato,
    updatePlato,
    deletePlato,
    getPlatosByTipo,
};
