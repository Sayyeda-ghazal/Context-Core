from fastapi import HTTPException
from jose import jwt
from datetime import datetime, timedelta


SECRET_KEY = "supersecretkey"
ALGORITHM = "HS256"

fake_user = {
    "email": "test@contextcore.com",
    "password": "123456"
}

def login_user(data):
    if data.email!= fake_user["email"] or data.password != fake_user["password"]:
        raise HTTPException(status_code=401, detail="Invalid Credentials")
    
    token = jwt.encode(
        {
            "sub": data.email,
            "exp": datetime.utcnow() + timedelta(hours=1)
        },
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return {
        "token": token,
        "user": {"email": data.email}
    }