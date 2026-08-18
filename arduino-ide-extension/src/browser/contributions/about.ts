import { FrontendApplicationConfigProvider } from '@theia/core/lib/browser/frontend-application-config-provider';
import { nls } from '@theia/core/lib/common/nls';
import { inject, injectable } from '@theia/core/shared/inversify';
import { AppService } from '../app-service';
import { STEMReachAboutDialog } from '../dialogs/about/about-dialog';
import { ArduinoMenus } from '../menu/arduino-menus';
import {
  Command,
  CommandRegistry,
  Contribution,
  MenuModelRegistry,
} from './contribution';

@injectable()
export class About extends Contribution {
  @inject(AppService)
  private readonly appService: AppService;
  @inject(STEMReachAboutDialog)
  private readonly aboutDialog: STEMReachAboutDialog;

  override registerCommands(registry: CommandRegistry): void {
    registry.registerCommand(About.Commands.ABOUT_APP, {
      execute: () => this.showAbout(),
    });
  }

  override registerMenus(registry: MenuModelRegistry): void {
    registry.registerMenuAction(ArduinoMenus.HELP__ABOUT_GROUP, {
      commandId: About.Commands.ABOUT_APP.id,
      label: nls.localize(
        'arduino/about/label',
        'About {0}',
        this.applicationName
      ),
      order: '0',
    });
  }

  private async showAbout(): Promise<void> {
    const { appVersion, cliVersion, buildDate } = await this.appService.info();
    await this.aboutDialog.open(true, { appVersion, cliVersion, buildDate });
  }

  private get applicationName(): string {
    return FrontendApplicationConfigProvider.get().applicationName;
  }
}

export namespace About {
  export namespace Commands {
    export const ABOUT_APP: Command = {
      id: 'arduino-about',
    };
  }
}
