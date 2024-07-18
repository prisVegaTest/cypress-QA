Ejecución local sin Cypress Dashboard:

1. Descargar el proyecto: ejercicios Cypress
2. Ubicarse en la ruta del proyecto: {URL propia}\cypress QA
3. En la barra de navegación colocar: cmd
4. Estando en la cmd, se requiere que para ejecutar las pruebas en modo GUI (abrir el runner de Cypress), ingresar lo siguiente y dar enter:
"""
npm run cypress:open
# O usando Yarn
yarn cypress:open
"""
5. Se abre la ventana para ejecutar
6. Se selecciona E2E Testing
7. Se selecciona el navegador de preferencia (yo usé Chrome)
8. Se da click en el botón verde: Start E2E Testing in {navegador seleccionado}
9. Se abre una ventana con el navegador seleccionado
10. En la opción Specs se muestra los ejercicios
11. Seleccione el ejercicio por visualizar y automáticamente se ejecutará