# Use a slim Python image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy requirements and install
COPY requirements.txt .
RUN pip install -r requirements.txt

# Copy rest of the app code
COPY . .

# Expose the port your app runs on
EXPOSE 8000

# Start the app (adjust module path if needed)
CMD ["uvicorn", "services.api:app", "--host", "0.0.0.0", "--port", "8000"]

