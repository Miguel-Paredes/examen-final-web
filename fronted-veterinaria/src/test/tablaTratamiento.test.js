import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TablaTratamientos from '../components/TablaTratamientos';

// Mock de contextos
jest.mock('../context/AuthProvider', () => ({
  __esModule: true,
  default: jest.fn(),
  useContext: jest.fn().mockReturnValue({ auth: { rol: 'veterinario' } })
}));

jest.mock('../context/TratamientosProvider', () => ({
  __esModule: true,
  default: jest.fn(),
  useContext: jest.fn().mockReturnValue({
    handleDelete: jest.fn(),
    handleStatus: jest.fn()
  })
}));

describe('TablaTratamientos', () => {
  const tratamientos = [
    { _id: 1, nombre: 'Tratamiento 1', descripcion: 'Descripción 1', prioridad: 'Alta', estado: true },
    { _id: 2, nombre: 'Tratamiento 2', descripcion: 'Descripción 2', prioridad: 'Baja', estado: false }
  ];

  it('renders tratamientos correctly', () => {
    render(<TablaTratamientos tratamientos={tratamientos} />);
    
    // Verifica que los tratamientos se rendericen correctamente en la tabla
    expect(screen.getByText('Tratamiento 1')).toBeInTheDocument();
    expect(screen.getByText('Tratamiento 2')).toBeInTheDocument();
    expect(screen.getByText('Descripción 1')).toBeInTheDocument();
    expect(screen.getByText('Descripción 2')).toBeInTheDocument();
    expect(screen.getByText('Alta')).toBeInTheDocument();
    expect(screen.getByText('Baja')).toBeInTheDocument();
    expect(screen.getByText('activo')).toBeInTheDocument();

    // Verifica que los iconos de acciones estén presentes
    expect(screen.getAllByRole('img')).toHaveLength(6);
  });

  it('calls handleDelete when delete icon is clicked', () => {
    const handleDelete = jest.fn();
    const handleStatus = jest.fn();
    const context = { handleDelete, handleStatus };
    render(<TablaTratamientos tratamientos={tratamientos} />, { context });
    
    // Simula hacer clic en el icono de eliminación de un tratamiento
    userEvent.click(screen.getAllByRole('img', { name: 'delete' })[0]);
    
    // Verifica que la función handleDelete haya sido llamada con el ID correcto del tratamiento
    expect(handleDelete).toHaveBeenCalledWith(1);
  });

  it('calls handleStatus when status icon is clicked', () => {
    const handleDelete = jest.fn();
    const handleStatus = jest.fn();
    const context = { handleDelete, handleStatus };
    render(<TablaTratamientos tratamientos={tratamientos} />, { context });
    
    // Simula hacer clic en el icono de cambio de estado de un tratamiento
    userEvent.click(screen.getAllByRole('img', { name: 'status' })[0]);
    
    // Verifica que la función handleStatus haya sido llamada con el ID correcto del tratamiento
    expect(handleStatus).toHaveBeenCalledWith(1);
  });
});