# image template
FROM debian:bullseye

# Root path
WORKDIR /usr/api

# Installeer dotnet sdk 7.0
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
    apt-get install -y dotnet-sdk-7.0
#RUN mkdir $HOME/dotnet_install && cd $HOME/dotnet_install
#RUN curl -L https://aka.ms/install-dotnet-preview -o install-dotnet-preview.sh
#RUN bash install-dotnet-preview.sh

# Voeg de folders toe die de webserver uiterst nodig heeft
ADD ./Controllers /Controllers
ADD appsettings.json ./
ADD appsettings.Development.json ./
ADD ./*.cs ./
ADD ./*.csproj ./
ADD ./*.sln ./
ADD ./Properties /Properties

# Open port 8066, om conflicten met andere poorten te voorkomen en om de toegang via deze poort toe te staan naar de webserver
EXPOSE 8066

# Start de backend webserver (dotnet command)
CMD ["dotnet", "run"]