@echo off
echo ========================================
echo DEVI AUDIO DOWNLOAD HELPER
echo ========================================
echo.
echo This script will help you download the audio for the Devi image.
echo.
echo YouTube Video: https://youtu.be/BrGkMcNDGlo?si=JVPSTzHoIIfdH7WT
echo.
echo STEPS TO DOWNLOAD:
echo 1. Go to: https://ytmp3.cc/
echo 2. Paste this URL: https://youtu.be/BrGkMcNDGlo
echo 3. Click "Convert" and then "Download"
echo 4. Save the file as "devi-audio.mp3"
echo 5. Move it to: %~dp0client\public\devi-audio.mp3
echo.
echo Press any key to open the YouTube video in your browser...
pause
start https://youtu.be/BrGkMcNDGlo?si=JVPSTzHoIIfdH7WT
echo.
echo Press any key to open the converter website...
pause
start https://ytmp3.cc/
echo.
echo After downloading, place the file in: %~dp0client\public\devi-audio.mp3
echo.
pause