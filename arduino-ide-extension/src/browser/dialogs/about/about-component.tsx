import { nls } from '@theia/core/lib/common/nls';
import React from '@theia/core/shared/react';

export interface AboutComponentProps {
  appVersion: string;
  cliVersion: string | undefined;
  buildDate: string | undefined;
  onCopy: () => void;
}

export const AboutComponent = ({
  appVersion,
  cliVersion,
  buildDate,
  onCopy,
}: AboutComponentProps): React.ReactElement => (
  <div className="about-dialog--content">
    <div className="about-dialog--logo">
      <span className="stemreach-logo">
        <span className="stem">STEM</span>
        <span className="reach">reach</span>
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: 'rotate(-45deg)' }}
        >
          <path
            d="M2 9 L13 9 L13 4 L22 12 L13 20 L13 15 L2 15 Z"
            fill="#EF4444"
          />
        </svg>
      </span>
      <div className="about-dialog--product-name">
        {nls.localize('arduino/about/ide', 'IDE')}
      </div>
    </div>
    <div className="about-dialog--details">
      <div className="about-dialog--row">
        {nls.localize('arduino/about/version', 'Version: {0}', appVersion)}
      </div>
      {buildDate && (
        <div className="about-dialog--row">
          {nls.localize('arduino/about/date', 'Date: {0}', buildDate)}
        </div>
      )}
      {cliVersion && (
        <div className="about-dialog--row">
          {nls.localize(
            'arduino/about/cliVersion',
            'CLI Version: {0}',
            cliVersion
          )}
        </div>
      )}
      <div className="about-dialog--row">
        {nls.localize(
          'arduino/about/copyright',
          'Copyright © {0} STEMreach and/or its affiliated companies',
          new Date().getFullYear().toString()
        )}
      </div>
    </div>
    <div className="about-dialog--customized-by">
      <div className="about-dialog--lixr-logo" />
      <span>
        {nls.localize('arduino/about/customizedBy', 'Customized by LIXR')}
      </span>
    </div>
    <button
      className="about-dialog--copy-link"
      onClick={onCopy}
      type="button"
    >
      {nls.localize('vscode/textInputActions/copy', 'Copy')}
    </button>
  </div>
);
