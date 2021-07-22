// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

//////////////////////////////
/// CHALLENGE INSTRUCTIONS ///
//////////////////////////////

// In each contract below, comment above each line where there may be a significant error
// If there is an error, explain in detail why there is an error and how one might fix the error
// Do not actually code any solutions. Only comment how to fix each error in a short paragraph


contract A {
  uint256 public constant WITHDRAWAL_LIMIT = 1 ether;
  mapping(address => uint256) public lastWithdrawTime;
  mapping(address => uint256) public balances;

  function deposit() public payable {
    balances[msg.sender] += msg.value;
  }

  function withdraw(uint256 _amount) public {
    require(balances[msg.sender] >= _amount);
    require(_amount <= WITHDRAWAL_LIMIT);
    require(block.timestamp >= lastWithdrawTime[msg.sender] + 1 weeks);
    (bool sent, ) = msg.sender.call{ value: _amount }("");
    require(sent, "Failed to send Ether");
    balances[msg.sender] -= _amount;
    lastWithdrawTime[msg.sender] = block.timestamp;
  }
}

contract B {
  uint256 public targetAmount = 7 ether;
  address public winner;

  function deposit() public payable {
    require(msg.value == 1 ether, "You can only send 1 Ether");
    uint256 balance = address(this).balance;
    require(balance <= targetAmount, "Game is over");
    if (balance == targetAmount) winner = msg.sender;
  }

  function claimReward() public {
    require(msg.sender == winner, "Not winner");
    (bool sent, ) = msg.sender.call{ value: address(this).balance }("");
    require(sent, "Failed to send Ether");
  }
}

contract C1 {
  address public owner;

  function pwn() public {
    owner = msg.sender;
  }
}

contract C2 {
  address public owner;
  C1 public c1;

  constructor(C1 _c1) {
    owner = msg.sender;
    c1 = C1(_c1);
  }

  fallback() external payable {
    address(c1).delegatecall(msg.data);
  }
}

contract D {
  address public owner;

  constructor() payable {
    owner = msg.sender;
  }

  function transfer(address payable _to, uint256 _amount) public {
    require(tx.origin == owner, "Not owner");
    (bool sent, ) = _to.call{ value: _amount }("");
    require(sent, "Failed to send Ether");
  }
}

contract E {
  using ECDSA for bytes32;

  address[2] public owners;

  constructor(address[2] memory _owners) payable {
    owners = _owners;
  }

  function deposit() external payable {}

  function transfer(
    address _to,
    uint256 _amount,
    bytes[2] memory _sigs
  ) external {
    bytes32 txHash = getTxHash(_to, _amount);
    require(_checkSigs(_sigs, txHash), "invalid sig");

    (bool sent, ) = _to.call{ value: _amount }("");
    require(sent, "Failed to send Ether");
  }

  function getTxHash(address _to, uint256 _amount)
    public
    view
    returns (bytes32)
  {
    return keccak256(abi.encodePacked(_to, _amount));
  }

  function _checkSigs(bytes[2] memory _sigs, bytes32 _txHash)
    private
    view
    returns (bool)
  {
    bytes32 ethSignedHash = _txHash.toEthSignedMessageHash();

    for (uint256 i = 0; i < _sigs.length; i++) {
      address signer = ethSignedHash.recover(_sigs[i]);
      bool valid = signer == owners[i];

      if (!valid) {
        return false;
      }
    }

    return true;
  }
}