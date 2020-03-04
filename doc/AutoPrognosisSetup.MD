### Step-by-Step
1. Azure VM - Linux 18.04
1. sudo apt install Python_3.6-dev (should not have bpip3 install -U virtualenveen neccessary because we'll be working in a docker container)
1. sudo apt update
1. sudo apt upgrade
1. sudo apt install docker.io
1. docker pull ubuntu
1. sudo usermod -a -G docker jsteyn
1. docker pull ubuntu
1. docker create -t -i ubuntu bash
1. docker start -a -i modest_pascal
1. apt update
1. apt upgrade
1. sudo apt install software-properties-common (haven't done this before ... will see what it does)
1. apt install python3.6-dev (python 3.6 is already installed)
1. apt -y install python3-pip
1. apt install -y r-base

### Installing Tensorflow
1. pip3 install -U virtualenv
1. pip3 install --upgrade tensorflow
1. pip3 install --upgrade keras

### Other stuff
1. apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E298A3A825C0D65DFD57CBB651716619E084DAB9
1. sudo add-apt-repository 'deb https://cloud.r-project.org/bin/linux/ubuntu bionic-cran35/'
1. apt install wget
1. apt install curl
1. apt install git
1. cd ~

### Installing R
1. wget https://cloud.r-project.org/bin/linux/ubuntu/bionic-cran35/r-base-core_3.5.3-1bionic_amd64.deb
1. dpkg -i r-base-core_3.5.3-1bionic_amd64.deb
1. wget https://cloud.r-project.org/bin/linux/ubuntu/bionic-cran35/r-base-dev_3.5.3-1bionic_all.deb
1. dpkg -i r-base-dev_3.5.3-1bionic_all.deb
1. The install_packages script does not work. Manually install packages:

