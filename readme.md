# image creator for tar1090


WORK IN PROGRESS

change url in the capture.js \
adjust screenshot size

install nodejs >18 on debian \
[nodesource link](https://github.com/nodesource/distributions?tab=readme-ov-file#using-ubuntu-nodejs-22)

[//]: # (configure puppeteer to use firefox instead of chrome to archive 32 bit compatibility)
```shell
apt install chromium
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
#export PUPPETEER_PRODUCT=firefox
export CHROME_PATH=/usr/bin/chromium
export PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
npm install puppeteer
chmod +x runCapture.sh
./runCapture.sh
```

```shell
#when the run fails because libnss3 is missing, then install the following
sudo apt install -y libnss3 libatk-bridge2.0-0 libxcomposite1 libxrandr2 libxdamage1 libxkbcommon0 libx11-xcb1 libxcursor1 libxss1 libasound2 libgbm1 libpango1.0-0 libxshmfence1
```


create symlinks from the mounted folder
```shell
mkdir /opt/tar1090-image
chmod 777 /opt/tar1090-image
ln -sf /opt/tar1090-image/liveimage.html /var/www/html/liveimage.html
ln -sf /opt/tar1090-image/screenshot.png /var/www/html/screenshot.png
```


use crontab to create a startupjob for the raspberry
```shell
crontab -e
```

add the following
```
@reboot /home/leo/runCapture.sh
```

---

```
firefox --headless --window-size 1024,768 --screenshot "http://192.168.178.53/tar1090/?hideSideBar&noWebGl&mobile"
```

sichern sshd_config