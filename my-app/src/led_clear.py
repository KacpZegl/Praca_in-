from rpi_ws281x import *
import neopixel
import board

pixels = neopixel.NeoPixel(board.D18, 22)

pixels.fill((0,0,0))
