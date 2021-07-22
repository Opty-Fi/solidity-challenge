// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

////////////////////////////////////
/// DO NOT USE IN PRODUCTION!!! ///
///////////////////////////////////

////////////////////////////
/// GENERAL INSTRUCTIONS ///
////////////////////////////

// 1. AT THE TOP OF EACH CONTRACT FILE, PLEASE LIST GITHUB LINKS TO ANY AND ALL REPOS YOU BORROW FROM THAT YOU DO NOT EXPLICITLY IMPORT FROM ETC.
// 2. PLEASE WRITE AS MUCH OR AS LITTLE CODE AS YOU THINK IS NEEDED TO COMPLETE THE TASK
// 3. LIBRARIES AND UTILITY CONTRACTS (SUCH AS THOSE FROM OPENZEPPELIN) ARE FAIR GAME

//////////////////////////////
/// CHALLENGE INSTRUCTIONS ///
//////////////////////////////

// 1. Fill in the contract's functions so that the unit tests pass in tests/Challenge.spec.ts
// 2. Please be overly explicit with your code comments
// 3. Since unit tests are prewritten, please do not rename functions or variables

contract Challenge {
  uint256 public x;
  uint256 public y;
  uint256 public z;

  /// @dev delegate incrementX to the Incrementor contract below
  /// @param inc address to delegate increment call to
  function incrementX(address inc) external {}

  /// @dev delegate incrementY to the Incrementor contract below
  /// @param inc address to delegate increment call to
  function incrementY(address inc) external {}

  /// @dev delegate incrementZ to the Incrementor contract below
  /// @param inc address to delegate increment call to
  function incrementZ(address inc) external {}

  /// @dev determines if argument account is a contract or not
  /// @param account address to evaluate
  /// @return bool if account is contract or not
  function isContract(address account) external view returns (bool) {}

  /// @dev converts address to uint256
  /// @param account address to convert
  /// @return uint256
  function addressToUint256(address account) external pure returns (uint256) {}

  /// @dev converts uint256 to address
  /// @param num uint256 number to convert
  /// @return address
  function uint256ToAddress(uint256 num) external pure returns (address) {}

  /// @dev calculates the CREATE2 address for a pair without making any external calls
  /// @notice the function must remain pure
  /// @param token0 address of first token in pair
  /// @param token1 address of second token in pair
  /// @return address of pair
  function getUniswapV2PairAddress(address token0, address token1)
    external
    pure
    returns (address)
  {}
}

contract Incrementor {
  uint256 public y;
  uint256 public z;
  uint256 public x;

  function incrementX() external {
    x++;
  }

  function incrementY() external {
    y++;
  }

  function incrementZ() external {
    z++;
  }
}