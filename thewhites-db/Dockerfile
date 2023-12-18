FROM mcr.microsoft.com/mssql/server:2022-latest

USER root

RUN mkdir -p -m 777 /var/opt/mssql && chgrp -R 0 /var/opt/mssql
RUN mkdir -p -m 777 /var/opt/mssql/data && chgrp -R 0 /var/opt/mssql/data
RUN mkdir -p -m 777 /var/opt/sqlserver && chgrp -R 0 /var/opt/sqlserver

RUN chmod -R 777 /var/opt/mssql /var/opt/sqlserver /var/opt/mssql/data
RUN chown -R mssql:0 /var/opt/mssql /var/opt/sqlserver /var/opt/mssql/data

USER mssql

RUN ls -all /var/opt/mssql/data
