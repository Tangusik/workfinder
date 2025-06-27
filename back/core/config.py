from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import BaseModel, PostgresDsn

class RunCongig(BaseModel):
    host:str = '0.0.0.0'
    port:str = 8000

class ApiUserPrefix(BaseModel):
    prefix: str = '/user'
    auth: str = '/auth'

class ApiPrefix(BaseModel):
    prefix: str = '/api'
    user: ApiUserPrefix = ApiUserPrefix()

    @property
    def bearer_token_url(self):
        #api/user/auth/<login>
        parts = (self.prefix, self.user.prefix, self.user.auth, '/login')
        path = ''.join(parts)
        return path[1:]

class DBConfig(BaseModel):
    url: PostgresDsn
    echo: bool = False
    max_overflow: int = 50
    pool_size: int = 10

    naming_convention: dict[str, str] = {
        "ix": "ix_%(column_0_label)s",
        "uq": "uq_%(table_name)s_%(column_0_N_name)s",
        "ck": "ck_%(table_name)s_%(constraint_name)s",
        "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
        "pk": "pk_%(table_name)s",
    }

class AccessToken(BaseModel):
    lifetime_seconds: int =3600
    reset_password_token_secret: str
    verification_token_secret: str

class SuperUser(BaseModel):
    default_email: str
    default_password: str

class SmtpData(BaseModel):
    smtp_host: str
    smtp_port: int=587
    smtp_user: str
    smtp_password: str
    from_email: str = '<no-reply>@gmail.com'

class CorsData(BaseModel):
    allowed_origins: list[str] = ["*"]

class URLs(BaseModel):
    base_front_link: str = 'http://localhost/'

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file='.env',
        case_sensitive=False, 
        env_nested_delimiter="__",
        env_prefix="APP_CONFIG__",)
    
    run: RunCongig = RunCongig()
    api: ApiPrefix = ApiPrefix()
    db: DBConfig
    access_token: AccessToken
    super_user: SuperUser
    smtp_data: SmtpData
    cors_data: CorsData = CorsData()
    urls: URLs = URLs()

settings = Settings()