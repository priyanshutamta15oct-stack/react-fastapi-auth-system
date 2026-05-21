import token

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.db_dependency import get_db
from models.user_model import User
from pydantic import BaseModel
from core.security import create_access_token, hash_password
from core.security import verify_password
from fastapi.security import HTTPBearer
from fastapi.security import HTTPAuthorizationCredentials
from core.security import verify_token
from jose import JWTError

security = HTTPBearer()

router=APIRouter()

class SignupRequest(BaseModel):
    fullName:str
    email:str                                               
    password:str
    confirmPassword:str

class LoginRequest(BaseModel):
    email:str
    password:str

@router.post("/signup")
async def signup(data: SignupRequest, db: Session = Depends(get_db)):
    hashed_password = hash_password(data.password)
    user=User(
        full_name=data.fullName,
        email=data.email,
        hashed_password=hashed_password
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return{
        "message": "User created successfully",
        "user_id": user.id
    }

@router.post("/login")
async def login(
    data: LoginRequest,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == data.email
    ).first()

    if not user:

        raise HTTPException(
            status_code=400,
            detail="Invalid email or password"
        )

    valid_password = verify_password(
        data.password,
        user.hashed_password
    )

    if not valid_password:

        raise HTTPException(
            status_code=400,
            detail="Invalid email or password"
        )

    token = create_access_token(
        user.email,
        user.id
    )

    return {
    "access_token": token,
    "token_type": "bearer"
    }

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
