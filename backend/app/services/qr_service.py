import segno
from PIL import Image
import io
import base64
from typing import Optional, Tuple
import httpx
from loguru import logger
from ..models.qr_code import QRCodeRequest

class QRCodeService:
    def __init__(self):
        self._http_client = httpx.AsyncClient()

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        await self._http_client.aclose()

    def _hex_to_rgb(self, hex_color: str) -> Tuple[int, int, int]:
        """Convert hex color to RGB tuple."""
        if not isinstance(hex_color, str):
            raise ValueError("Color must be a string in hex format (e.g. '#FF0000')")
        hex_color = str(hex_color).lstrip('#')
        return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))
    
    async def generate_qr_code(self, request: QRCodeRequest) -> str:
        """Generate QR code and return as base64 string."""
        try:
            # Create QR code
            qr = segno.make(request.data or 'Empty QR Code', error='h')
            
            # Convert colors
            fg_color = self._hex_to_rgb(request.foreground)
            bg_color = self._hex_to_rgb(request.background)

            # Create image buffer
            buffer = io.BytesIO()
            
            # Generate QR code image
            qr.save(
                buffer,
                kind='png',
                scale=max(1, request.size // 33),  # Ensure scale is at least 1
                dark=fg_color,
                light=bg_color,
                quiet_zone=1
            )

            # Convert to base64
            buffer.seek(0)
            encoded_image = base64.b64encode(buffer.getvalue()).decode()
            return f"data:image/png;base64,{encoded_image}"

        except Exception as e:
            logger.error(f"Error generating QR code: {str(e)}")
            raise ValueError(f"Failed to generate QR code: {str(e)}")

    async def close(self):
        await self._http_client.aclose()
