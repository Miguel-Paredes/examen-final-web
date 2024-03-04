import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ModalTratamiento from '../components/ModalTratamiento';

// Mock del contexto TratamientosContext
jest.mock('../../context/TratamientosProvider', () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe('ModalTratamiento', () => {
    it('debe enviar el formulario correctamente al hacer clic en el botón de Registrar', async () => {
        // Mock de las funciones del contexto TratamientosContext
        const mockSetModal = jest.fn();
        const mockRegistrarTratamientos = jest.fn();

        // Mock de la función useContext
        jest.mock('react', () => ({
            ...jest.requireActual('react'),
            useContext: jest.fn().mockReturnValue({
                setModal: mockSetModal,
                handleModal: jest.fn(),
                registrarTratamientos: mockRegistrarTratamientos
            })
        }));

        // Renderiza el componente
        const { getByLabelText, getByText } = render(
            <ModalTratamiento idPaciente="1" />
        );

        // Simula la entrada de datos en los campos del formulario
        fireEvent.change(getByLabelText('Nombre:'), { target: { value: 'Tratamiento X' } });
        fireEvent.change(getByLabelText('Descripción:'), { target: { value: 'Descripción del tratamiento X' } });
        fireEvent.change(getByLabelText('Prioridad:'), { target: { value: 'Alta' } });

        // Simula el envío del formulario
        fireEvent.click(getByText('Registrar'));

        // Espera a que se envíe el formulario
        await waitFor(() => {
            // Verifica que la función registrarTratamientos haya sido llamada con los datos correctos
            expect(mockRegistrarTratamientos).toHaveBeenCalledWith({
                nombre: 'Tratamiento X',
                descripcion: 'Descripción del tratamiento X',
                prioridad: 'Alta',
                paciente: '1'
            });

            // Verifica que la función setModal también haya sido llamada para cerrar el modal después de enviar el formulario
            expect(mockSetModal).toHaveBeenCalledWith(false);
        });
    });
});