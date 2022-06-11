import React from 'react';

interface Props {
  charId: string;
}

export const CharDescription: React.FC<Props> = React.memo(({ charId }) => {
  return (
    <div>
      {charId}
    </div>
  );
});
