import cv2
import pyzbar.pyzbar as pyzbar
from datetime import datetime
import time
import RPi.GPIO as GPIO
from mfrc522 import SimpleMFRC522
import subprocess
import sys
import json

# Constants
QR_RESOLUTION = 6
QR_WIDTH = 160 * QR_RESOLUTION
QR_HEIGHT = 120 * QR_RESOLUTION
CARD_ID = 1002349245072
NAME_TO_SCAN = "Kacper"

# Initialize camera
camera = cv2.VideoCapture(0)
camera.set(3, QR_WIDTH)
camera.set(4, QR_HEIGHT)
#camera.set(cv2.CAP_PROP_BUFFERSIZE, 1)
camera.set(cv2.CAP_PROP_AUTO_EXPOSURE, 1)
camera.set(cv2.CAP_PROP_BRIGHTNESS, 60)
camera.set(cv2.CAP_PROP_CONTRAST, 1)

# Initialize RFID reader
reader = SimpleMFRC522()

# Define LED strip control functions
def run_red():
    data = "NOTcorrect"
    subprocess.call(["python", "/home/kacikor/Desktop/praca_inz/Praca_in-/my-app/src/led_strip_red.py"])
    subprocess.Popen(['electron', 'path/to/main.js'], stdin=subprocess.PIPE)
    sys.stdout.write(data)
    sys.stdout.flush()

def run_green():
    data = "correct"
    subprocess.call(["python", "/home/kacikor/Desktop/praca_inz/Praca_in-/my-app/src/led_strip_green.py"])
    subprocess.Popen(['electron', 'path/to/main.js'], stdin=subprocess.PIPE)
    sys.stdout.write(data)
    sys.stdout.flush()

# Define QR code decoding function
def decode_qr_code(image):
    cv2.namedWindow("Output", cv2.WINDOW_NORMAL) 
    barcodes = pyzbar.decode(image)
    # print('reading...', end='\r')
    rotated = cv2.rotate(image, cv2.ROTATE_180)
    cv2.imshow("Output", rotated)
    cv2.waitKey(1)
    
    for barcode in barcodes:
        barcodeData = barcode.data.decode()
        barcodeType = barcode.type
        # print("["+str(datetime.now())+"] Type:{} | Data: {}".format(barcodeType, barcodeData))
        time.sleep(2)
        if barcodeData == NAME_TO_SCAN:
            return True  # return immediately after finding a valid QR code
    
    return False  # return False if no valid QR code was found



# Main loop
try:
    while True:
        # Read RFID card
        id, text = reader.read()
        print(id, " : ", text)
        sys.stdout.flush()
        time.sleep(0.3)
        
        if id == CARD_ID:
            # Ask for QR code 
            data = "Scan QR code"
           # subprocess.Popen(['electron', 'path/to/main.js'], stdin=subprocess.PIPE)
            sys.stdout.write(data)
            sys.stdout.flush()
            # Read QR code for 20 seconds
            camera.release()
            # Initialize camera
            camera = cv2.VideoCapture(0)
            camera.set(3, QR_WIDTH)
            camera.set(4, QR_HEIGHT)
            #camera.set(cv2.CAP_PROP_BUFFERSIZE, 1)
            camera.set(cv2.CAP_PROP_AUTO_EXPOSURE, 1)
            camera.set(cv2.CAP_PROP_BRIGHTNESS, 60)
            camera.set(cv2.CAP_PROP_CONTRAST, 1)
            time.sleep(1)
            start_time = time.monotonic()
            qr_code_found = False
            while time.monotonic() - start_time < 20:
                # Read current frame
                ret, frame = camera.read()
                if decode_qr_code(frame):
                    qr_code_found = True
                    break  # break out of the loop if a valid QR code is found
            
            if qr_code_found:
                run_green()
            else:
                run_red()
        else:
            run_red()

        time.sleep(1)

except KeyboardInterrupt:
    print('interrupted!')

finally: 
    GPIO.cleanup()
 