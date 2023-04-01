import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'sanity-rakkidi-de',

  projectId: 'x90k8rg1',
  dataset: 'develop',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
