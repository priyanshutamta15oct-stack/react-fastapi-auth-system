from passlib.context import CryptContext
from jose import jwt
from jose import JWTError

from datetime import datetime, timedelta
import os

from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")

ALGORITHM = os.getenv("ALGORITHM")

ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")
)

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


def hash_password(password: str):

    return pwd_context.hash(password)


def verify_password(
    plain_password: str,
    hashed_password: str
):

    return pwd_context.verify(
        plain_password,
        hashed_password
    )

def create_access_token(
        email:str,
        user_id:int
    ):
    encode={
        "sub":email,
        "id":user_id
    }

    expires=datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    encode.update({"exp":expires})  

    return jwt.encode(
        encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

def verify_token(token:str):
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )
        email = payload.get("sub")
        user_id = payload.get("id")

        if email is None or user_id is None:
            raise JWTError("Invalid token")

        return {
            "email": email,
            "user_id": user_id
        }
    except JWTError as e:
        raise JWTError(f"Token verification failed: {str(e)}")