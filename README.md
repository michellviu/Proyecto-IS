# PLAYHUB — Parque Infantil Management System

A full-stack web application for managing a children's playground, built with **React** and **Django REST Framework**. Enables administrators, educators, and parents to manage activities, installations, reservations, and educational resources through a role-based interface.

## Features

### Role-Based Access

| Role | Capabilities |
|---|---|
| **Admin** | Manage installations, activities, resources, users; confirm educator registrations; view reports and statistics |
| **Educator** | View assigned activities, manage scheduled sessions, track participants |
| **Parent** | Browse activity catalog, reserve spots for children, rate activities, view reservation history |

### Core Modules

- **Activity Management** — Create and schedule activities with age ranges, capacity limits, and duration
- **Installation Management** — Register playground installations with capacity and location tracking
- **Resource Management** — Track equipment and material usage across installations
- **Reservation System** — Parents reserve spots for their children with real-time availability
- **Qualification & Feedback** — Rate and comment on completed activities
- **Statistics & Reports** — Visual analytics on reservations, ratings, and resource usage (PDF export)
- **User Administration** — Role confirmation workflow, profile management

### Business Rules

- Activity capacity cannot exceed installation capacity
- Reservation limits: max 3 reservations per parent per activity per day
- Children count across confirmed reservations cannot exceed activity capacity
- Scheduled activities cannot overlap in the same installation
- Qualifications require the activity to have started
- Offensive language filter on comments
- Role confirmation workflow (admin must approve educator/admin accounts)

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, React Router DOM 7, Ant Design 5, Bootstrap 5, Axios, Vite |
| **Backend** | Python, Django 5.0.4, Django REST Framework |
| **API Auth** | JWT (simplejwt) — access token 60min, refresh token 1 day |
| **Database** | PostgreSQL |
| **API Docs** | Swagger UI + ReDoc (drf-yasg) |
| **Reports** | matplotlib (charts), ReportLab (PDF) |

## Architecture

Backend follows a **Service Layer / Repository pattern**:

```
views/           → HTTP controllers (thin)
AppServices/     → Business logic layer
DomainServices/  → Abstract interfaces
InfrastructurePersistence/ → Data access (ORM)
models/          → Database models
serializers/     → Request/response transformation
```

Frontend is a **React SPA** communicating with the Django REST API via Axios.

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- PostgreSQL

### Setup

**1. Clone and configure the backend**

```bash
git clone https://github.com/michellviu/Proyecto-IS.git
cd Proyecto-IS/ParqueInfantil
```

Create a PostgreSQL database:

```bash
createdb parqueinfantilbd
```

Update `ParqueInfantil/settings.py` with your database credentials if needed.

Install Python dependencies and run migrations:

```bash
pip install -r requirements.txt  # or: pip install django djangorestframework djangorestframework-simplejwt drf-yasg django-cors-headers psycopg2-binary matplotlib reportlab
python manage.py migrate
```

A default admin user is created automatically: **admin** / **admin@123**.

Start the backend:

```bash
python manage.py runserver
```

The API is now at [http://127.0.0.1:8000/api/](http://127.0.0.1:8000/api/)

**2. Start the frontend**

```bash
cd frontend
npm install
npm run dev
```

The app is now at [http://localhost:5173](http://localhost:5173)

### API Documentation

Once the backend is running:

- **Swagger UI**: [http://127.0.0.1:8000/api/swagger/](http://127.0.0.1:8000/api/swagger/)
- **ReDoc**: [http://127.0.0.1:8000/api/redoc/](http://127.0.0.1:8000/api/redoc/)

### Data Management

```bash
# Export all data
python manage.py dumpdata > data.json

# Import data
python manage.py loaddata data.json
```

## API Overview

| Category | Endpoints |
|---|---|
| **Auth** | `POST /api/register/`, `POST /api/login/`, `POST /api/token/refresh/` |
| **Installations** | `GET/POST /api/instalacion/`, `GET/PUT/DEL /api/instalacion/<id>/` |
| **Activities** | `GET/POST /api/actividad/`, `GET /api/actividad/calificaciones/`, `GET /api/actividad/participantes/` |
| **Scheduled Activities** | `GET/POST /api/actividad_programada/`, `GET /api/actividad_programada/catalog/` |
| **Resources** | `GET/POST /api/recurso/`, `GET /api/recurso/enuso/`, `GET /api/recurso/disponibles/` |
| **Reservations** | `GET/POST /api/reservacion/`, `GET /api/reservacion/porpadre/` |
| **Qualifications** | `GET/POST /api/calificacion/`, `GET /api/calificacion/poractividad/<id>/` |
| **Users** | `GET/POST /api/usuario/`, `GET /api/usuario/noconfirmado/`, `PUT /api/usuario/confirmarrol/<id>/` |
| **Search** | `GET /api/search/`, `GET /api/orderbyproperty/` |
| **Stats** | `GET /api/stats/calificaciones/`, `GET /api/stats/reservaciones_totales/`, `GET /api/stats/uso_recursos/` |
| **Reports** | `GET /api/pdf/` |

See the full interactive documentation at `/api/swagger/`.

## Database Model

```
Usuario ──┬──> Padre
           ├──> Educador
           └──> Administrador

Instalacion ──┬──> Actividad
              └──> Recurso

Actividad ──> Actividad_programada ──> Educador

Actividad_programada ──┬──> Reservacion ──> Padre
                       └──> Calificacion ──> Usuario
```

## Project Structure

```
ParqueInfantil/
├── api/
│   ├── AppServices/              # Business logic services
│   ├── DomainServices/           # Abstract interfaces
│   ├── InfrastructurePersistence/ # Repository implementations
│   ├── models/                   # Database models
│   ├── serializers/              # DRF serializers
│   ├── views/                    # API view classes
│   │   ├── permissions/          # Role-based permissions
│   │   └── custompaginator/      # Custom pagination
│   ├── signals.py                # post_migrate defaults
│   └── urls.py                   # API routing
├── frontend/
│   ├── src/
│   │   ├── pages/                # Page components
│   │   ├── components/           # Shared components
│   │   └── styles/               # CSS files
│   ├── package.json
│   └── vite.config.js
├── ParqueInfantil/               # Django project config
└── manage.py
```

## Contributors

- [@michellviu](https://github.com/michemgl)
- [@Eveliz08](https://github.com/Eveliz08)
- [@AbrahamRom](https://github.com/AbrahamRom)
- [@Pol472](https://github.com/Pol472)

Built as the final project for the **Software Engineering** course in the Computer Science program at the University of Havana.
