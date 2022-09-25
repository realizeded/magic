npm i -g mycp 
pnpm i -g pnpm 
npm i -g @microsoft/rush 
rush install 
rush build
mkdir ./packages/server/project/client 
mkdir ./packages/server/project/template 
cp ./packages/client/build/ ./packages/server/project/client 
cp ./packages/template/build/ ./packages/server/project/template 
cp ./packages/server C:/