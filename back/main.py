from fastapi import FastAPI
import uvicorn

app = FastAPI()

@app.get("/", summary='ОПисание функции', tags=['Список'])
def main():
    return "Hello"



if __name__=="__main__":
    uvicorn.run("main:app", reload=True)