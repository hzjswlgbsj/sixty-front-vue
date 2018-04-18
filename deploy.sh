#!/bin/sh
version=$(node -p "require('./package.json').version")
echo $version
rm -rf dist
npm run build
rm -rf $version
mkdir $version
cp -rf dist $version
echo 'scp'
scp -r $version hiliulin:/www/
#scp -r index.php hiliulin:/www/sixtyden
rm -rf $version
