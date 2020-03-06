### Step-by-Step
1. Azure VM - Linux 18.04
1. `sudo apt install Python_3.6-dev (should not have bpip3 install -U virtualenveen neccessary because we'll be working in a docker container)`
1. `sudo apt update`
1. `sudo apt upgrade`
1. `sudo apt install docker.io`
1. `docker pull ubuntu`
1. `sudo usermod -a -G docker jsteyn`
1. `docker pull ubuntu`
1. `docker create -t -i ubuntu bash`
1. `docker start -a -i modest_pascal`
1. `apt update`
1. `apt upgrade`
1. `sudo apt install software-properties-common (haven't done this before ... will see what it does)`
1. `apt install python3.6-dev (python 3.6 is already installed)`
1. `apt -y install python3-pip`
1. `apt install -y r-base`

### Installing Tensorflow
1. `pip3 install -U virtualenv`
1. `pip3 install --upgrade tensorflow
1. `pip3 install --upgrade keras`

### Other stuff
1. `apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E298A3A825C0D65DFD57CBB651716619E084DAB9`
1. `sudo add-apt-repository 'deb https://cloud.r-project.org/bin/linux/ubuntu bionic-cran35/'`
1. `apt install wget`
1. `apt install curl`
1. `apt install git`
1. `cd ~`

### Installing R
1. `wget https://cloud.r-project.org/bin/linux/ubuntu/bionic-cran35/r-base-core_3.5.3-1bionic_amd64.deb`
1. `dpkg -i r-base-core_3.5.3-1bionic_amd64.deb`
1. `wget https://cloud.r-project.org/bin/linux/ubuntu/bionic-cran35/r-base-dev_3.5.3-1bionic_all.deb`
1. `dpkg -i r-base-dev_3.5.3-1bionic_all.deb`
1. The `install_packages` script does not work. Remove the repository on line 3 of the install_packages.r script. Thus changing the line to: if(length(new.packages)) install.packages(new.packages)
1. Bombed out with:
```
[1] "loading ranger"
Error in library(i, character.only = T) :
  there is no package called 'ranger'
In addition: Warning messages:
1: In install.packages(new.packages) :
  installation of package 'RcppEigen' had non-zero exit status
2: In install.packages(new.packages) :
  installation of package 'ranger' had non-zero exit status

```
1. `install.packages("ranger")`
1. Failed with: 
```
/usr/lib/R/etc/Makeconf:177: recipe for target 'fastLm.o' failed
make: *** [fastLm.o] Error 4
ERROR: compilation failed for package 'RcppEigen'
* removing '/usr/local/lib/R/site-library/RcppEigen'
ERROR: dependency 'RcppEigen' is not available for package 'ranger'
* removing '/usr/local/lib/R/site-library/ranger'

The downloaded source packages are in
        '/tmp/RtmpG8GPfY/downloaded_packages'
Warning messages:
1: In install.packages("ranger") :
  installation of package 'RcppEigen' had non-zero exit status
2: In install.packages("ranger") :
  installation of package 'ranger' had non-zero exit status
```
