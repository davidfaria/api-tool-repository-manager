#!/bin/bash

# Script para subir a api
pm2 start --name "bossabox-api" dist/server.js
