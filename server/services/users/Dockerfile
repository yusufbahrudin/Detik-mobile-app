FROM node:20.4.0

# path di container dimana berisi codingan kita (path bebas sesuai kesepakatan bersama)
WORKDIR /usr/local/user

# untuk set ENV dalam aplikasi kita
# ENV PORT=4001

# copy deps yang ada di apps ke WORKDIR
COPY package.json package-lock.json /usr/local/user/

# Install npm & Mengapus cache
RUN npm install && npm cache clean --force

# 2 install setup for development
RUN npm install -g nodemon

# copy semua file & folder ke WORKDIR
COPY ./ ./

# execute apps: production
CMD ["npm", "run", "dev"]