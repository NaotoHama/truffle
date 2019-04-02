pragma solidity ^0.5.0;
import './BusinessContract.sol';

contract ProxyContract {
  // ビジネスコントラクトのアドレス
  address impl;

  constructor() public {
  }

  function setBusinessContract(address _address) public {
    impl = _address;
  }

  function () external {
     require(msg.sig != 0x0);
     address _impl = impl;
     assembly {
        let ptr := mload(0x40)
        calldatacopy(ptr, 0, calldatasize)
        let result := delegatecall(gas, _impl, ptr, calldatasize, ptr, 0)
        let size := returndatasize
        returndatacopy(ptr, 0, size)
        switch result
        case 0 { revert(ptr, size) }
        default { return(ptr, size) }
     }
  }

/*
  function delegateCallBusiness(string memory _method, bytes memory _arugument) public returns(bool, bytes memory) {
    bool status;
    bytes memory result;
    (status, result) = businessContract.delegatecall(abi.encodePacked(bytes4(keccak256(bytes(_method))), _arugument));
    return (status, result);
  }
*/

  // get data by slot id
  // slot idをクライアントが知る術がないので非推奨
  function get(uint slot_id) public view returns (uint){
    bytes32 r;
    assembly {
      r := sload(slot_id) //we load the slot number i
    }
    return uint(r);
  }

}