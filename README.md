# Proyecto final Desarrollo Web
## Integrantes: 
* Jared Valenzuela
* Joseph Yépez
* Alejandro Moreira
* Heyer Tinoco
* Juan Gualotuña
* Miguel Paredes

## Prueba de Componentes
### Mensaje de Confirmación:
![image](https://github.com/Miguel-Paredes/examen-final-web/assets/117741739/63ac09d8-f0ee-4b18-b3b9-65b223578a22)

### Llegada del Correo:
![image](https://github.com/Miguel-Paredes/examen-final-web/assets/117741739/bd5c7b4f-b337-43d4-a4da-8ea46dbfeeb1)

### Confirmación del Correo:
![image](https://github.com/Miguel-Paredes/examen-final-web/assets/117741739/578eed46-918e-4f09-8a63-b157e8d981aa)
### Contraseña Olvidada
![image](https://github.com/Miguel-Paredes/examen-final-web/assets/117741739/38cb87e1-7246-49c0-a851-8ab08899f424)
### Confirmar nueva contraseña:
![image](https://github.com/Miguel-Paredes/examen-final-web/assets/117741739/7dc66f50-95d8-452e-b908-8551aa1e057b)
### Inicio de sesion validando  Token:
![image](https://github.com/Miguel-Paredes/examen-final-web/assets/117741739/73bd1206-f89c-4de1-b7de-6e940d4d7523)
### Formulario del registrode pacientes:
![image](https://github.com/Miguel-Paredes/examen-final-web/assets/117741739/737d0433-3718-42c0-bb1f-2eeb921e639f)
### Listar Pacientes:
![image](https://github.com/Miguel-Paredes/examen-final-web/assets/117741739/161f7ce1-643c-4239-ba94-9e5d3f177007)
### Visualizar detalles del paciente:
![image](https://github.com/Miguel-Paredes/examen-final-web/assets/117741739/7ef87efe-d54d-4161-bfaa-b97c81ad4c6a)
### Formulario Actualizar Veterinario:
![image](https://github.com/Miguel-Paredes/examen-final-web/assets/117741739/3e1f5e89-ee73-42d7-adee-7b21dc16ea32)
### Card del veterinario:
![image](https://github.com/Miguel-Paredes/examen-final-web/assets/117741739/f7962f40-7ded-4b18-92dd-994118deeb52)
### Cambio de contraseña:
![image](https://github.com/Miguel-Paredes/examen-final-web/assets/117741739/67554543-61d0-41f1-a69c-2d14eb9cdae9)
### Tratamientos:
![image](https://github.com/Miguel-Paredes/examen-final-web/assets/117741739/e55f46ca-af0a-46c5-b8a8-89f5f7495fe1)

### Pruebas Unitarias FrontEnd
Librerias necesarias para que funcionen las pruebas usando Test React Library junto con Jest
```
npm install --save-dev @testing-library/jest-dom @testing-library/react jest-environment-jsdom
```
![image](https://github.com/Miguel-Paredes/examen-final-web/assets/117741739/831d86bb-36f1-46b4-aec5-ed01bf58b2e7)
#### Resultados: 
![image](https://github.com/Miguel-Paredes/examen-final-web/assets/117741739/a9452b1d-b0dd-44dd-997a-ecdc0e496d93)

### Pruebas Rendimiento FrontEnd
Usamos xk6 para las pruebas con token. 
> [!NOTE]
>
> Es necesario tener instalado go programming language. Y la extension de xk6 para k6-browser

Primero instalamos el modulo que une Grafanna con k6:
```
xk6 build --with github.com/grafana/xk6-dashboard@latest
```
![image](https://github.com/Miguel-Paredes/examen-final-web/assets/117741739/fe1e11d1-1de0-4c3d-a060-68dd6a12499c)

#### Para ejecutar las pruebas normales usaremos en CMD como administrador: 
```
k6.exe run script.js
```
![image](https://github.com/Miguel-Paredes/examen-final-web/assets/117741739/b963b04e-9775-4d05-8811-39e6a6b0ca88)
#### Para ejecutar las pruebas con Grafanna y sean mas visibles. Usamos: 

```
k6.exe run --out web-dashboar script.js
```
![image](https://github.com/Miguel-Paredes/examen-final-web/assets/117741739/efee21f0-7b86-47d0-a0b5-26ca74f54116)
> [!NOTE]
>
> Este reporte se ejecuta en http://127.0.0.1:5665
![image](https://github.com/Miguel-Paredes/examen-final-web/assets/117741739/18936351-abf4-45ec-9a30-f5f71cb03cd2)

