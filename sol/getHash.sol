pragma solidity ^0.4.6;
contract getHash {
       address private hid;
       
    function set(address hidd) public{
        hid = hidd;
        
    }
    function get() public  constant returns (bytes32)  {

        return sha256(hid);
    }

}