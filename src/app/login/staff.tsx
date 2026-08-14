import React from 'react';
import PortalLogin from '../../components/PortalLogin';

export default function StaffLoginScreen() {
  return (
    <PortalLogin
      role="staff"
      kicker="Operations Portal"
      heading="Staff sign in"
      blurb="Clean records are what make the risk engine trustworthy."
      bullets={[
        'Search before you register, so no patient gets a duplicate file',
        'Capture the visit details the risk engine depends on',
        'Route each patient to the right consultation slot',
      ]}
      destination="/staff"
    />
  );
}
