import React from 'react';
import { useParams } from 'react-router';

/**
 *
 * @param {React.PropsWithChildren<ITeamHomepage>} props
 * @return {JSX.Element}
 * @constructor
 */
const TeamHomepage: React.FC<ITeamHomepage> = (props) => {
  const { teamAddress } = useParams();
  return (
    <div>
      Team homepage for {teamAddress}
    </div>
  );
};

export interface ITeamHomepage {

}

export default TeamHomepage;
