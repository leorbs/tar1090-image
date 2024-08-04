# image creator for tar1090

prequeisites:
- only works like this on 64 bit ARM because of the cromium restrictions 
  - on ARM 32 bit systems there is no chromium browser available 
  - on x86 systems the normal chrome installation from puppeteer can be used and no
  env variables need to be set

install nodejs >18 on debian \
[nodesource link](https://github.com/nodesource/distributions?tab=readme-ov-file#using-ubuntu-nodejs-22)

### capture setup
```shell
# clone this repository into /opt/
# the path should be /opt/tar1090-image

apt install chromium
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
export CHROME_PATH=/usr/bin/chromium
export PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
npm install puppeteer
chmod +x runCapture.sh
./runCapture.sh
```

modify ```runCapture.sh``` to supply the correct env variables.


### symlinks to http folder
```shell
chmod 755 /opt/tar1090-image
ln -sf /opt/tar1090-image/liveimage.html /var/www/html/liveimage.html
ln -sf /opt/tar1090-image/media/screenshot.png /var/www/html/screenshot.png
chmod 666 screenshot.png
```

### create ramdisk to prevent writing of the media file to disk
```shell
mkdir /opt/tar1090-image/media
```

```
none /opt/tar1090-image/media tmpfs nodev,nosuid,noexec,nodiratime,size=20M 0 0
tmpfs /tmp tmpfs defaults,noatime,nosuid,nodev,noexec,mode=1777,size=50M 0 0
```

### adjust capture.js
change ```tarUrl``` and ```screenshotPath``` as needed \
adjust screenshot size as needed


## use rc.local to create a startupjob
```shell
sudo nano /etc/rc.local
```

add the following before ```exit 0```
```
sudo runuser -l leo -c 'cd /opt/tar1090-image && ./runCapture.sh' &
```

### Hints

To test if there are any regular diskusages, I used the following.
```shell
sudo fatrace -o /tmp/trace -s 60
cat /tmp/trace | grep " W "
```

