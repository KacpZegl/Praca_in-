import time
from rpi_ws281x import *
import neopixel
import board
import argparse

# LED strip configuration:
LED_COUNT      = 22     # Number of LED pixels.
LED_PIN        = 18      # GPIO pin connected to the pixels (18 uses PWM!).
#LED_PIN        = 10      # GPIO pin connected to the pixels (10 uses SPI /dev/spidev0.0).
LED_FREQ_HZ    = 800000  # LED signal frequency in hertz (usually 800khz)
LED_DMA        = 10      # DMA channel to use for generating a signal (try 10)
LED_BRIGHTNESS = 255     # Set to 0 for darkest and 255 for brightest
LED_INVERT     = False   # True to invert the signal (when using NPN transistor level shift)
LED_CHANNEL    = 0       # set to '1' for GPIOs 13, 19, 41, 45 or 53

pixels = neopixel.NeoPixel(board.D18, 22)

# Define functions which animate LEDs in various ways.
def loading(strip, wait_ms=50):
    """Wipe color across display a pixel at a time."""
    for i in range(strip.numPixels()):
        for j in range (0,255, 5):
            strip.setPixelColor(i, Color(j,j,j))
            time.sleep(0.001)
            strip.show()
    time.sleep(0.5)
    for i in range(LED_BRIGHTNESS, -1, -1):
        pixels.fill((i,255,i))
    time.sleep(1)
    for i in range(LED_BRIGHTNESS, -5, -5):
        pixels.fill((0,i,0))
        time.sleep(0.01)
  
# Main program logic follows:
if __name__ == '__main__':
    # Process arguments
    parser = argparse.ArgumentParser()
    parser.add_argument('-c', '--clear', action='store_true', help='clear the display on exit')
    args = parser.parse_args()

    # Create NeoPixel object with appropriate configuration.
    strip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL)
    # Intialize the library (must be called once before other functions).
    strip.begin()

    loading(strip)