module.exports = {
  packages: {
    'sweetalert2': {
      entryPoints: {
        './': {
          override: {
            esm2020: './dist/sweetalert2.esm.js',
            es2020: './dist/sweetalert2.esm.js'
          }
        }
      }
    }
  }
};
