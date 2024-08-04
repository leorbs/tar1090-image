# Image Creator for tar1090


The Image Creator for tar1090 is a utility designed to capture and provide a screenshot of a webpage, optimized for devices with limited CPU and RAM resources. By generating a static image of the webpage, the tool enables such devices to display the content without the need for extensive processing power. This is particularly useful for hosting and running on a Raspberry Pi, alongside the tar1090 flight radar software, with the resulting image displayed on a Kindle Paperwhite or similar low-performance devices.

---

By following the provided instructions, you can set up the Image Creator for 
tar1090 to generate and serve images of the tar1090 flight radar webpage.

## Prerequisites

This setup is designed to work on 64-bit ARM systems due to Chromium restrictions:
- On ARM 32-bit systems, Chromium browser is not available.
- On x86 systems, the normal Chrome installation from Puppeteer can be used without setting environment variables.

That means it will work if you run you Raspberry Pi on 64 Bit Raspian.

## Main Capture Setup

1. Install Node.js >= 18 on Debian/Raspian \
    [nodesource link](https://github.com/nodesource/distributions?tab=readme-ov-file#using-ubuntu-nodejs-22)

1. Clone this repository into `/opt/`:
   ```shell
    # Clone the repository into /opt/tar1090-image
    sudo git clone https://github.com/leorbs/tar1090-image.git /opt/tar1090-image
    
    # Set the ownership to the specified user
    sudo chown -R <username>:<username> /opt/tar1090-image
   ```

2. Install Chromium:
   ```shell
   sudo apt install chromium
   ```

3. Set environment variables and install Puppeteer:
   ```shell
   cd /opt/tar1090-image
   export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
   export CHROME_PATH=/usr/bin/chromium
   export PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
   npm install puppeteer
   chmod +x runCapture.sh
   ```

4. Modify `runCapture.sh` to supply the correct environment variables.

## Adjust `capture.js`

1. Change `tarUrl` and `screenshotPath` as needed.
2. Adjust the screenshot size as needed.

## Symlinks to HTTP Folder

1. create symlinks and set permission:
   ```shell
   sudo ln -sf /opt/tar1090-image/liveimage.html /var/www/html/liveimage.html
   sudo ln -sf /opt/tar1090-image/media/screenshot.png /var/www/html/screenshot.png
   sudo chmod 666 /var/www/html/screenshot.png
   ```

## Create RAM Disk to Prevent Writing of Media File and chrome cache to Disk

1. Create media directory:
   ```shell
   sudo mkdir /opt/tar1090-image/media
   ```

2. Edit `/etc/fstab` to add the following lines:
   ```shell
   sudo nano /etc/fstab
   ```

   Add:
   ```
   none /opt/tar1090-image/media tmpfs nodev,nosuid,noexec,nodiratime,size=20M 0 0
   tmpfs /tmp tmpfs defaults,noatime,nosuid,nodev,noexec,mode=1777,size=100M 0 0
   ```

3. Mount the new filesystem to test the fstab file:
   ```shell
   sudo mount -a
   ```
4. Reboot 
   ```shell
   sudo reboot
   ```

## Use `rc.local` to Create a Startup Job

1. Edit `/etc/rc.local`:
   ```shell
   sudo nano /etc/rc.local
   ```

2. Add the following before `exit 0`:
   ```shell
   sudo runuser -l <username> -c 'cd /opt/tar1090-image && ./runCapture.sh' &
   ```

   Replace `<username>` with your actual username.

## Hints

To test if there are any regular disk usages, use the following:
```shell
sudo fatrace -o /tmp/trace -s 60
cat /tmp/trace | grep " W "
```
\
Ensure that `runCapture.sh` is executable:
```shell
chmod +x runCapture.sh
```
\
Test your setup with the command from above, so you don't need to reboot
```shell
sudo runuser -l <username> -c 'cd /opt/tar1090-image && ./runCapture.sh'
```
\
How to jailbreak you Kindle Paperwhite?\
[here](https://github.com/leorbs/alpine_kindle_homeassistant_dashboard)

