npm i -g mycp
pnpm i -g pnpm
npm i -g rush

rush install
rush build

bash ./build.sh

mkdir dir ./packages/server/project/client
mkdir dir ./packages/server/project/template
cp ./packages/client/build/ ./packages/server/project/client
cp ./packages/template/build/ ./packages/server/project/template

cp ./packages/server C:/