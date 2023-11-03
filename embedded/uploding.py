import serial
import requests
import random
import time

ser = serial.Serial(
 port='COM11',
 baudrate=9600,
 timeout=1
)

try:
    while True:
        # data = ser.readline().decode().strip()
        line = ser.readline().decode('utf-8').strip()

       
        if "Heart Rate:" in line and "Body Temperature:" in line:
            segments = line.split("&&")

            heart_rate = float(segments[0].split(":")[1])
            body_temperature = float(segments[1].split(":")[1])
        
            patient_data = {
                'patient_nid': 576879809, 'heart_rate': heart_rate, 'body_temperature': body_temperature, 'patient_name': 'ishimwe', 'patient_frequent_sickness': 'ibicurane'
            }

            response = requests.post('http://localhost:4000/patient/addPatient', json=patient_data)

            if response.status_code == 201:
                print('patient data inserted successfully!')
except serial.SerialException as e:
    print("serial exception")
    
