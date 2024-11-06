/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/form/experience',
        destination: 'http://72.153.115.123:8000/form/experience',
      },
      {
        source: '/form/skills',
        destination: 'http://72.153.115.123:8000/form/skills',
      },
      {
        source: '/form/education',
        destination: 'http://72.153.115.123:8000/form/education',
      },
      {
        source: '/form/upload',
        destination: 'http://72.153.115.123:8000/form/upload',
      },
      {
        source: '/cv/download',
        destination: 'http://72.153.115.123:8000/cv/download',
      },
      {
        source: '/cv/all',
        destination: 'http://72.153.115.123:8000/cv/all',
      },
    ];
  },
};

export default nextConfig;
