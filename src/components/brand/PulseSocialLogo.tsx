"use client";

import React from "react";
import { OmniSocialLogo, OmniSocialLogoProps, LogoThemeMode } from "./OmniSocialLogo";

export type { LogoThemeMode };

export interface PulseSocialLogoProps extends OmniSocialLogoProps { }

/**
 * PulseSocialLogo — drop-in backward compatible wrapper rendering OmniSocial AI Logo
 */
export function PulseSocialLogo(props: PulseSocialLogoProps) {
  return <OmniSocialLogo {...props} />;
}

export { OmniSocialLogo };
export default PulseSocialLogo;
