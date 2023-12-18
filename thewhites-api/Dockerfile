# image template
FROM debian:bullseye

# Root path
WORKDIR /usr/api

# Installeer dotnet sdk 6.0
RUN apt-get update
RUN apt-get install -y gpg
RUN apt-get install -y wget
RUN wget -O - https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor -o microsoft.asc.gpg
RUN mv microsoft.asc.gpg /etc/apt/trusted.gpg.d/
RUN wget https://packages.microsoft.com/config/debian/11/prod.list
RUN mv prod.list /etc/apt/sources.list.d/microsoft-prod.list
RUN chown root:root /etc/apt/trusted.gpg.d/microsoft.asc.gpg
RUN chown root:root /etc/apt/sources.list.d/microsoft-prod.list
RUN apt-get update && \
    apt-get install -y dotnet-sdk-6.0

# Voeg de folders toe die de webserver nodig heeft
ADD ./* ./

# Open port 8066, om conflicten met andere poorten te voorkomen en om de toegang via deze poort toe te staan naar de webserver
EXPOSE 8066

# Start de backend webserver (dotnet command)
CMD ["dotnet", "run"]