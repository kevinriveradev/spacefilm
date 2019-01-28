# Fullstack test for Spacefit

El objetivo de la prueba era crear una pagina web de peliculas en la que los usuarios pudieran registrarse, ver peliculas, actores y ademas los usuarios podrian guardar sus peliculas favoritas.

* Instalacion del backend:  

1-Nos descargamos el proyecto y dentro de la carpeta BACKEND vamos a config/config.js y modificamos lo campos
con nuestros datos de nuestro gestor de bases de datos. <br />
2-Creamos una base de datos con el nombre 'spacefilm', esta tiene que coincidir con el nombre puesto en el campo de config.js.
3-Dentro de la carpeta raiz de backend en una terminal vamos ejecutando los siguientes comandos.<br />
  -npm install<br />
  -node_modules/.bin/sequelize db:migrate <br />
  -node_modules/.bin/sequelize db:seed:all <br />
4-Para arrancar el backend simplemente ejecutamos.<br />
  -npm start<br />

* Instalacion del frontend:
 <br />
 1.Dentro de la carpeta raiz front ejecutamos el comando.
  <br />
  -npm install
  <br />
 2.Con esto ya tendriamos instaladas las dependencias del proyecto,
 bastaria con hacer un npm start para arrancar el proyecto.
  <br />
3-automaticamente se te abrira una ventana del navegador con la pantalla principal de la pagina.
  Registrate.
  
  
