pragma solidity ^0.5.0;


contract BusinessContract {
  // プロキシコントラクトの変数のslot割り当て
  address impl;

  uint256 count;

  constructor() public {
    count = 2;
  }

  // 引数はuint256じゃないとdelegatecall呼べない。uintだとダメだった。
  function setCount(uint256 _count) external {
    count = _count;
  }

  function getCount() external view returns (uint256) {
    return count;
  }

}
