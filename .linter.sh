#!/bin/bash
cd /home/kavia/workspace/code-generation/vibrant-tic-tac-toe-10300-75745d74/web_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

