#!/bin/bash

tag="n18-u22-v1"
manifest=omegareizo/ubuntu-node:$tag
arm64Image=omegareizo/ubuntu-node-arm64:$tag
amd64Image=omegareizo/ubuntu-node-amd64:$tag

docker build --platform linux/arm64 -t $arm64Image -f dockerfiles/Dockerfile.base .
docker build --platform linux/amd64 -t $amd64Image -f dockerfiles/Dockerfile.base .

docker push $arm64Image 
docker push $amd64Image

docker manifest create $manifest $arm64Image $amd64Image
docker manifest push $manifest