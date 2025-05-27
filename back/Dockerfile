FROM python:3.13-slim

WORKDIR /back

COPY . .

RUN pip install --no-cache-dir --upgrade -r requirements.txt

CMD ["python", "main.py"]

