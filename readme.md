React Airport Flights
=====================

To create the base skeleton application use yeoman

> npm install -g yo generator-aspnetcore-spa

then

> cd some-empty-directory

> yo aspnetcore-spa

and 

> dotnet run

For development mode (powershell)
> $Env:ASPNETCORE_ENVIRONMENT = "Development"

For production mode (powershell)
> $Env:ASPNETCORE_ENVIRONMENT = "Production"

First time run:
> yarn install
> webpack --config webpack.config.vendor.js
> webpack
> dotnet run

