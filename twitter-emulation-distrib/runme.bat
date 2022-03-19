@echo off

if "%JAVA_HOME%" == "" goto jremanual
set JRE=%JAVA_HOME%
goto start

:jremanual
set /p JRE=Java folder can't be found. Please, enter your JRE folder:

:start
echo Application JRE: %JRE%

"%JRE%\bin\java" -jar ${app.finalName}.war
