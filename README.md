# Test de Angular de ADOCLIC

## Descripción de la aplicación:

* Login:
	- Formulario de ingreso con validación de email y contraseña.
	Acceso con usuario "user@demo.com" y contraseña "123456" (aca utilice objeto `Map` 
	de tyescript para "mapear" las credenciales que pide la prueba con las que utiliza fakestoreapi y asi poder utilizar esta funcionalidad de esta api tambien)
	- Redirección a la página "Product List" al iniciar sesión correctamente.

* Product List:
	- Obtiene información de la API https://fakestoreapi.com/.
	- Verifica que el usuario esté logeado antes de mostrar la lista.
	- Muestra la lista de productos en una tabla con filtro por categorías.
	- Permite abrir un modal con la información detallada de un producto.
	- Incluye un botón de logout para cerrar sesión.


## Requisitos:

Node.js >= 16.14.0
Angular CLI >= 16.0.0

## Levantando la aplicación:

1. Clonar el repositorio.

```bash
git clone https://github.com/nicolasAguilar180193/AngularTestAdoclic.git
```

2. Instala las dependencias con npm install.

```bash
cd AngularTestAdoclic
npm install
```

3. Inicia la aplicación:
```bash
ng serve
```
4. Acceder a la aplicación en http://localhost:4200.


## Ejecución de pruebas unitarias

Ejecute `ng test` para ejecutar las pruebas unitarias a través de [Karma] (https://karma-runner.github.io). Lo que abrira un navegador con el resultado de la ejeucion.

Si los test se ejecutan correctamente y no falla ninguno se mostrara remarcado en verde la cantidad de test que se ejecutaron y los fallos: `29 specs, 0 failure`. 
Debajo la descripccion de los test en concreto con el siguiente formato:

```
NombreDelComponente:
	* descripccion de la funcionalidad que se esta probando
	* descripccion de otra funcionalida, etc.
```

En caso de fallo se mostrara en rojo: `29 specs, 1 failure`, por ejemplo describiendo que de 29 test hay 1 que fallo.
Debajo una lista con los test que fallaron con el formato:

```
NombreDelComponente > descripccion de la funcionalidad"

"Una descripcion mas detallada del fallo."
```


