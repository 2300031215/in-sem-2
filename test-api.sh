#!/bin/bash

echo "====================================="
echo "Medical Appointment System - API Tests"
echo "====================================="
echo ""

API_URL="http://localhost:5000/api"

# Test 1: Health Check
echo "1. Testing API Health Check..."
curl -s http://localhost:5000/ | grep -q "Medical Appointment System API" && echo "✓ API is running" || echo "✗ API health check failed"
echo ""

# Test 2: Register User
echo "2. Testing User Registration..."
REGISTER_RESPONSE=$(curl -s -X POST ${API_URL}/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }')
echo "Response: $REGISTER_RESPONSE"
echo ""

# Test 3: Login
echo "3. Testing User Login..."
LOGIN_RESPONSE=$(curl -s -X POST ${API_URL}/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }')
TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*' | grep -o '[^"]*$')
echo "Token obtained: ${TOKEN:0:20}..."
echo ""

# Test 4: Get All Doctors
echo "4. Testing Get All Doctors..."
DOCTORS_RESPONSE=$(curl -s ${API_URL}/doctors)
echo "Doctors count: $(echo $DOCTORS_RESPONSE | grep -o "\"id\":" | wc -l)"
echo ""

# Test 5: Get User Profile (requires auth)
echo "5. Testing Get User Profile (authenticated)..."
PROFILE_RESPONSE=$(curl -s ${API_URL}/auth/profile \
  -H "Authorization: Bearer $TOKEN")
echo "Profile: $PROFILE_RESPONSE"
echo ""

# Test 6: Create Appointment (requires auth)
echo "6. Testing Create Appointment (authenticated)..."
APPOINTMENT_RESPONSE=$(curl -s -X POST ${API_URL}/appointments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "doctor_id": 1,
    "appointment_date": "2024-12-15",
    "appointment_time": "10:00:00",
    "reason": "Regular checkup"
  }')
echo "Response: $APPOINTMENT_RESPONSE"
echo ""

# Test 7: Get User Appointments
echo "7. Testing Get User Appointments (authenticated)..."
MY_APPOINTMENTS=$(curl -s ${API_URL}/appointments/my-appointments \
  -H "Authorization: Bearer $TOKEN")
echo "My appointments: $MY_APPOINTMENTS"
echo ""

echo "====================================="
echo "All tests completed!"
echo "====================================="
