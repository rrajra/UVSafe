# UVSafe ☀

I'm very pale. I burn easily. So naturally I decided to build an app which fixes that problem.

UVSafe is an electron app which uses API calls to determine whether or not you should wear sunscreen that day.
UVSafe currently uses 2 APIs.

[OpenCage](https://opencagedata.com/) allows users to enter where they live, and it will provide a latitude / longitude pair.

[OpenUV](https://www.openuv.io/) takes that latitude / longitude pair and then returns UV data about that location.

The user is shown the current UV and what the maximum UV is going to be for that day. Notifications will let the user know the risk of the UV, and it's also color coded for easy viewing.
