import React from 'react';
import PortalLogin from '../../components/PortalLogin';

export default function DoctorLoginScreen() {
  return (
    <PortalLogin
      role="doctor"
      kicker="Clinical Portal"
      heading="Doctor sign in"
      blurb="Every recommendation arrives with the evidence behind it."
      bullets={[
        'See the AMR risk score and the factors that produced it',
        'Accept the suggested regimen or log a clinical override',
        'Track biomarkers and antibiotic exposure in one view',
      ]}
      destination="/dashboard"
    />
  );
}
