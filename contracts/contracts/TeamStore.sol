pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract TeamStore is ReentrancyGuard {

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
        string CID_file;
        address uploaderAddress;
        uint addedAt;
    }

    /// @dev A file in the list of documents for the team, with its position in reference to previous and following
    struct FileArrayElement {
        uint previous_id;
        uint next_id;
        File file;
    }

    /// @dev used to pass an element to be added
    struct FileAdd {
        string CID_metadata;
        string CID_file;
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


    constructor() { }

    /**
    * @notice Adds a list of files to the list of team files. Only a team member can do this
    * @param _teamAddress        address of the team
    * @param _ids                ids of the file to add
    * @param _file               files object to add
    */
    function addFiles (
        address _teamAddress,
        uint[] calldata _ids,
        FileAdd[] calldata _file
    )
    external
    nonReentrant()
    onlyTeamMember(_teamAddress) {
        require(_file.length == _ids.length, "must have same length");
        for (uint i = 0; i < _file.length; ++i) {
            _addSingleFile(_teamAddress, _ids[i], _file[i]);
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

    function getTeamFiles(address _teamAddress, uint _startId, uint _amount) external view returns(File[] files) {
        require(_amount > 0, "Need to ask for at least one file");
        require(fileList[_teamAddress][_startId].file.addedAt != 0, "_startId does not exist");
        if (fileAmount[_teamAddress] == 0) return new File[](0);

        File[] fileToReturn = new File[](_amount);
        uint currentFileId = _startId;

        int toResize = -1;
        for (uint i = 0; i < _amount; ++i) {
            fileToReturn[i] = fileToReturn[_teamAddress][currentFileId].file;
            currentFileId = fileToReturn[_teamAddress][currentFileId].next_id;
            if (currentFileId == 0) {
                toResize = i;
                break;
            }
        }

        if (toResize > -1) {
            File[] fileToReturnResized = new File[](toResize + 1);
            for (uint i = 0; i < fileToReturnResized.length; ++i) {
                fileToReturnResized[i] = fileToReturn[i];
            }
            return fileToReturnResized;
        } else return fileToReturn;
    }

    function getTeamFilesReverse(address _teamAddress, uint _startId, uint _amount) external view returns(File[] files) {
        require(_amount > 0, "Need to ask for at least one file");
        require(fileList[_teamAddress][_startId].file.addedAt != 0, "_startId does not exist");
        if (fileAmount[_teamAddress] == 0) return new File[](0);

        File[] fileToReturn = new File[](_amount);
        uint currentFileId = _startId;

        int toResize = -1;
        for (uint i = 0; i < _amount; ++i) {
            fileToReturn[i] = fileToReturn[_teamAddress][currentFileId].file;
            currentFileId = fileToReturn[_teamAddress][currentFileId].previous_id;
            if (currentFileId == 0) {
                toResize = i;
                break;
            }
        }

        if (toResize > -1) {
            File[] fileToReturnResized = new File[](toResize + 1);
            for (uint i = 0; i < fileToReturnResized.length; ++i) {
                fileToReturnResized[i] = fileToReturn[i];
            }
            return fileToReturnResized;
        } else return fileToReturn;
    }

    /**
    * @notice Adds a single file to the list of team files
    * @dev File ids are generated client side randomly. They have to be unique among all team files
    * @param _teamAddress        address of the team
    * @param _ids                id of the file to add
    * @param _fileAdd            file object to add
    */
    function _addSingleFile (
        address _teamAddress,
        uint _id,
        FileAdd calldata _fileAdd
    ) private {
        require(fileList[_teamAddress][_id].file.addedAt == 0, "id already in use");
        // prepare file to add
        File memory file = File(_fileAdd.CID_metadata, _fileAdd.CID_file, msg.sender, block.timestamp);
        uint currentLastDocId = lastDocumentElement[_teamAddress];
        // prepare the FileArrayElement object
        FileArrayElement memory newFileArrayElement = FileArrayElement( currentLastDocId, 0, file);
        fileList[_teamAddress][_id] = newFileArrayElement;
        // update second to last reference to the document added, unless this is the first document
        if (currentLastDocId != 0)
            fileList[_teamAddress][currentLastDocId].next_id = _id;
        else firstDocumentElement[_teamAddress] = _id;
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
    * @param _ids                id of the file to remove
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
        // update reference to previous file in the next file
        if (nextId != 0)
            fileList[_teamAddress][nextId].previous_id = prevId;
        // increase amount of file in list
        fileAmount[_teamAddress]--;
        // emit add file event
        emit FileRemoved(_teamAddress, _id);
    }



}
