from fastapi import HTTPException
from sqlalchemy.orm import Session
from models.user_model import User
from core.security import (verify_password, create_access_token)

from core.security import hash_password

def login_user (data,db:Session):
    user = db.query(User).filter(
        User.email == data.email
    ).first()

    if not user:

        raise HTTPException(
            status_code=400,
            detail="Invalid email or password"
        )

    if not verify_password(data.password, user.hashed_password):

        raise HTTPException(
            status_code=400,
            detail="Invalid email or password"
        )

    access_token = create_access_token(
    user.email,
    user.id
)

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


def signup_user(data, db: Session):

    existing_user = db.query(User).filter(
        User.email == data.email
    ).first()

    if existing_user:

        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    hashed_password = hash_password(
        data.password
    )

    user = User(
        full_name=data.fullName,
        email=data.email,
        hashed_password=hashed_password
    )

    db.add(user)

    db.commit()

    db.refresh(user)

    return {
        "message": "User created successfully",
        "user_id": user.id
    }