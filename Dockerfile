FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app
# Copy csproj and restore as distinct layers
COPY ./ /app

RUN dotnet restore
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY ./out .
COPY --from=build-env /app/out .
COPY ./efbundle .
COPY ./init.sh .
RUN chmod +x init.sh
CMD ["/bin/sh","init.sh"]