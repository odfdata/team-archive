export interface TeamFileReducer {
  /**
   * The IPFS CID file
   */
  CID: string;
  /**
   * The address owner of the file
   */
  teamAddress: string;
  /**
   * The UNIX timestamp in which the file has been added
   */
  addDate: number;

}
