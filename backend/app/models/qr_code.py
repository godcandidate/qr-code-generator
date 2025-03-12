from pydantic import BaseModel, Field, validator
import re

class QRCodeRequest(BaseModel):
    data: str = Field('', min_length=0, max_length=2048, description="Data to encode in QR code")
    foreground: str = Field(default="#000000", pattern="^#[0-9A-Fa-f]{6}$", description="Foreground color in hex format")
    background: str = Field(default="#FFFFFF", pattern="^#[0-9A-Fa-f]{6}$", description="Background color in hex format")
    size: int = Field(default=200, ge=50, le=1000, description="QR code size in pixels")

    @validator('foreground', 'background')
    def validate_color(cls, v):
        if not re.match(r'^#[0-9A-Fa-f]{6}$', v):
            raise ValueError('Color must be in hex format (e.g., #000000)')
        return v

class QRCodeResponse(BaseModel):
    image: str = Field(..., description="Base64 encoded QR code image")
    cache_hit: bool = Field(default=False, description="Whether the response was served from cache")
