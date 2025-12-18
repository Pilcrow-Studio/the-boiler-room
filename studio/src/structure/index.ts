import {CogIcon, HomeIcon, ComponentIcon, MenuIcon, LinkIcon, SquareIcon} from '@sanity/icons'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import pluralize from 'pluralize-esm'

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

const DISABLED_TYPES = ['settings', 'assist.instruction.context', 'home', 'media.tag', 'navigation', 'footer']

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Website Content')
    .items([
      S.listItem()
        .title('Home')
        .child(S.document().schemaType('home').documentId('home'))
        .icon(HomeIcon),
      S.divider(),
      S.listItem()
        .title('Settings')
        .child(S.document().schemaType('settings').documentId('settings'))
        .icon(CogIcon),
    ])