# Memòria tècnica del backend

## 1. Resum de l’aplicació

Aquesta aplicació és un panell de control web dissenyat per a la gestió de productes, clients, comandes, marques i categories en un entorn d’e-commerce. Permet l’autenticació d’usuaris i l’administració, creació, edició i eliminació dels diferents elements del sistema de forma segura i centralitzada.

---

## 2. Tecnologies utilitzades en el backend

- **Node.js:** Plataforma JavaScript per a l’entorn servidor, emprada per desenvolupar aplicacions ràpides i escalables.
- **Express.js:** Framework lleuger per a Node.js que facilita la creació d’APIs REST, la gestió de rutes i de peticions/respostes HTTP.
- **MongoDB:** Base de dades NoSQL de tipus document, molt flexible i adequada per a l’escalabilitat i la gestió de dades dinàmiques.
- **Mongoose:** Llibreria ODM (Object Data Modeling) per a Node.js i MongoDB, que facilita la definició d’esquemes, validacions i operacions CRUD amb la base de dades.
- **JWT (JSON Web Tokens):** Per a l’autenticació segura i la gestió de sessions, protegint les rutes privades del backend.
- **bcrypt:** Per a l’encriptació segura de contrasenyes dels usuaris abans de guardar-les a la base de dades.
- **CORS:** Middleware per a la gestió de les polítiques d’accés entre dominis distints (Cross-Origin Resource Sharing).
- **Dotenv:** Gestor de variables d’entorn per mantenir segures les credencials i la configuració sensible.

---

## 3. Resum de l’arquitectura i funcionament

- El backend està desenvolupat amb Node.js i Express.js com a marc principal.
- La gestió de dades es realitza mitjançant models en Mongoose (usuaris, productes, clients, comandes, marques, categories...).
- L’autenticació d’usuaris i la protecció de les rutes privades es fa mitjançant JWT.
- El backend exposa endpoints de tipus RESTful compatibles amb qualsevol frontend, i permet operacions CRUD completes amb tots els models.
- La base de dades MongoDB conté tota la informació estructurada. Permet una extensibilitat senzilla per afegir nous camps o entitats.
- El codi es troba estructurat en carpetes diferenciades: models, rutes, controladors i utilitats, facilitant el manteniment i el creixement del projecte.

---

### Exemples de serveis exposats

- `/auth/login`: Autenticació d’usuaris.
- `/productes`: Gestió de productes (llistats, alta, edició, eliminació).
- `/categories`: Gestió de categories.
- `/marques`: Gestió de marques.
- `/clients`: Gestió de clients.
- `/comandes`: Gestió de comandes.

---

### Referències

Les tecnologies emprades compleixen els estàndards i tendències actuals per a desenvolupament de backends moderns.

