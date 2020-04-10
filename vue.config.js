module.exports = {
    configureWebpack:{
        resolve:{
            alias:{
                //@ => src
                'assets':'@/assets',
                'components':'@/components',
                'common':'components/common',
                'content':'components/content',
                'network':'@/network',
                'views':'@/views'
            }
        }
    }
}
