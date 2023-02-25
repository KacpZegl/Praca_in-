import cv2
import pyzbar.pyzbar as pyzbar
from datetime import datetime
import time


# 4 - 640 x 480     base
# 6 - 960 x 720
# 8 - 1280 x 960    720p
# 12 - 1920 x 1440  1080p
# 13 - 2080 x 1560  almost 2k

# ____ MAX RESOLUTION ____
# 16,2 - 2592 x 1944

resolution = 8

width = 160 * resolution
height = 120 * resolution

camera = cv2.VideoCapture(0)
camera.set(3, width)
camera.set(4, height)
camera.set(cv2.CAP_PROP_BUFFERSIZE, 1)
camera.set(cv2.CAP_PROP_AUTO_EXPOSURE, 1)
camera.set(cv2.CAP_PROP_BRIGHTNESS, 60)
camera.set(cv2.CAP_PROP_CONTRAST, 1)

def decodeCam(image):
    cv2.namedWindow("Output", cv2.WINDOW_NORMAL) 
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    barcodes = pyzbar.decode(image)
    print('reading...', end='\r')
    rotated =cv2.rotate(image, cv2.ROTATE_180)
    cv2.imshow("Output", rotated)
    cv2.waitKey(1)
    
    for barcode in barcodes:
        barcodeData = barcode.data.decode()
        barcodeType = barcode.type
        print("["+str(datetime.now())+"] Type:{} | Data: {}".format(barcodeType, barcodeData))
        time.sleep(2)
    return image

try:
 while True:
# Read current frame
  ret, frame = camera.read()
  im=decodeCam(frame)  
  
except KeyboardInterrupt:
 print('interrupted!')
