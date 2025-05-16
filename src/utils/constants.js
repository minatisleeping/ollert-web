let apiRoot = ''
console.log(import.meta.env)
console.log(process.env)
if (process.env.BUILD_MODE === 'dev') apiRoot = 'http://localhost:3000'
if (process.env.BUILD_MODE === 'production') apiRoot = 'https://trello-api-zpru.onrender.com'
console.log('🚀 ~ apiRoot:', apiRoot)

export const API_ROOT = apiRoot
