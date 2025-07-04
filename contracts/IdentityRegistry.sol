// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract IdentityRegistry {
    // Mapping : DID => true/false (est-ce un émetteur autorisé ?)
    mapping(string => bool) public registeredDIDs;

    // Mapping : hash VC => true/false (est-il révoqué ?)
    mapping(string => bool) public revokedVCs;

    // Event pour suivi on-chain
    event DIDRegistered(string did);
    event DIDUnregistered(string did);
    event VCRevoked(string vcHash);
    event VCUnrevoked(string vcHash);

    // ✅ Fonction : enregistrer un nouveau DID
    function registerDID(string memory did) external {
        require(!registeredDIDs[did], "DID already registered");
        registeredDIDs[did] = true;
        emit DIDRegistered(did);
    }

    // ✅ Fonction : supprimer un DID
    function unregisterDID(string memory did) external {
        require(registeredDIDs[did], "DID not found");
        registeredDIDs[did] = false;
        emit DIDUnregistered(did);
    }

    // ✅ Fonction : vérifier si un DID est enregistré
    function isDIDRegistered(string memory did) external view returns (bool) {
        return registeredDIDs[did];
    }

    // ✅ Fonction : révoquer un VC
    function revokeVC(string memory vcHash) external {
        require(!revokedVCs[vcHash], "VC already revoked");
        revokedVCs[vcHash] = true;
        emit VCRevoked(vcHash);
    }

    // ✅ Fonction : annuler la révocation d’un VC
    function unrevokeVC(string memory vcHash) external {
        require(revokedVCs[vcHash], "VC not revoked");
        revokedVCs[vcHash] = false;
        emit VCUnrevoked(vcHash);
    }

    // ✅ Fonction : vérifier si un VC est révoqué
    function isVCRevoked(string memory vcHash) external view returns (bool) {
        return revokedVCs[vcHash];
    }
}
