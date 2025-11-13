import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('a-'),
        },
      },
    }),
  ],

  assetsInclude: [
    '**/*.glb',
    '**/*.gltf',
    '**/*.bin',
    '**/*.basis',
    '**/*.ktx2',
  ],

  // ✅ CRÍTIC: evita que Vite converteixi textures en blobs
  build: {
    assetsInlineLimit: 0,
  },
});
