import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import * as strings from "StickerOverviewWebPartStrings";
import {
  IStickerOverviewProps,
  StickerOverview,
} from "./components/StickerOverview";
import "../../../assets/dist/style.css";

export interface IStickerOverviewWebPartProps {
  total: number;
  imageHeight: number;
}

export default class StickerOverviewWebPart extends BaseClientSideWebPart<IStickerOverviewWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IStickerOverviewProps> =
      React.createElement(StickerOverview, {
        context: this.context,
        min: this.properties.total ?? 0,
        imageHeight: this.properties.imageHeight ?? 0,
      });

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    return;
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("total", {
                  label: "Show minimum total of stickers",
                }),
                PropertyPaneTextField("imageHeight", {
                  label: "Define the height of the image",
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
