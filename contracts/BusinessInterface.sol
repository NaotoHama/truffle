pragma solidity ^0.5.0;

contract BusinessInterface {
  function setCount(uint256 _count) external;

  function getCount() external view returns (uint256);

  function setPoint(uint256 _id, uint256 _point) public;

  function getPoint(uint256 _id) public view returns (uint256);

  function addVariable(uint256 _a, string memory _b) public;

  function getVariable(uint256 _id) public view returns (uint256, string memory);
}
