import React from "react";
import {render} from "@testing-library/react";
import '@testing-library/jest-dom';
import Mensaje from "../componets/Alertas/Mensaje";

describe('Mensaje', () => {
    test('renderiza correctamente el contenido', () => {
        render(<Mensaje tipo={true}>Este es un mensaje de éxito</Mensaje>);
        render(<Mensaje tipo={false}>Este es un mensaje de error</Mensaje>);
    });

    test('aplica las clases CSS correctamente', () => {
        const exito = render(<Mensaje tipo={true}>Este es un mensaje de éxito</Mensaje>);
        expect(exito.container.firstChild).toHaveClass('border-green-500');

        const error = render(<Mensaje tipo={false}>Este es un mensaje de error</Mensaje>);
        expect(error.container.firstChild).toHaveClass('border-red-500');
    });

    test('muestra correctamente el contenido del mensaje', () => {
        const { getByText } = render(<Mensaje tipo={true}>Este es un mensaje de éxito</Mensaje>);
        expect(getByText('Este es un mensaje de éxito')).toBeInTheDocument();

        const { getByText: getByTextError } = render(<Mensaje tipo={false}>Este es un mensaje de error</Mensaje>);
        expect(getByTextError('Este es un mensaje de error')).toBeInTheDocument();
    });

        
});
