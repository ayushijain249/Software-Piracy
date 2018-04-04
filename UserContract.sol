pragma solidity ^0.4.0;
contract UserContract {
uint x;
string HID;
string fileHash;
string license;
string vendorAddress;
address owner;
address user;
function setX(uint y) public {
x = y;
}

function getX() view public vendorOnly returns(uint) {
return x;
}

modifier vendorOnly() {
require(msg.sender==owner);
_;
}

modifier userOnly() {
require(msg.sender==user);
_;
}

function setHID(string h) public vendorOnly returns(string) {
 HID = h;
}

function setSoftwareHash(string s) public vendorOnly returns(string) {
fileHash = s;
}
function setSoftwareLicense(string l) public vendorOnly returns(string) {
license = l;
}

function UserContract() public {

owner = msg.sender;
user = 0x00000000000000000000000000000000000000000;
x = 10;
license = "AFW2-ADS4-UIU1-UOB9";
}

function getHID() public userOnly view returns(string) {
return HID;
}
function getSoftwareHash() public userOnly view returns(string) {
return fileHash;
}
function getSoftwareLicense() public userOnly view returns(string) {
return license;
}
}