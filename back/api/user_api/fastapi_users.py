from fastapi_users import FastAPIUsers

from core.models import User
from api.dependencies.user_manager import get_user_manager
from api.dependencies.backend import authentication_backend
from core.types.user_id import UserIdType

fastapi_users = FastAPIUsers[User, UserIdType](
    get_user_manager,
    [authentication_backend],
)

current_user = fastapi_users.current_user(active=True)
current_super_user = fastapi_users.current_user(active=True, superuser=True)