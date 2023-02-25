import RPi.GPIO as GPIO
from mfrc522 import SimpleMFRC522
import time
import subprocess

reader = SimpleMFRC522()

def run_red():
    subprocess.call(["python", "/home/kacikor/Desktop/praca_inz/Praca_in-/my-app/src/led_strip_red.py"])

def run_green():
    subprocess.call(["python", "/home/kacikor/Desktop/praca_inz/Praca_in-/my-app/src/led_strip_green.py"])

try: 
    while True:
        id, text = reader.read()
        print(id)
        print(text)
        time.sleep(0.3)
        if id == 1002349245072:
            print("OPEN")
            run_green()
        else:
            print("CLOSED")
            run_red()

        for i in range (1,4):
            time.sleep(1)

finally: 
    GPIO.cleanup()

