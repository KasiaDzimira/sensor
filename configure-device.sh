#!/bin/sh

confirm () {
	read -r -p "${1:-Are you sure? [y/N]} " response
	case $response in
		[yY][eE][sS]|[yY])
			echo 1;
			;;
		*)
			echo 0;
			;;
	esac
}

echo "It is ok to have 'docker command appears to already exist on this system'"
echo "warning if 'docker' has been installed with this script and deleted afterwards."
echo

CONFIRM="$(confirm 'Configure sensor app? [y/N]')"

if [ $CONFIRM -eq 1 ]
then
    echo
    echo "Installing npm..."
    echo
    sudo apt-get install nodejs
    sudo apt-get install npm

    echo
    echo "Enable access to GPIO pins..."
    echo
    sudo modprobe w1-gpio
    sudo modprobe w1-therm

    echo
    echo "Preparing script to running sensor app when device is on."
    echo
    vi /etc/init.d/start-app
    cp ~/Desktop/sensor/start-app.sh /etc/init.d/start-app
    sudo chmod ugo+x /etc/init.d/start-app
    update-rc.d start-app defaults
fi