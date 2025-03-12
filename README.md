# Modern QR Code Generator

A full-stack QR code generator application with a React frontend and FastAPI backend.

## Features

- Modern, responsive UI built with React and Chakra UI
- FastAPI backend with async support
- Multiple QR code styles and customization options
- Redis caching for improved performance
- Support for custom logos in QR codes
- Type safety with Pydantic models
- Comprehensive error handling and logging

## Project Structure

```
.
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── qr_endpoints.py
│   │   ├── core/
│   │   │   └── config.py
│   │   ├── models/
│   │   │   └── qr_code.py
│   │   ├── services/
│   │   │   └── qr_service.py
│   │   └── main.py
│   └── requirements.txt
└── frontend/
    └── src/
        └── components/
            └── QRGenerator.jsx
```

## Prerequisites

- Python 3.8+
- Node.js 14+
- Redis server (optional, for caching)

## Setup

### Backend

1. Create a virtual environment and activate it:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Start the backend server:
```bash
uvicorn app.main:app --reload --port 8000
```

The API will be available at http://localhost:8000/api
API documentation is available at http://localhost:8000/api/docs

### Frontend

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:5174

## API Endpoints

### POST /api/generate

Generate a QR code with the following parameters:

```json
{
  "data": "https://example.com",
  "foreground": "#000000",
  "background": "#FFFFFF",
  "size": 200,
  "logo_url": "https://example.com/logo.png" // optional
}
```

Response:
```json
{
  "image": "data:image/png;base64,...",
  "cache_hit": false
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
