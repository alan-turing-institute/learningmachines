### Autoprognosis in Docker

To create a Docker image for running Autoprognosis, just run the `build` script.

The Docker image will use Ubuntu 18.04 as a base installation

According to the AP instructions, R 3.5.1 should be used but installing AP depencies on this version fails. I have thus written the script to update to the latest version.

The script (provided by on the AP repository) for installing Python dependencies fails with installation of sklearn. It appears to install but after installation it is on sklean:0.0 and calls to it fail. I thus removed the installation of sklearn from the script and uncommented the installation of scikit-survival.


