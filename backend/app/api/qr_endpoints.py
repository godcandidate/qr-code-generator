from fastapi import APIRouter, HTTPException
from ..models.qr_code import QRCodeRequest, QRCodeResponse
from ..services.qr_service import QRCodeService
from loguru import logger

router = APIRouter()

@router.post("/generate", response_model=QRCodeResponse)
async def generate_qr_code(request: QRCodeRequest):
    try:
        async with QRCodeService() as qr_service:
            qr_image = await qr_service.generate_qr_code(request)
            return QRCodeResponse(image=qr_image, cache_hit=False)

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error generating QR code: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")
