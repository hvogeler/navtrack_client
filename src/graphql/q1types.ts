

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllTracksQ1
// ====================================================

export interface AllTracksQ1_allTracks_tracktypes {
  tracktypename: string;
}

export interface AllTracksQ1_allTracks {
  trackname: string;
  region: string | null;
  tracktypes: (AllTracksQ1_allTracks_tracktypes | null)[];
}

export interface AllTracksQ1 {
  allTracks: (AllTracksQ1_allTracks | null)[] | null;  // get all tracks in the system
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================