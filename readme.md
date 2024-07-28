# image creator for tar1090


change url in the capture.js
adjust screenshot size

install nodejs >18 on debian \
[nodesource link](https://github.com/nodesource/distributions?tab=readme-ov-file#using-ubuntu-nodejs-22)

```
npm install puppeteer
```

```
chmod +x run_capture.sh
./run_capture.sh
```

```
#when the rund fails because libnss3 is missing, then install the following
sudo apt install -y libnss3 libatk-bridge2.0-0 libxcomposite1 libxrandr2 libxdamage1 libxkbcommon0 libx11-xcb1 libxcursor1 libxss1 libasound2 libgbm1 libpango1.0-0 libxshmfence1
```


create symlinks from the mounted folder
```
ln -sf /home/leo/tar1090-image/liveimage.html /var/www/html/liveimage.html
ln -sf /home/leo/tar1090-image/screenshot.png /var/www/html/screenshot.png
```