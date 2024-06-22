// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProfileContract {
    struct UserProfile {
        string username;
        string email;
        address accountAddress;
        bool isRegistered;
    }

    mapping(address => UserProfile) public users;

    //=======Event to notify when a user is registered=======
    event UserRegistered(
        address indexed userAddress,
        string username,
        string email
    );

    //=======Function to register a user=======
    function registerUser(
        string memory _username,
        string memory _email
    ) public {
        require(bytes(_username).length > 0, "Username cannot be empty");
        require(bytes(_email).length > 0, "Email cannot be empty");
        require(!isRegistered(msg.sender), "User already registered");

        UserProfile memory newUser = UserProfile({
            username: _username,
            email: _email,
            accountAddress: msg.sender,
            isRegistered: true
        });

        users[msg.sender] = newUser;

        emit UserRegistered(msg.sender, _username, _email);
    }

    //=======Function to check if a user is registered=======
    function isRegistered(address _userAddress) public view returns (bool) {
        return users[_userAddress].isRegistered;
    }

    //=======Function to get user info by account address=======
    function getUserInfo(
        address _userAddress
    ) public view returns (string memory, string memory) {
        require(isRegistered(_userAddress), "User not registered");
        return (users[_userAddress].username, users[_userAddress].email);
    }
}
