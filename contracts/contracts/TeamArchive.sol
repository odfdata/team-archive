pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract TeamArchive is ReentrancyGuard {

    /// mapping
    /// @dev mapping teams to ids of FileArrayElement
    mapping(address => mapping(uint => FileArrayElement)) public fileList;
    /// @dev mapping team to first document of the list
    mapping(address => uint) public firstDocumentElement;
    /// @dev mapping team to last document of the list
    mapping(address => uint) public lastDocumentElement;
    /// @dev mapping team to list of admins
    mapping(address => address[]) public teamAdminList;
    /// @dev mapping team to number of files stored for that team
    mapping(address => uint) public fileAmount;

    /// structs
    /// @dev Single file object
    struct File {
        string CID_metadata;
        address uploaderAddress;
        uint addedAt;
    }

    /// @dev A file in the list of documents for the team, with its position in reference to previous and following
    struct FileArrayElement {
        uint previous_id;
        uint next_id;
        File file;
    }

    /// modifiers
    /// @dev checks that only a team admin makes the call
    modifier onlyTeamAdmin(address teamAddress) {
        bool isAdmin = false;
        for (uint i = 0; i < teamAdminList[teamAddress].length; ++i) {
            if (teamAdminList[teamAddress][i] == msg.sender) {
                isAdmin = true;
                break;
            }
        }
        require(isAdmin = true, "Not an admin");
        _;
    }

    /// @dev checks that only a team member makes the call
    modifier onlyTeamMember(address teamAddress) {
        IERC721 teamContract = IERC721(teamAddress);
        require( teamContract.balanceOf(msg.sender) >= 1, "Not a team member");
        _;
    }

    /// events
    /**
    * Event emitted when a file is added
    * @param _team      The address of the team
    * @param _id        The id of the file
    **/
    event FileAdded(address indexed _team, uint indexed _id);
    /**
    * Event emitted when a file is removed
    * @param _team      The address of the team
    * @param _id        The id of the file
    **/
    event FileRemoved(address indexed _team, uint indexed _id);
    /**
    * Event emitted when a new admin id added
    * @param _team      The address of the team
    * @param _admin     The admin of the address removed
    **/
    event AdminAdded(address indexed _team, address _admin);
    /**
    * Event emitted when an admin is removed
    * @param _team      The address of the team
    * @param _admin     The admin of the address removed
    **/
    event AdminRemoved(address indexed _team, address _admin);

    /**
    * @notice Adds a list of files to the list of team files. Only a team member can do this
    * @param _teamAddress        address of the team
    * @param _ids                ids of the file to add
    * @param _metadata_CIDs      CIDs representing file metadata
    */
    function addFiles (
        address _teamAddress,
        uint[] calldata _ids,
        string[] calldata _metadata_CIDs
    )
    external
    nonReentrant()
    onlyTeamMember(_teamAddress) {
        require(_metadata_CIDs.length == _ids.length, "must have same length");
        for (uint i = 0; i < _metadata_CIDs.length; ++i) {
            _addSingleFile(_teamAddress, _ids[i], _metadata_CIDs[i]);
        }
    }

    /**
    * @notice Removes one or more files from the list of files of the team
    * @param _teamAddress        address of the team
    * @param _ids                ids of the file to remove
    */
    function removeFiles (
        address _teamAddress,
        uint[] calldata _ids
    )
    external
    nonReentrant()
    onlyTeamMember(_teamAddress)
    onlyTeamAdmin(_teamAddress) {
        for (uint i = 0; i < _ids.length; ++i) {
            _removeSingleFile(_teamAddress, _ids[i]);
        }
    }

    /**
    * @notice Returns the list of files owned by a team, with pagination capabilities
    * @param _teamAddress        address of the team
    * @param _startId            id of the first element to retrieve
    * @param _amount             how many elements to retrieve (min 1 - max 100)
    * @param _reverse            true if you want the order to be from the most recent to the least recent, false otherwise
    */
    function getTeamFiles(
        address _teamAddress,
        uint _startId,
        uint _amount,
        bool _reverse
    )
    external view
    returns(File[] memory files) {
        require(_amount > 0, "Need to ask for at least one file");
        require(fileList[_teamAddress][_startId].file.addedAt != 0, "_startId does not exist");
        require(_amount <= 100, "No more than 50 elements can be retrieved");
        if (fileAmount[_teamAddress] == 0) return new File[](0);

        File[] memory fileToReturn = new File[](_amount);
        uint currentFileId = _startId;

        uint toResize = 0;
        for (uint i = 0; i < _amount; ++i) {
            fileToReturn[i] = fileList[_teamAddress][currentFileId].file;
            if (_reverse) currentFileId = fileList[_teamAddress][currentFileId].previous_id;
            else currentFileId = fileList[_teamAddress][currentFileId].next_id;
            if (currentFileId == 0) {
                toResize = i + 1;
                break;
            }
        }

        if (toResize > 0) {
            File[] memory fileToReturnResized = new File[](toResize);
            for (uint i = 0; i < fileToReturnResized.length; ++i) {
                fileToReturnResized[i] = fileToReturn[i];
            }
            return fileToReturnResized;
        } else return fileToReturn;
    }

    /**
    * @notice Adds an admin to a team
    * @param _teamAddress        address of the team
    * @param _newAdmin           address of admin to add
    */
    function addAdmin(
        address _teamAddress,
        address _newAdmin
    ) public
    onlyTeamAdmin(_teamAddress) {
        for (uint i = 0; i < teamAdminList[_teamAddress].length; ++i) {
            require(teamAdminList[_teamAddress][i] != _newAdmin, "Admin already present");
        }
        teamAdminList[_teamAddress].push(_newAdmin);
        emit AdminAdded(_teamAddress, _newAdmin);
    }

    /**
    * @notice Removes an admin to a team
    * @param _teamAddress        address of the team
    * @param _adminToRemove      address of admin to remove
    */
    function removeAdmin(
        address _teamAddress,
        address _adminToRemove
    ) public
    onlyTeamAdmin(_teamAddress) {
        uint indexOfAdmin = 2**256-1;
        for (uint i = 0; i < teamAdminList[_teamAddress].length; ++i) {
            if (teamAdminList[_teamAddress][i] == _adminToRemove) {
                indexOfAdmin = i;
                break;
            }
        }
        require(indexOfAdmin != 2**256-1, "adminToRemove not present");
        teamAdminList[_teamAddress][indexOfAdmin] = teamAdminList[_teamAddress][ teamAdminList[_teamAddress].length - 1 ];
        teamAdminList[_teamAddress].pop();
        emit AdminRemoved(_teamAddress, _adminToRemove);
    }

    /**
    * @notice Returns the list of admins for a team
    * @param _teamAddress        address of the team
    * @return _teamAdmins        list of admins for a team
    */
    function getAdminList(
        address _teamAddress
    ) external view
    returns (address[] memory _teamAdmins) {
        address[] memory _adminListToReturn = new address[](teamAdminList[_teamAddress].length);
        for (uint i = 0; i < teamAdminList[_teamAddress].length; ++i) {
            _adminListToReturn[i] = teamAdminList[_teamAddress][i];
        }
        return _adminListToReturn;
    }

    /**
    * @notice Adds a single file to the list of team files
    * @dev File ids are generated client side randomly. They have to be unique among all team files
    * @param _teamAddress        address of the team
    * @param _id                 id of the file to add
    * @param _metadata_CID       CID of the metadata JSON for the file to add
    */
    function _addSingleFile (
        address _teamAddress,
        uint _id,
        string calldata _metadata_CID
    ) private {
        require(fileList[_teamAddress][_id].file.addedAt == 0, "id already in use");
        // prepare file to add
        File memory file = File(_metadata_CID, msg.sender, block.timestamp);
        uint currentLastDocId = lastDocumentElement[_teamAddress];
        // prepare the FileArrayElement object
        FileArrayElement memory newFileArrayElement = FileArrayElement( currentLastDocId, 0, file);
        fileList[_teamAddress][_id] = newFileArrayElement;
        // update second to last reference to the document added, unless this is the first document
        if (currentLastDocId != 0)
            fileList[_teamAddress][currentLastDocId].next_id = _id;
        else {
            firstDocumentElement[_teamAddress] = _id;
            // first person to add a file is the team admin, unless an admin is already present
            if (teamAdminList[_teamAddress].length == 0) teamAdminList[_teamAddress].push(msg.sender);
        }
        // update reference to last file
        lastDocumentElement[_teamAddress] = _id;
        // increase amount of file in list
        fileAmount[_teamAddress]++;
        // emit add file event
        emit FileAdded(_teamAddress, _id);
    }


    /**
    * @notice Removes a single file to the list of team files
    * @dev Data is still kept in memory, but references of previous and next files are changed
    * @param _teamAddress        address of the team
    * @param _id                 id of the file to remove
    */
    function _removeSingleFile (
        address _teamAddress,
        uint _id
    ) private {
        require(fileList[_teamAddress][_id].file.addedAt != 0, "non-existing id");
        // get reference to previous and following file
        uint prevId = fileList[_teamAddress][_id].previous_id;
        uint nextId = fileList[_teamAddress][_id].next_id;
        // update reference to next file in the previous file
        if (prevId != 0)
            fileList[_teamAddress][prevId].next_id = nextId;
        else firstDocumentElement[_teamAddress] = nextId;
        // update reference to previous file in the next file
        if (nextId != 0)
            fileList[_teamAddress][nextId].previous_id = prevId;
        else lastDocumentElement[_teamAddress] = prevId;
        // increase amount of file in list
        fileAmount[_teamAddress]--;
        // emit add file event
        emit FileRemoved(_teamAddress, _id);
    }

}
