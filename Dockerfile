# Imagem base
FROM node:18

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia arquivos
COPY package*.json ./
RUN npm install

COPY . .

# Comando para iniciar a aplicação
CMD ["npm", "start"]
