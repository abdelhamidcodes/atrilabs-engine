import { Id as reactSchemaId } from "@atrilabs/react-component-manifest-schema";
import type { ReactComponentManifestSchema } from "@atrilabs/react-component-manifest-schema";
import { Id as iconSchemaId } from "@atrilabs/component-icon-manifest-schema";
import { Id as CSSTreeId } from "@atrilabs/app-design-forest/src/cssTree";
import { CSSTreeOptions } from "@atrilabs/app-design-forest/src/cssTree";
import { CustomPropsTreeOptions } from "@atrilabs/app-design-forest/src/customPropsTree";
import { Id as CustomTreeId } from "@atrilabs/app-design-forest/src/customPropsTree";
import Joi from "joi";
import {
  Id as AttributesTreeId,
  AttributesTreeOptionsBoolean,
} from "@atrilabs/app-design-forest/src/attributesTree";

const attributesTreeOptions: AttributesTreeOptionsBoolean = {
  basics: true,
  ariaLabelledBy: false,
};

const cssTreeOptions: CSSTreeOptions = {
  boxShadowOptions: true,
  flexContainerOptions: false,
  flexChildOptions: true,
  positionOptions: true,
  typographyOptions: true,
  spacingOptions: true,
  sizeOptions: true,
  borderOptions: true,
  outlineOptions: true,
  backgroundOptions: true,
  miscellaneousOptions: true,
};
const customTreeOptions: CustomPropsTreeOptions = {
  dataTypes: {
    separator: {
      type: "text",
    },
    fontColor: { type: "color" },
    items: {
      type: "json",
      schema: Joi.array()
        .unique()
        .items(
          Joi.object({
            title: Joi.string().required(),
            href: Joi.string().optional(),
            menu: Joi.object({
              items: Joi.link("#breadcrumbData").optional(),
            }),
          })
        )
        .id("breadcrumbData"),
    },
  },
};

const compManifest: ReactComponentManifestSchema = {
  meta: { key: "Breadcrumb", category: "Basics" },
  dev: {
    decorators: [],
    attachProps: {
      styles: {
        treeId: CSSTreeId,
        initialValue: {},
        treeOptions: cssTreeOptions,
        canvasOptions: { groupByBreakpoint: true },
      },
      custom: {
        treeId: CustomTreeId,
        initialValue: {
          separator: "/",
          items: [
            {
              title: "Home",
              href: "/index",
            },
            {
              title: "Application Center",
              href: "home",
            },
            {
              title: "Application List",
              href: "a",
            },
            {
              title: "Menu",
              href: "a",
              menu: { items: [{ title: "Sub-Menu" }] },
            },
          ],
        },
        treeOptions: customTreeOptions,
        canvasOptions: { groupByBreakpoint: false },
      },
      attrs: {
        treeId: AttributesTreeId,
        initialValue: {},
        treeOptions: attributesTreeOptions,
        canvasOptions: { groupByBreakpoint: false },
      },
    },
    attachCallbacks: {
      onClick: [{ type: "do_nothing" }],
    },
    defaultCallbackHandlers: {
      onClick: [{ sendEventData: true }],
    },
  },
};

const iconManifest = {
  panel: { comp: "CommonIcon", props: { name: "Breadcrumb" } },
  drag: {
    comp: "CommonIcon",
    props: {
      name: "Breadcrumb",
      containerStyle: { padding: "1rem" },
    },
  },
  renderSchema: compManifest,
};

export default {
  manifests: {
    [reactSchemaId]: compManifest,
    [iconSchemaId]: iconManifest,
  },
};
