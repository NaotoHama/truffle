pragma solidity ^0.5.0;
import './BusinessContract.sol';

contract BusinessContract2 is BusinessContract {
  mapping (uint256 => uint256) point;

  SampleStruct[] variable;

  struct SampleStruct {
    uint a;
    string b;
  }

  constructor() public {
    point[0] = 12345;
    variable.push(SampleStruct(1,"message"));
    variable.push(SampleStruct(2,"message2"));
  }

  function setPoint(uint256 _id, uint256 _point) public {
    point[_id] = _point;
  }

  function getPoint(uint256 _id) public view returns (uint256) {
    return point[_id];
  }

  function addVariable(uint256 _a, string memory _b) public {
    variable.push(SampleStruct(_a, _b));
  }

  function getVariable(uint256 _id) public view returns (uint256, string memory) {
    return (
      variable[_id].a,
      variable[_id].b
    );
  }
}
