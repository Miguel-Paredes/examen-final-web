# Proyecto final Desarrollo Web
## Integrantes: 
* Jared Valenzuela
* Joseph Yépez
* Alejandro Moreira
* Heyer Tinoco
* Juan Gualotuña
* Miguel Paredes


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

