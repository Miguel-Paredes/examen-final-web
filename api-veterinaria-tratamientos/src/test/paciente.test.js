import mongoose from 'mongoose';
import Paciente from "../models/Paciente.js"; // Asegúrate de que la ruta sea correcta
import Veterinario from "../models/Veterinario.js"; // Asegúrate de que la ruta sea correcta

import {
    listarPacientes,
    detallePaciente,
    registrarPaciente,
    actualizarPaciente,
    eliminarPaciente

} from "../controllers/paciente_controller.js";

// Configuración de Jest
beforeAll(async () => {
    await mongoose.connect('mongodb://0.0.0.0:27017/testdb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterEach(async () => {
    await Veterinario.deleteMany({});
    await Paciente.deleteMany({});
});

afterAll(async () => {
    await mongoose.connection.close();
});


describe('Controlador de Pacientes', () => {
    it('Debería listar pacientes correctamente', async () => {
        // Crear un paciente de prueba en la base de datos
        const nuevoPaciente = new Paciente({
            nombre: 'Paciente de prueba',
            propietario: 'Propietario de prueba',
            email: 'correo@example.com',
            celular: '123456789',
            convencional: '987654321',
            ingreso: new Date(),
            sintomas: 'Síntomas de prueba',
            veterinario: new mongoose.Types.ObjectId(),
            estado: true,
        });
        await nuevoPaciente.save();

        const req = {
            veterinarianBDD: nuevoPaciente.veterinario, // Simula la variable de veterinarioBDD en la solicitud
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await listarPacientes(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();

    });

    it('Debería obtener el detalle de un paciente', async () => {
        // Crear un paciente de prueba en la base de datos
        const nuevoPaciente = new Paciente({
            nombre: 'Paciente de prueba',
            propietario: 'Propietario de prueba',
            email: 'correo@example.com',
            celular: '123456789',
            convencional: '987654321',
            ingreso: new Date(),
            sintomas: 'Síntomas de prueba',
            veterinario: new mongoose.Types.ObjectId(),
            estado: true,
        });
        await nuevoPaciente.save();

        const req = {
            params: { id: nuevoPaciente._id },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await detallePaciente(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();

    });

    it('Debería registrar un nuevo paciente', async () => {
        // Crear un veterinario de prueba en la base de datos
        const veterinarioPrueba = new Veterinario({
            nombre: 'Veterinario Prueba',
            // Otros campos de veterinario
        });
        await veterinarioPrueba.save();

        const req = {
            body: {
                nombre: 'Paciente de prueba',
                propietario: 'Propietario de prueba',
                email: 'correo@example.com',
                celular: '123456789',
                convencional: '987654321',
                ingreso: new Date(),
                sintomas: 'Síntomas de prueba',
            },
            // Asigna el _id del veterinario de prueba
            veterinarioBDD: {
                _id: veterinarioPrueba._id,
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await registrarPaciente(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ msg: "Registro exitoso del paciente y correo enviado" });
    });

    it('Debería actualizar los datos de un paciente', async () => {
        // Crear un paciente de prueba en la base de datos
        const pacientePrueba = new Paciente({
            nombre: 'Paciente de prueba',
            propietario: 'Propietario de prueba',
            email: 'correo@example.com',
            celular: '123456789',
            convencional: '987654321',
            ingreso: new Date(),
            sintomas: 'Síntomas de prueba',
            veterinario: new mongoose.Types.ObjectId(), // Simula el ID de un veterinario existente
        });

        await pacientePrueba.save(); // Guardar el paciente de prueba en la base de datos

        // Simula una solicitud para actualizar el paciente recién creado
        const req = {
            params: {
                id: pacientePrueba._id, // Usamos el ID del paciente de prueba
            },
            body: {
                nombre: 'Nuevo nombre', // Los nuevos datos que deseas actualizar
                propietario: 'Nuevo propietario',
                // Otros campos que deseas actualizar
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await actualizarPaciente(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ msg: "Actualización exitosa del paciente" });

        // Verifica que los datos se hayan actualizado en la base de datos
        const pacienteActualizado = await Paciente.findById(pacientePrueba._id);
        expect(pacienteActualizado.nombre).toBe('Nuevo nombre');
        expect(pacienteActualizado.propietario).toBe('Nuevo propietario');
        // Verifica otros campos actualizados
    });

    it('Debería cambiar el estado y la fecha de salida de un paciente', async () => {
        // Crear un veterinario de prueba en la base de datos
        const veterinarioPrueba = new Veterinario({
            nombre: 'Veterinario de prueba',
            // Otros campos de veterinario
        });

        // Guardar el veterinario en la base de datos
        await veterinarioPrueba.save();

        // Crear un paciente de prueba en la base de datos
        const pacientePrueba = new Paciente({
            nombre: 'Paciente a cambiar',
            propietario: 'Propietario de prueba',
            email: 'correo@example.com',
            celular: '123456789',
            convencional: '987654321',
            ingreso: new Date(),
            sintomas: 'Síntomas de prueba',
            veterinario: veterinarioPrueba._id, // Asignar el veterinario de prueba
        });

        // Guardar el paciente en la base de datos
        await pacientePrueba.save();

        const req = {
            params: {
                id: pacientePrueba._id, // ID del paciente creado
            },
            body: {
                salida: new Date(), // Agregar una fecha de salida en el cuerpo de la solicitud
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await eliminarPaciente(req, res);

        // Verifica que el paciente haya sido actualizado con el estado y la fecha de salida correctos
        const pacienteActualizado = await Paciente.findById(pacientePrueba._id);
        expect(pacienteActualizado.estado).toBe(false); // Asegura que el estado sea falso
        expect(pacienteActualizado.salida).toBeDefined(); // Asegura que la fecha de salida esté definida
    });


});