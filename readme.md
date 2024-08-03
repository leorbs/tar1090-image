# image creator for tar1090


WORK IN PROGRESS

change url in the capture.js \
adjust screenshot size

install nodejs >18 on debian \
[nodesource link](https://github.com/nodesource/distributions?tab=readme-ov-file#using-ubuntu-nodejs-22)


```shell
apt install chromium
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
export CHROME_PATH=/usr/bin/chromium
export PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
npm install puppeteer
chmod +x runCapture.sh
./runCapture.sh
```


create symlinks from the mounted folder
```shell
mkdir /opt/tar1090-image
chmod 777 /opt/tar1090-image
ln -sf /opt/tar1090-image/liveimage.html /var/www/html/liveimage.html
ln -sf /opt/tar1090-image/screenshot.png /var/www/html/screenshot.png
cp ./liveimage.html /opt/tar1090-image/
```

adjust capture.js
change ```tarUrl``` and ```screenshotPath```


use crontab to create a startupjob for the raspberry
```shell
crontab -e
```

add the following
```
@reboot /home/leo/runCapture.sh
```
