@echo off
setlocal enabledelayedexpansion

:loop
set /p input="Enter directory name: "
if "%input%"=="exit" goto :end

rem Extract the first character
set "firstChar=!input:~0,1!"

rem Convert the first character to uppercase
for %%A in ("A" "B" "C" "D" "E" "F" "G" "H" "I" "J" "K" "L" "M" "N" "O" "P" "Q" "R" "S" "T" "U" "V" "W" "X" "Y" "Z") do (
    if /i "!firstChar!"=="%%~A" (
        set "firstChar=%%~A"
        goto continue
    )
)

for %%A in ("a" "b" "c" "d" "e" "f" "g" "h" "i" "j" "k" "l" "m" "n" "o" "p" "q" "r" "s" "t" "u" "v" "w" "x" "y" "z") do (
    if /i "!firstChar!"=="%%~A" (
        set "firstChar=%%~A"
        goto continue
    )
)

:continue

rem Concatenate the capitalized first character with the rest of the string
set "modifiedInput=!firstChar!!input:~1!"

md "!modifiedInput!" 2>nul
cd "!modifiedInput!"
type nul > "!modifiedInput!.jsx"
type nul > "!modifiedInput!.css"
echo import React from 'react' > "!modifiedInput!.jsx"
echo import './!modifiedInput!.css' > "!modifiedInput!.jsx"

@echo off
echo import './!modifiedInput!.css' > "!modifiedInput!.jsx"
echo import React from 'react' >> "!modifiedInput!.jsx"
echo. >> "!modifiedInput!.jsx"
echo export default function !modifiedInput!() { >> "!modifiedInput!.jsx"
echo   return ( >> "!modifiedInput!.jsx"
echo     ^<^> >> "!modifiedInput!.jsx"
echo         !modifiedInput! >> "!modifiedInput!.jsx"
echo     ^</^> >> "!modifiedInput!.jsx"
echo   ) >> "!modifiedInput!.jsx"
echo } >> "!modifiedInput!.jsx"


cd ..
goto :loop

:end