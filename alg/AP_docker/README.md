### Autoprognosis in Docker

To create a Docker image for running Autoprognosis, just run the `build` script.

The Docker image will use Ubuntu 18.04 as a base installation

According to the AP instructions, R 3.5.1 should be used but installing AP depencies on this version fails. I have thus written the script to update to the latest version.

The script (provided by on the AP repository) for installing Python dependencies fails with installation of sklearn. It appears to install but after installation it is on sklean:0.0 and calls to it fail. I thus removed the installation of sklearn from the script and uncommented the installation of scikit-survival.

`build` is a bash script that will build the Docker image from 'Dockerfile'

`firstimerun` is a bash script to run the image for the first time and create a container

Once the container is running, port 8080 is exposed to serve Jupyter 

To make Jupyter Notebooks work with a password rather than it requiring a token, modify the jupyter_notebook_config.py file in ~/.jupyter by adding the following line: (Replace <password> with an actual hashed password)
`c.NotebookApp.password = "<password>"`
  
Yo prepare the hashed password do the following in any python console (The package `notebook` is required):

```
from notebook.auth import passwd
>>> passwd()
Enter password:
Verify password:
```

The hashed password will be returned. Replace `<password>` with the newly generated hashed password in the following format: 
`U'sha1:abcdefg12345..`
