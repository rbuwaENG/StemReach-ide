import { ClipboardService } from '@theia/core/lib/browser/clipboard-service';
import { DialogProps } from '@theia/core/lib/browser/dialogs';
import { nls } from '@theia/core/lib/common/nls';
import { inject, injectable } from '@theia/core/shared/inversify';
import React from '@theia/core/shared/react';
import { ReactDialog } from '../../theia/dialogs/dialogs';
import { AboutComponent } from './about-component';

export interface AboutDialogData {
  readonly appVersion: string;
  readonly cliVersion: string | undefined;
  readonly buildDate: string | undefined;
}

@injectable()
export class STEMReachAboutDialogProps extends DialogProps {}

@injectable()
export class STEMReachAboutDialog extends ReactDialog<void> {
  @inject(ClipboardService)
  private readonly clipboardService: ClipboardService;

  private data: AboutDialogData | undefined;

  constructor(
    @inject(STEMReachAboutDialogProps)
    protected override readonly props: STEMReachAboutDialogProps
  ) {
    super({
      title: nls.localize('arduino/about/title', 'About STEMReach IDE'),
    });
    this.node.id = 'about-dialog-container';
    this.contentNode.classList.add('about-dialog');
    this.appendCloseButton(nls.localize('vscode/issueMainService/ok', 'OK'));
  }

  protected render(): React.ReactNode {
    if (!this.data) {
      return undefined;
    }
    return (
      <AboutComponent
        appVersion={this.data.appVersion}
        cliVersion={this.data.cliVersion}
        buildDate={this.data.buildDate}
        onCopy={this.copyDetails}
      />
    );
  }

  get value(): void {
    return undefined;
  }

  private readonly copyDetails = (): void => {
    if (!this.data) {
      return;
    }
    const { appVersion, cliVersion, buildDate } = this.data;
    const lines = [
      `Version: ${appVersion}`,
      buildDate ? `Date: ${buildDate}` : undefined,
      cliVersion ? `CLI Version: ${cliVersion}` : undefined,
      `Copyright © ${new Date().getFullYear()} STEMreach and/or its affiliated companies`,
    ].filter((line): line is string => Boolean(line));
    this.clipboardService.writeText(lines.join('\n'));
  };

  override async open(
    disposeOnResolve = true,
    data?: AboutDialogData
  ): Promise<void> {
    this.data = data;
    this.update();
    return super.open(disposeOnResolve);
  }
}
