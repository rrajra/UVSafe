# UVSafe ☀

A simple electron app to check the UV for the day, and see if sunscreen is reccomended.

## About

UVSafe is an electron app which uses API calls to determine whether or not you should wear sunscreen that day.
UVSafe currently uses 2 APIs.

[OpenCage](https://opencagedata.com/) allows users to enter where they live, and it will provide a latitude / longitude pair.

[OpenUV](https://www.openuv.io/) takes that latitude / longitude pair and then returns UV data about that location.

The user is shown the current UV and what the maximum UV is going to be for that day. Notifications will let the user know the risk of the UV, and it's also color coded for easy viewing.

## Gallery
![Location prompt](https://abrahams.dev/images/gallery/uvlocation.png)
![Main Screen](https://abrahams.dev/images/gallery/uvmain.png)
