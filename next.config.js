/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
     domains:[
        "file.kelaket360.ir"
      ],
      loader: 'custom',
      loaderFile: './utils/loader.js', 
  }
}

module.exports = nextConfig
