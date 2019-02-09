copy npm-shrinkwrap.json src/npm-shrinkwrap.json /Y
call ng build --prod --build-optimizer


robocopy dist\AntWeb1\ ..\Ant\Ant\wwwroot\  /MIR /XD





