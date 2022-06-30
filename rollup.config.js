import path from 'path'
import typescript from '@rollup/plugin-typescript'
import copy from 'rollup-plugin-copy'

export default {
  input: path.resolve(__dirname, './src/ResizableTable.tsx'),
  output: [
    {
      dir: path.resolve(__dirname, 'dist'),
      format: 'esm',
    },
  ],
  plugins: [
    typescript(),
    copy({
      targets: [
        {
          src: './src/style.css',
          dest: './dist/',
        },
      ],
    }),
  ],
}
