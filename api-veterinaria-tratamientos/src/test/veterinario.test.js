import mongoose from 'mongoose';
import Paciente from "../models/Paciente.js"
import Veterinario from "../models/Veterinario.js"
import {
    // Importar funciones controladoras
    login,
    perfil,
    registro,
    confirmEmail,
    listarVeterinarios,
    detalleVeterinario,
    actualizarPerfil,
    actualizarPassword,
    recuperarPassword,
    comprobarTokenPassword,
    nuevoPassword,
} from "../controllers/veterinario_controller.js";

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

describe('Controlador de Veterinarios', () => {
    it('Debería realizar el inicio de sesión correctamente', async () => {
        // Crear un veterinario de prueba
        const veterinario = new Veterinario({
            nombre: 'Juan',
            apellido: 'Perez',
            email: 'juan.perez@example.com',
            password: 'password123',
            confirmEmail: true
        });
        veterinario.password = await veterinario.encrypPassword(veterinario.password);
        await veterinario.save();

        // Realizar el inicio de sesión
        const req = {
            body: {
                email: 'juan.perez@example.com',
                password: 'password123'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await login(req, res);

        // Verificar que el inicio de sesión fue exitoso
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            nombre: 'Juan',
            apellido: 'Perez',
            direccion: null,
            telefono: null,
            _id: expect.anything(),
            email: 'juan.perez@example.com',
            token: expect.anything()
        });

    });


    it('Debería obtener el perfil del veterinario autenticado', async () => {
        // Crear un veterinario de prueba
        const veterinario = new Veterinario({
            nombre: 'Juan',
            apellido: 'Perez',
            email: 'juan.perez@example.com',
            password: 'password123',
            confirmEmail: true
        });
        veterinario.password = await veterinario.encrypPassword(veterinario.password);
        await veterinario.save();

        // Obtener el perfil del veterinario
        const req = {
            veterinarioBDD: veterinario
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await perfil(req, res);

        // Verificar que se obtuvo el perfil correctamente
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            _id: expect.anything(),
            nombre: 'Juan',
            apellido: 'Perez',
            email: 'juan.perez@example.com',
            status: true,
            direccion: null,
            telefono: null,
        }));
    });
    /*
      it('Debería registrar un nuevo veterinario', async () => {
        // Crear una solicitud simulada con datos de registro
        const req = {
          body: {
            nombre: 'NombrePrueba',
            apellido: 'ApellidoPrueba',
            direccion: 'DirecciónPrueba',
            telefono: 123456789,
            email: 'nuevo@ejemplo.com',
            password: 'passwordPrueba',
          },
        };
    
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
    
        await registro(req, res);
    
        // Verificar si la respuesta es la esperada
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ msg: "Revisa tu correo electrónico para confirmar tu cuenta" });
    
        // Verificar si el veterinario registrado existe en la base de datos
        const veterinarioRegistrado = await Veterinario.findOne({ email: 'nuevo@ejemplo.com' });
        expect(veterinarioRegistrado).toBeTruthy();
    
        // Limpia la base de datos después de la prueba
        await Veterinario.findByIdAndDelete(veterinarioRegistrado._id);
      });;
    
      it('Debería confirmar el correo electrónico del veterinario', async () => {
        // Crear un veterinario de prueba en la base de datos
        const veterinarioPrueba = new Veterinario({
          nombre: 'NombrePrueba',
          apellido: 'ApellidoPrueba',
          email: 'nuevo@ejemplo.com',
          password: 'passwordPrueba',
          token: 'tokenPrueba',
        });
    
        // Guardar el veterinario en la base de datos
        await veterinarioPrueba.save();
    
        // Crear una solicitud simulada con el token de confirmación
        const req = {
          params: {
            token: 'tokenPrueba',
          },
        };
    
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
    
        await confirmEmail(req, res);
    
        // Verificar si la respuesta es la esperada
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ msg: "Token confirmado, ya puedes iniciar sesión" });
    
        // Verificar si el token y la confirmación de correo se han actualizado en la base de datos
        const veterinarioActualizado = await Veterinario.findById(veterinarioPrueba._id);
        expect(veterinarioActualizado.token).toBeNull();
        expect(veterinarioActualizado.confirmEmail).toBe(true);
    
        // Limpia la base de datos después de la prueba
        await Veterinario.findByIdAndDelete(veterinarioPrueba._id);
      });
    
      it('Debería listar veterinarios correctamente', async () => {
        // Crear algunos veterinarios de prueba en la base de datos
        const veterinario1 = new Veterinario({
          nombre: 'Nombre1',
          apellido: 'Apellido1',
          email: 'email1@ejemplo.com',
          password: 'password1',
        });
    
        const veterinario2 = new Veterinario({
          nombre: 'Nombre2',
          apellido: 'Apellido2',
          email: 'email2@ejemplo.com',
          password: 'password2',
        });
    
        await veterinario1.save();
        await veterinario2.save();
    
        // Crear una solicitud simulada
        const req = {};
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
    
        await listarVeterinarios(req, res);
    
        // Verificar si la respuesta es la esperada
        expect(res.status).toHaveBeenCalledWith(200);
        
        // Verificar si la respuesta contiene los veterinarios
        expect(res.json).toHaveBeenCalledWith([
          {
            nombre: 'Nombre1',
            apellido: 'Apellido1',
            email: 'email1@ejemplo.com',
            status: true,
            confirmEmail: false,
          },
          {
            nombre: 'Nombre2',
            apellido: 'Apellido2',
            email: 'email2@ejemplo.com',
            status: true,
            confirmEmail: false,
          },
        ]);
    
        // Limpia la base de datos después de la prueba
        await Veterinario.deleteMany({});
      });
    
      it('Debería listar veterinarios correctamente', async () => {
        // Crear algunos veterinarios de prueba en la base de datos
        const veterinario1 = new Veterinario({
          nombre: 'Nombre1',
          apellido: 'Apellido1',
          email: 'email1@ejemplo.com',
          password: 'password1',
        });
    
        const veterinario2 = new Veterinario({
          nombre: 'Nombre2',
          apellido: 'Apellido2',
          email: 'email2@ejemplo.com',
          password: 'password2',
        });
    
        await veterinario1.save();
        await veterinario2.save();
    
        // Crear una solicitud simulada
        const req = {};
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
    
        await listarVeterinarios(req, res);
    
        // Verificar si la respuesta es la esperada
        expect(res.status).toHaveBeenCalledWith(200);
        
        // Verificar si la respuesta contiene los veterinarios
        expect(res.json).toHaveBeenCalledWith([
          {
            nombre: 'Nombre1',
            apellido: 'Apellido1',
            email: 'email1@ejemplo.com',
            status: true,
            confirmEmail: false,
          },
          {
            nombre: 'Nombre2',
            apellido: 'Apellido2',
            email: 'email2@ejemplo.com',
            status: true,
            confirmEmail: false,
          },
        ]);
    
        // Limpia la base de datos después de la prueba
        await Veterinario.deleteMany({});
      });
    
      it('Debería actualizar el perfil de un veterinario', async () => {
        // Crear un veterinario de prueba en la base de datos
        const veterinarioPrueba = new Veterinario({
          nombre: 'NombrePrueba',
          apellido: 'ApellidoPrueba',
          email: 'emailprueba@ejemplo.com',
          password: 'passwordprueba',
        });
    
        await veterinarioPrueba.save();
    
        // Crear una solicitud simulada
        const req = {
          params: {
            id: veterinarioPrueba._id, // ID del veterinario creado
          },
          body: {
            nombre: 'NuevoNombre',
            apellido: 'NuevoApellido',
            email: 'nuevoemail@ejemplo.com',
            direccion: 'NuevaDireccion',
            telefono: '1234567890',
          },
        };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
    
        await actualizarPerfil(req, res);
    
        // Verificar si la respuesta es la esperada
        expect(res.status).toHaveBeenCalledWith(200);
        
        // Verificar si la respuesta contiene el mensaje de perfil actualizado
        expect(res.json).toHaveBeenCalledWith({
          msg: "Perfil actualizado correctamente",
        });
    
        // Obtener el veterinario actualizado desde la base de datos
        const veterinarioActualizado = await Veterinario.findById(veterinarioPrueba._id);
    
        // Verificar si el perfil se actualizó correctamente
        expect(veterinarioActualizado.nombre).toBe('NuevoNombre');
        expect(veterinarioActualizado.apellido).toBe('NuevoApellido');
        expect(veterinarioActualizado.email).toBe('nuevoemail@ejemplo.com');
        expect(veterinarioActualizado.direccion).toBe('NuevaDireccion');
        expect(veterinarioActualizado.telefono).toBe('1234567890');
    
        // Limpia la base de datos después de la prueba
        await Veterinario.findByIdAndDelete(veterinarioPrueba._id);
      });
    
      it('Debería actualizar la contraseña de un veterinario', async () => {
        // Agregar código de prueba aquí
      });
    
      it('Debería enviar un correo de recuperación de contraseña', async () => {
        // Agregar código de prueba aquí
      });
    
      it('Debería comprobar la validez del token de recuperación de contraseña', async () => {
        // Agregar código de prueba aquí
      });
    
      it('Debería establecer una nueva contraseña para el veterinario', async () => {
        // Agregar código de prueba aquí
      });
    
      */
});