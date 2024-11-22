# Sistema de Administración de Sorteos

Este sistema está diseñado para facilitar la gestión de sorteos organizados por asociaciones civiles que necesitan recaudar fondos. Automatiza tareas relacionadas con la organización, seguimiento de números vendidos o apartados, registro de pagos, y generación de reportes.

## Características

### **Sorteos**
- Crear sorteos con:
  - Imagen representativa.
  - Rango de números.
  - Precio por número.
  - Fechas del período de venta.
  - Fecha del sorteo.
- Modificar o eliminar sorteos creados.
- Visualizar los números disponibles por sorteo.

### **Gestión de Números**
- Apartar uno o más números con tiempo límite configurable (global o por sorteo).
- Liberar números apartados.
- Enviar recordatorios de pago por correo electrónico a quienes tengan boletos apartados.

### **Pagos**
- Registrar comprobantes de pago para uno o más números.
- Marcar como pagados los números apartados tras recibir un comprobante.
- Permitir el pago en línea.

### **Tablero de Control y Reportes**
- Tablero por sorteo con:
  - Monto recaudado.
  - Monto pendiente (boletos apartados).
  - Cantidad de boletos vendidos, apartados y libres.
  - Días restantes del período de venta.
- Reportes:
  - Deudores con monto y números apartados.
  - Historial de sorteos, incluyendo datos como fechas, montos recaudados, y boletos vendidos o libres.

### **Autenticación**
- Roles:
  - Cliente.
  - Organizador de sorteos.

## Requisitos del Proyecto
- Node.js.
- MongoDB.
- Dependencias manejadas con npm.

## Instalación
1. Clona este repositorio:
   ```bash
   git clone https://github.com/JulioEVA/proyecto-final-agile.git
