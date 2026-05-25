from fastapi import APIRouter, Depends, HTTPException

from fastapi.security import (
    HTTPBearer,
    HTTPAuthorizationCredentials
)

from sqlalchemy.orm import Session

from jose import JWTError

from pydantic import BaseModel

from database.db_dependency import get_db

from core.security import verify_token

from services.auth_service import (
    login_user,
    signup_user
)


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

security = HTTPBearer()


# =========================
# REQUEST SCHEMAS
# =========================

class SignupRequest(BaseModel):

    fullName: str
    email: str
    password: str
    confirmPassword: str


class LoginRequest(BaseModel):

    email: str
    password: str


# =========================
# RESPONSE SCHEMAS
# =========================

class LoginResponse(BaseModel):

    access_token: str
    token_type: str


class SignupResponse(BaseModel):

    message: str
    user_id: int


# =========================
# SIGNUP ROUTE
# =========================

@router.post(
    "/signup",
    response_model=SignupResponse
)
async def signup(
    data: SignupRequest,
    db: Session = Depends(get_db)
):

    return signup_user(data, db)


# =========================
# LOGIN ROUTE
# =========================

@router.post(
    "/login",
    response_model=LoginResponse
)
async def login(
    data: LoginRequest,
    db: Session = Depends(get_db)
):

    return login_user(data, db)


# =========================
# PROTECTED ROUTE
# =========================

@router.get("/protected")
async def get_profile(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):

    token = credentials.credentials

    try:

        payload = verify_token(token)

        return {
            "message": "This is a protected route",
            "user": payload
        }

    except JWTError:

        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )