#!/bin/bash
sudo docker build -t flightconvert .
sudo docker kill flightconvert
sudo docker rm flightconvert
sudo docker run --name flightconvert -p 34613:34613 -d flightconvert