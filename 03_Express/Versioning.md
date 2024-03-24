## How Versioning works in Nodejs

### Let's take an example of this express version -> "express": "^4.19.1"

It has 3 parts:

Ist part -> 4
2nd part -> 19
3rd part -> 1

### 3rd part -> 1 --- (Minor Fixes)

This is a minor change , minor bug fix.The update is optional

### 2nd part -> 19 --- (Recommended Buf Fixes) / Security fix

This a recommeded change and the update is recommended

### 1st part -> 4 --- (Major release) / Major or Breaking update

When you change the functionality or something. If you switch the version of your old application to this version, your application might crash as you need to update the change in the functionality throughout the project

## "express": "^4.19.1"

- There is this " ^ " symbol befor the version.
- This symbol signifies that update all the versions compatible with 1st part 4. But never ever update to the Major release.
- So the updates will go to < 5.0.0
- Install all Recommended and minor bug fixes updates, but never the Major release as it can crash the app all together

## There is another symbol " ~ "

This means only install the 3rd part that is the minor fixes of the version
