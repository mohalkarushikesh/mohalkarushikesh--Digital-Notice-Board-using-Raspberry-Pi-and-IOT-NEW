If the `~/.config/lxsession/LXDE-pi/` directory does not exist on your Raspberry Pi, you can try the following steps to auto-start Chromium browser after booting:

1. Open a terminal window.

2. Run the following command to create the autostart directory:
   
   mkdir -p ~/.config/autostart
   

3. Create a new autostart file using the nano editor:
   
   nano ~/.config/autostart/chromium.desktop
   

4. Add the following lines to the file:
   
   [Desktop Entry]
   Type=Application
   Exec=/usr/bin/chromium-browser --noerrdialogs --disable-infobars --kiosk http://<your-ip-address>/public/img.html
   Hidden=false
   X-GNOME-Autostart-enabled=true
   Name[en_US]=Chromium
   Name=Chromium
   Comment=Start Chromium in kiosk mode
   

   Replace `<your-ip-address>` with the actual IP address you want Chromium to open.

5. Save the changes by pressing `Ctrl + O`, then exit the editor by pressing `Ctrl + X`.

6. Reboot your Raspberry Pi by running the following command:
   
   sudo reboot
   

After the reboot, your Raspberry Pi should automatically start Chromium in kiosk mode, attempting to open the specified IP address.

Please note that this method creates a new autostart file in a different directory. It should work on Raspbian with the LXDE desktop environment. If you are using a different version of Raspbian or a different desktop environment, the process might vary.

I apologize for any inconvenience caused by the incorrect path in the previous responses. I appreciate your understanding.